import streamlit as st
import google.generativeai as genai
from deep_translator import GoogleTranslator
from typing import Dict, List, Tuple
import os
import json
from datetime import datetime
import uuid

# Supported languages with their codes
LANGUAGES: Dict[str, str] = {
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Italian": "it",
    "Portuguese": "pt",
    "Hindi": "hi",
    "Chinese (Simplified)": "zh-cn",
    "Japanese": "ja",
    "Korean": "ko",
}

def init_session_state():
    """Initialize session state variables."""
    if "messages" not in st.session_state:
        st.session_state.messages = []  # Store messages in English
    if "displayed_messages" not in st.session_state:
        st.session_state.displayed_messages = []  # Store translated messages
    if "conversations" not in st.session_state:
        st.session_state.conversations = {}
    if "current_conversation_id" not in st.session_state:
        st.session_state.current_conversation_id = None

def save_conversation(conversation_id: str, messages: List[Dict]):
    """Save conversation to a JSON file (in English)."""
    try:
        conversations_file = "conversations.json"
        conversations = {}
        
        if os.path.exists(conversations_file):
            with open(conversations_file, 'r') as f:
                conversations = json.load(f)
        
        conversations[conversation_id] = {
            'messages': messages,  # Original English messages
            'timestamp': datetime.now().isoformat(),
        }
        
        with open(conversations_file, 'w') as f:
            json.dump(conversations, f)
            
    except Exception as e:
        st.error(f"Error saving conversation: {str(e)}")

def load_conversations() -> Dict:
    """Load all conversations from JSON file."""
    try:
        if os.path.exists("conversations.json"):
            with open("conversations.json", 'r') as f:
                return json.load(f)
    except Exception as e:
        st.error(f"Error loading conversations: {str(e)}")
    return {}

def setup_gemini():
    """Setup Gemini API with error handling."""
    try:
        genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
        model = genai.GenerativeModel('gemini-pro')
        return model
    except Exception as e:
        st.error(f"Error setting up Gemini API: {str(e)}")
        return None

def translate_text(text: str, target_lang: str, source_lang: str = 'auto') -> str:
    """Translate text between languages with error handling."""
    try:
        print(f"Translating {text} from {source_lang} to {target_lang}")   
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        translated_text = translator.translate(text)
        return translated_text
        
    except Exception as e:
        st.error(f"Translation error: {str(e)}")
        return text

def get_conversation_context(messages: List[Dict], max_context: int = 5) -> str:
    """Get recent conversation context in English."""
    recent_messages = messages[-max_context:] if messages else []
    context = "\n".join([
        f"{'User' if msg['role'] == 'user' else 'Assistant'}: {msg['content']}"
        for msg in recent_messages
    ])
    return context

def get_gemini_response(model, english_query: str, conversation_context: str) -> str:
    """Get response from Gemini (in English)."""
    try:
        prompt = f"""
        Previous conversation context:
        {conversation_context}

        Current user message: {english_query}
        
        Respond to the user message in a helpful and engaging way, taking into account
        the previous conversation context. If the response includes technical terms,
        please explain them simply.
        
        Remember to:
        - Be concise but thorough
        - Maintain conversation continuity
        - Use natural, conversational language
        - Include examples where appropriate
        """

        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"Error generating response: {str(e)}"

def translate_message_for_display(message: Dict, target_lang: str) -> Dict:
    """Translate a message for display while preserving the original."""
    if target_lang == 'en':
        return message
    
    return {
        "role": message["role"],
        "content": translate_text(message["content"], target_lang, 'en')
    }

def main():
    st.title("🌍 Multilingual Chat Assistant with Memory")
    
    # Initialize session state
    init_session_state()
    
    # Setup sidebar
    with st.sidebar:
        st.header("Settings")
        
        # Language selection
        selected_language = st.selectbox(
            "Choose your language",
            options=list(LANGUAGES.keys()),
            index=0
        )
        selected_lang_code = LANGUAGES[selected_language]
        
        # API key input
        api_key = st.text_input(
            "Enter your Google API Key",
            type="password",
            help="Get your API key from Google AI Studio"
        )
        if api_key:
            os.environ['GOOGLE_API_KEY'] = api_key
            
        # Conversation management
        st.header("Conversations")
        
        if st.button("New Conversation"):
            st.session_state.current_conversation_id = str(uuid.uuid4())
            st.session_state.messages = []
            st.session_state.displayed_messages = []
            
        # Load existing conversations
        conversations = load_conversations()
        if conversations:
            conversation_options = ["New Conversation"] + list(conversations.keys())
            selected_conversation = st.selectbox(
                "Select Conversation",
                options=conversation_options,
                index=0
            )
            
            if selected_conversation != "New Conversation":
                if st.session_state.current_conversation_id != selected_conversation:
                    st.session_state.current_conversation_id = selected_conversation
                    # Load English messages
                    st.session_state.messages = conversations[selected_conversation]['messages']
                    # Translate for display
                    st.session_state.displayed_messages = [
                        translate_message_for_display(msg, selected_lang_code)
                        for msg in st.session_state.messages
                    ]

    # Setup Gemini model
    model = setup_gemini()
    if not model:
        st.warning("Please enter a valid Google API key to continue.")
        return

    # Display chat messages
    for message in st.session_state.displayed_messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    print(f"Current conversation ID: {st.session_state.current_conversation_id}")
    print(f"Messages: {st.session_state.messages}")
    print(f"Displayed messages: {st.session_state.displayed_messages}")

    if query := st.chat_input("Type your message here..."):
        # Translate user message to English and store
        english_message = translate_text(query, 'en', selected_lang_code) if selected_lang_code != 'en' else query
        
        # Store original English message
        st.session_state.messages.append({"role": "user", "content": english_message})
        
        # Display translated message
        displayed_message = translate_message_for_display(
            {"role": "user", "content": english_message},
            selected_lang_code
        )
        st.session_state.displayed_messages.append(displayed_message)
        
        with st.chat_message("user"):
            st.markdown(displayed_message["content"])

        # Get conversation context (in English)
        conversation_context = get_conversation_context(st.session_state.messages)

        # Get bot response (in English)
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                english_response = get_gemini_response(
                    model,
                    english_message,
                    conversation_context
                )
                
                # Store original English response
                st.session_state.messages.append(
                    {"role": "assistant", "content": english_response}
                )
                
                # Display translated response
                displayed_response = translate_message_for_display(
                    {"role": "assistant", "content": english_response},
                    selected_lang_code
                )
                st.session_state.displayed_messages.append(displayed_response)
                st.markdown(displayed_response["content"])
        
        # Save conversation (in English)
        if st.session_state.current_conversation_id:
            save_conversation(
                st.session_state.current_conversation_id,
                st.session_state.messages
            )
        # Add a callback to change conversation language
    if st.session_state.get('language_selector') != selected_lang_code:
        st.session_state.messages = []  # Clear messages for new language
        st.session_state.displayed_messages = []  # Clear displayed messages
        st.session_state.current_conversation_id = None  # Reset conversation ID
        st.spinner("Loading new language...")  # Show loader while changing language

if __name__ == "__main__":
    st.set_page_config(
        page_title="Multilingual Chat Assistant",
        page_icon="🌍",
        layout="wide"
    )
    main()