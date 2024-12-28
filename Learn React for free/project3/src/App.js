import React from "react";
import Start from "./Start";
import Questions from "./Questions";
//import Confetti from 'react-confetti';
//import ReactCanvasConfetti from "react-canvas-confetti";
import "./style.css";

export default function App() {
  const [started, setStarted] = React.useState(false);
  // const [playAgain, setPlayAgain] = React.useState(false);
  // const [allQuestions, setAllQuestions] = React.useState(questionsData);

  function toggleStarted() {
    //console.log("Change start!")
    setStarted((prevStarted) => !prevStarted);
  }



  // function takeQuizAgain() {
  //   //console.log("working!")
  //   setPlayAgain((prevPlayAgain) => !prevPlayAgain);
  //   toggleStarted();
  // }

  // Anime : https://opentdb.com/api.php?amount=5&category=31&type=multiple
  // Maths : https://opentdb.com/api.php?amount=5&category=19&type=multiple

  // React.useEffect(() => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=5&category=19&type=multiple"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllQuestions(data);
  //     });
  // }, [playAgain]);

  // playAgain started
  // console.log(data)

  return (
    <div>
      {started ? (
        <Questions
          // playAgain={playAgain}
          // takeQuizAgain={takeQuizAgain}
          // allQuestions={allQuestions}
        />
      ) : (
        <Start toggleStarted={toggleStarted} />
      )}
    </div>
  );
}
