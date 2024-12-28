import React from "react";
import Question from "./Question";
import Confetti from "./confetti";
// import questionsData from "./questionsData.js"

export default function Questions(props) {
  const [allQuestions, setAllQuestions] = React.useState({});
  const [checkAnswer, setCheckAnswer] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConfettiTriggered, setIsConfettiTriggered] = React.useState(false);

  function checkAnswers() {
    setCheckAnswer((prevCheckAnswer) => !prevCheckAnswer);
  }

  function incrementCorrectAnswers() {
    setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
	if(correctAnswers === 5){
		setIsConfettiTriggered(true);
	}
  }

  async function fetchQuestions() {
    console.log("fetching questions");
    setCorrectAnswers(0);
    setCheckAnswer(false);
    setIsLoading(true);
    // fetch("https://opentdb.com/api.php?amount=5&category=19&type=multiple")
    //   .then((response) => {console.log(response);return response.json()})
    //   .then((data) => {
    //     setAllQuestions(data);
    //     setIsLoading(false);
    //   }).catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=19&type=multiple"
      );
      console.log(response);
      const data = await response.json();
      setAllQuestions(data);
      setIsLoading(false);
    }catch(err){
      console.log(err);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    console.log("useEffect");
    fetchQuestions();
  }, []);

  const questions = allQuestions?.results?.map(function (item, index) {
    if(!item) return null;
    var opt = [];
    opt.push(...item.incorrect_answers);
    opt.push(item.correct_answer);
    return (
      <Question
        key={index}
        question={item.question}
        correct_answer={item.correct_answer}
        options={opt}
        checkAnswer={checkAnswer}
        //started = {props.started}
        playAgain={props.playAgain}
        incrementCorrectAnswers={incrementCorrectAnswers}
      />
    );
    // return (
    //   JSON.parse(JSON.stringify(allQuestions))
    // );
  });

  function confettiSwitch(){
	
  }

  var checkbutton = (
    <div className="check-answer-container">
      <button className="check-answer-button" onClick={checkAnswers}>
        Check answers
      </button>
    </div>
  );

  var footer = checkAnswer ? (
    <div className="play-again-container">
      <h2>You scored {correctAnswers}/5 correct answers</h2>
      <button
        className="play-again-button"
        onClick={fetchQuestions}
      >
        Play Again
      </button>
    </div>
  ) : 
    (isLoading ? <div></div> : checkbutton);

  //console.log(questions)

  // const loading = (
  //   <div class="socket">
	// 		<div class="gel center-gel">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c1 r1">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c2 r1">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c3 r1">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c4 r1">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c5 r1">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c6 r1">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
			
	// 		<div class="gel c7 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
			
	// 		<div class="gel c8 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c9 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c10 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c11 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c12 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c13 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c14 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c15 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c16 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c17 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c18 r2">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c19 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c20 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c21 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c22 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c23 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c24 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c25 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c26 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c28 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c29 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c30 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c31 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c32 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c33 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c34 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c35 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c36 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
	// 		<div class="gel c37 r3">
	// 			<div class="hex-brick h1"></div>
	// 			<div class="hex-brick h2"></div>
	// 			<div class="hex-brick h3"></div>
	// 		</div>
			
	// 	</div>
  // );

  const loading = (
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

  return (
    <div className="questions-container">
	  <Confetti isTriggered={isConfettiTriggered} />
      <div className="questions-blob1-container">
        <svg
          width="210"
          height="235"
          viewBox="0 0 162 187"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M99.4095 71.3947C71.1213 40.8508 33.3179 11.7816 37.1727 -29.6933C41.4394 -75.599 75.854 -115.359 118.419 -133.133C158.797 -149.994 206.035 -140.256 241.822 -115.149C271.947 -94.0141 272.823 -53.8756 282.141 -18.271C292.17 20.0508 318.521 60.8106 296.501 93.7792C273.538 128.159 224.991 133.432 183.931 128.768C148.318 124.723 123.751 97.6768 99.4095 71.3947Z"
            fill="#FFFAD1"
          />
        </svg>
      </div>
      {/* <div className="loading">Loading...</div> */}
      <div className = "loading">
        {isLoading? loading: questions}
      </div>
      <div className="questions-blob2-container">
        <svg
          width="125"
          height="122"
          viewBox="0 0 65 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-38.919 2.96445C-10.8241 1.07254 20.4975 -5.87426 40.8434 11.5469C63.3629 30.8293 69.9281 62.0589 61.4141 88.8747C53.3376 114.313 28.2818 132.992 -0.0909882 140.475C-23.9759 146.775 -45.6063 132.093 -68.3914 123.11C-92.9153 113.441 -125.606 110.575 -133.794 87.7612C-142.333 63.9714 -124.677 39.0277 -104.912 21.3621C-87.7687 6.03978 -63.0936 4.59238 -38.919 2.96445Z"
            fill="#DEEBF8"
          />
        </svg>
      </div>
      {footer}
    </div>
  );
}



