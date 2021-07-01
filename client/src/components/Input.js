import React, { useState } from "react";

import "./Input.css";
const Input = () => {
  // eslint-disable-next-line
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div>
      {" "}
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