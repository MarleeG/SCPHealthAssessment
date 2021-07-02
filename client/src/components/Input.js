import React, { useState } from "react";

import "./Input.css";
const { log } = console;
const Input = () => {
  const [numbers, setNumbers] = useState([]);
  const [isInputANumber, setIsInputANumber] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const checkIfInputIsANumber = (value) => {
    const updatedValue = parseFloat(value);

    if (!isNaN(updatedValue)) {
      log(updatedValue);
      log("is a number");

      setIsInputANumber(true);
    } else {
      log(updatedValue);
      log("is not a number");

      setIsInputANumber(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    checkIfInputIsANumber(value);
  };

  return (
    <div>
      {" "}
      <strong>
        <label style={{ display: "block" }}>Enter a valid number</label>
      </strong>
      <input
        onChange={handleChange}
        value={inputValue}
        placeholder="Enter a number"
        name="numbers_input"
      />
    </div>
  );
};

export default Input;
