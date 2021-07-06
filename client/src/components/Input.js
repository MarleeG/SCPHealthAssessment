import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import API from "../API";
import { mean, median, mode } from "./Index.js";

import "./Input.css";
const { log } = console;
const Input = () => {
  const [numbers, setNumbers] = useState([]);
  const [isInputANumber, setIsInputANumber] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const checkIfInputIsANumber = (value) => {
    const updatedValue = parseFloat(value);

    if (!isNaN(updatedValue)) {
      // log(updatedValue);
      // log("is a number");

      setIsInputANumber(true);
    } else {
      // log(updatedValue);
      // log("is not a number");

      setIsInputANumber(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    checkIfInputIsANumber(value);
  };

  const handleSubmit = (e) => {
    // log("submit clicked");

    if (isInputANumber) {
      setNumbers([parseFloat(inputValue), ...numbers]);
    }
  };

  const getMedianMeanMode = () => {
    log(`MEAN: ${mean(numbers)}`);
    log("MODE:", mode(numbers));
    log("MEDIAN:", median(numbers));
    log(`-------------------------------------------------------`);
  };

  const getAllLafayetteData = async () => {
    let res;
    try {
      res = await API.getAllLafayetteData();
    } catch (err) {
      log(err);
    }

    console.log(res);
  };

  useEffect(() => {
    getAllLafayetteData()
  }, [numbers, inputValue]);

  // const Form = () => {
  //   return <Form>hello</Form>;
  // };

  return (
    <div>
      <strong>
        <label style={{ display: "block" }}>Enter a valid number</label>
      </strong>
      <input
        onChange={handleChange}
        value={inputValue}
        placeholder="Enter a number"
        name="numbers_input"
      />
      <Button
        className="mx-2"
        variant="dark"
        type="submit"
        disabled={!isInputANumber}
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>

      <Button
        variant="primary"
        size="md"
        onClick={() => {
          getMedianMeanMode();
        }}
        disabled={!(numbers.length > 0)}
      >
        {" "}
        Get Median, Mean, and Mode
      </Button>

      {numbers.length > 0 && (
        <div className="numbers-list my-5">
          {numbers.map((num, idx) => {
            return (
              <span className="mx-1 my-1" key={idx}>
                {num}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Input;
