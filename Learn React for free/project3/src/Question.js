import React from "react";
import Option from "./Option";

export default function Question(props) {
  function shuffle(arr) {
    let newArr = [];
    let currentIndex = arr.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    for (let i = 0; i < 4; i++) newArr.push(arr[i]);
    setOptions(newArr);
    //return newArr;
  }

  //var opt = []
  //opt.push(...props.incorrect_answers)
  //opt.push(props.correct_answer)
  const [options, setOptions] = React.useState(props.options);
  //console.log(options)

  //options = [...props.options]
    React.useEffect(() => {
      //opt.push(...props.incorrect_answers)
      //opt.push(props.correct_answer)
      shuffle(props.options);
      //console.log(options)
      console.log("Shuffled!")
    }, []);

  // [props.playAgain]) [props.options]

  // const [isCorrect, setIsCorrect] = React.useState([
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);
  
  // const [isDisabled, setIsDisabled] = React.useState(true);
  const [isHeldArray, setisHeldArray] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  
  React.useEffect(() => {
    for (var i = 0; i < 4; i++) {
      if (options[i] === props.correct_answer) {
        //var newIsCorrect = [...isCorrect];
        //newIsCorrect[i] = true;
        //setIsCorrect(newIsCorrect);
        if (isHeldArray[i]) {
          props.incrementCorrectAnswers();
        }
      }
    }
  }, [options, isHeldArray]);


  function selectOption(index) {
    let newIsHeldArray = [false, false, false, false];
    newIsHeldArray[index] = true;
    setisHeldArray(newIsHeldArray);
  }

  //console.log(options)

  const allOptions = options.map(function (option, index) {
    return (
      <Option
        key={index}
        isHeld={isHeldArray[index]}
        optionText={option}
        //isCorrect={isCorrect[index]}
        correctAnswer = {props.correct_answer}
        checkAnswer={props.checkAnswer}
        selectOption={() => selectOption(index)}
      />
    );
  });
  //console.log(allOptions)

  // <h1 className="question-text" dangerouslySetInnerHTML={{__html: props.question}}></h1>
  // <h1 className="question-text">{props.question}</h1>

  return (
    <div className="question-container">
      <h1 className="question-text" dangerouslySetInnerHTML={{__html: props.question}}/>
      <div className="options-container">{allOptions}</div>
    </div>
  );
}

/*
<button className = "answer-button">{options[0]}</button>
                <button className = "answer-button">{options[1]}</button>
                <button className = "answer-button">{options[2]}</button>
                <button className = "answer-button">{options[3]}</button>
*/
