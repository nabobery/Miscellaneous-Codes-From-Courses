import streamlit as st
import google.generativeai as genai
from deep_translator import GoogleTranslator
from typing import Dict, List
import os
from datetime import datetime

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
        st.session_state.messages = []
    if "conversation" not in st.session_state:
        st.session_state.conversation = None

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
        return text  # Return original text if translation fails

def get_gemini_response(model, user_message: str, selected_lang: str) -> str:
    """Get response from Gemini with error handling and translation."""
    try:
        # Translate user message to English if needed
        if selected_lang != 'en':
            english_query = translate_text(user_message, 'en', selected_lang)
        else:
            english_query = user_message

        print(f"Query: {english_query}")

        # Craft prompt for better responses
        prompt = f"""
        Respond to the following query in a helpful and engaging way. 
        If the response includes technical terms, please explain them simply.
        Query: {english_query}
        
        Remember to:
        - Be concise but thorough
        - Use natural, conversational language
        - Include examples where appropriate
        """

        response = model.generate_content(prompt)

        print(f"Response: {response.text}")
        
        # Translate response back to selected language if needed
        if selected_lang != 'en':
            return translate_text(response.text, selected_lang, 'en')
        return response.text

    except Exception as e:
        return f"Error generating response: {str(e)}"

def main():
    st.title("🌍 Multilingual Chat Assistant")
    
    # Initialize session state
    init_session_state()
    
    # Setup sidebar
    with st.sidebar:
        st.header("Settings")
        selected_language = st.selectbox(
            "Choose your language",
            options=list(LANGUAGES.keys()),
            index=0
        )
        
        # API key input
        api_key = st.text_input(
            "Enter your Google API Key",
            type="password",
            help="Get your API key from Google AI Studio"
        )
        if api_key:
            os.environ['GOOGLE_API_KEY'] = api_key

    # Setup Gemini model
    model = setup_gemini()
    if not model:
        st.warning("Please enter a valid Google API key to continue.")
        return

    # Chat interface
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    if query := st.chat_input("Type your message here..."):
        # Add user message to chat
        st.session_state.messages.append({"role": "user", "content": query})
        with st.chat_message("user"):
            st.markdown(query)

        # Get bot response
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                response = get_gemini_response(
                    model,
                    query,
                    LANGUAGES[selected_language]
                )
                st.markdown(response)
                st.session_state.messages.append(
                    {"role": "assistant", "content": response}
                )

if __name__ == "__main__":
    st.set_page_config(
        page_title="Multilingual Chat Assistant",
        page_icon="🌍",
        layout="wide"
    )
    main()