import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import './styles/LinearProgressBar.scss'

function LinearProgressBar({ optionsQuantity, completedAmount }) {
  return (
    <ProgressBar
      barContainerClassName="container"
      completedClassName="barCompleted"
      labelClassName="label"
      className="progress-bar"
      completed={Math.ceil(
        parseInt(completedAmount, 10) / parseInt(optionsQuantity, 10)*100
      )}
    />
  );
}

export default LinearProgressBar;
