import React from "react";

export default function Option(props) {
  //console.log("Renderd!")

  const styles = {
    backgroundColor: props.isHeld ? "#D6DBF5" : "white",
  };

  // const afterStyles = {
  //   backgroundColor: props.isCorrect
  //     ? "#94D7A2"
  //     : props.isHeld
  //     ? "#F8BCBC"
  //     : "white",
  // };

  const afterStyles = {
    backgroundColor: (props.optionText === props.correctAnswer)
      ? "#94D7A2"
      : props.isHeld
      ? "#F8BCBC"
      : "white",
  };

  const requiredStyle = props.checkAnswer ? afterStyles : styles;

  return (
    <button
      className="answer-button"
      style={requiredStyle}
      onClick={props.selectOption}
    >
      {" "}
      {props.optionText}{" "}
    </button>
  );
}
