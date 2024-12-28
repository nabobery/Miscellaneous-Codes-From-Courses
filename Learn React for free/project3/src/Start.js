import React from "react";

export default function Start(props) {
  return (
    <div className="start-container">
      <div className="start-blob1-container">
        <svg
          width="230"
          height="276"
          viewBox="0 0 230 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M99.4095 160.395C71.1213 129.851 33.3179 100.782 37.1728 59.3067C41.4394 13.401 75.8541 -26.3588 118.419 -44.1329C158.797 -60.9937 206.035 -51.2558 241.822 -26.1494C271.947 -5.01412 272.823 35.1244 282.141 70.729C292.17 109.051 318.521 149.811 296.501 182.779C273.539 217.159 224.991 222.432 183.931 217.768C148.318 213.723 123.751 186.677 99.4095 160.395Z"
            fill="#FFFAD1"
          />
        </svg>
      </div>
      <div className="start-blob2-container">
        <svg
          width="178"
          height="148"
          viewBox="0 0 148 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-5.55191 4.90596C35.9614 1.77499 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
            fill="#DEEBF8"
          />
        </svg>
      </div>
      <h1 className="start-title">Quizzical</h1>
      <h4 className="start-subscript-text">Take a Quick Quiz</h4>
      <button className="start-quiz" onClick={props.toggleStarted}>
        Start quiz
      </button>
    </div>
  );
}
