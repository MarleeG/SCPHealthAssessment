import React, { useState, useEffect, Fragment, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import API from "../API";
import { mean, median, mode, orderedTemperatures } from "./Index.js";

import "./Input.css";
const { log } = console;

const dataComponent = (
  title,
  { mean, median, mode, orderedTemperatures, beginningDate, endingDate, city }
) => {
  const component = (
    <Fragment>
      <h4>{city}'s 3 day forecast</h4>
      <strong>Dates: {`${beginningDate} - ${endingDate}`}</strong>
      <p>
        Mean: {mean}
        {"\u00b0"}F
      </p>
      <p>
        Median: {median}
        {"\u00b0"}F
      </p>{" "}
      <p style={{ overflowWrap: "break-word" }}>
        Mode: {mode !== 0 && mode.join(", ")}{" "}
      </p>
      <p style={{ overflowWrap: "break-word" }}>
        All Temps: {orderedTemperatures !== 0 && orderedTemperatures.join(", ")}
      </p>
    </Fragment>
  );
  return component;
};

const Input = () => {
  // const [numbers, setNumbers] = useState([]);
  // const [isInputANumber, setIsInputANumber] = useState(false);
  const [isValidZip, setIsValidZip] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showCalculatedDataCol, setShowCalculatedDataCol] = useState(false);
  const [stats, setStats] = useState({
    mean: 0,
    median: 0,
    mode: 0,
    orderedTemperatures: 0,
    beginningDate: null,
    endingDate: null,
    city: "",
  });

  // const checkIfInputIsANumber = (value) => {
  //   const updatedValue = parseFloat(value);

  //   if (!isNaN(updatedValue)) {
  //     // log(updatedValue);
  //     // log("is a number");

  //     setIsInputANumber(true);
  //   } else {
  //     // log(updatedValue);
  //     // log("is not a number");

  //     setIsInputANumber(false);
  //   }
  // };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    // checkIfInputIsANumber(value);

    if (checkIfValidZipCode(value)) {
      // setIsInputANumber(true);
      setIsValidZip(true);
    } else {
      // setIsInputANumber(false);
      setIsValidZip(false);
    }
  };

  const handleSubmit = (e) => {
    // if (isInputANumber) {
    //   setNumbers([parseFloat(inputValue), ...numbers]);
    // }

    // checkIfValidZipCode(inputValue);

    setShowCalculatedDataCol(true);
    getDataByZipCode(inputValue);
  };

  // const getMedianMeanMode = () => {
  //   log(`MEAN: ${mean(numbers)}`);
  //   log("MODE:", mode(numbers));
  //   log("MEDIAN:", median(numbers));
  //   log(`-------------------------------------------------------`);
  // };

  const setCalculatedData = (res) => {
    log(res);

    setShowCalculatedDataCol(true);
    const data = res.data.list;
    const beginningDate = res.data.list[0].dt_txt;
    const endingDate = res.data.list[res.data.list.length - 1].dt_txt;

    let temperatures = [];

    for (let i = 0; i < data.length; i++) {
      const curretTemp = data[i].main.temp;
      temperatures.push(curretTemp);
    }

    setStats({
      ...stats,
      beginningDate: beginningDate,
      endingDate: endingDate,
      mean: mean(temperatures),
      median: median(temperatures),
      mode: mode(temperatures),
      orderedTemperatures: orderedTemperatures(temperatures),
      city: res.data.city.name,
    });

    setInputValue("");
    setIsValidZip(false);
  };

  const getAllLafayetteData = async () => {
    let res;
    try {
      res = await API.getAllLafayetteData();
    } catch (err) {
      throw err;
    }

    setCalculatedData(res);
  };

  const getDataByZipCode = async (zip) => {
    log(`zip: ${zip}`)
    let res;
    try {
      res = await API.getDataByZipCode(zip);
    } catch (err) {
      throw err;
    }

    setCalculatedData(res);
  };

  const checkIfValidZipCode = (zip) => {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    // console.log(isValidZip);
    return isValidZip;
  };

  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, [inputValue, stats]);

  return (
    <div>
      <Container>
        <Row>
          <Col lg={12} className="my-4">
            <strong>
              <label className="mx-2">Enter a valid 5-digit US zip code</label>
            </strong>
            <input
              onChange={handleChange}
              value={inputValue}
              placeholder="Enter a zip code"
              name="numbers_input"
            />

            <Button
              className="mx-2"
              variant="dark"
              type="submit"
              disabled={!isValidZip}
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>

        <Row>
          <Col lg={showCalculatedDataCol ? 6 : 12}>
            {/* <Button
              variant="primary"
              size="md"
              onClick={() => {
                getMedianMeanMode();
              }}
              disabled={!(numbers.length > 0)}
            >
              {" "}
              Get Median, Mean, and Mode
            </Button> */}

            <Button
              variant="dark"
              size="lg"
              onClick={() => {
                getAllLafayetteData();
              }}
            >
              {" "}
              Get Median, Mean, and Mode for Lafayette
            </Button>
          </Col>

          {showCalculatedDataCol && (
            <Col lg={6}>{dataComponent("Lafayette 3 day forcast", stats)}</Col>
          )}
        </Row>
      </Container>

      {/* {numbers.length > 0 && (
        <div className="numbers-list my-5">
          {numbers.map((num, idx) => {
            return (
              <span className="mx-1 my-1" key={idx}>
                {num}
              </span>
            );
          })}
        </div>
      )} */}
    </div>
  );
};

export default Input;
