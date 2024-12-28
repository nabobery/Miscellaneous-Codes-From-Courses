import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function ConfettiComponent({ isTriggered, func}) {
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setIsConfettiActive(true);
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 2000);
      func(); // set the duration for how long the confetti should appear
    }
  }, [isTriggered]);

  return (
    <>
      {isConfettiActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
          onConfettiComplete={() => setIsConfettiActive(false)}
        />
      )}
    </>
  );
}
