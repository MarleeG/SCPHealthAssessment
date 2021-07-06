import React, { useState, useEffect, Fragment } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import API from "../API";
import { mean, median, mode } from "./Index.js";

import "./Input.css";
const { log } = console;
const Input = () => {
  const [numbers, setNumbers] = useState([]);
  const [isInputANumber, setIsInputANumber] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [showCalculatedDataCol, setShowCalculatedDataCol] = useState(false);
  const [stats, setStats] = useState({
    mean: null,
    median: null,
    mode: null,
    beginningDate: null,
    endingDate: null,
  });

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

  const dataComponent = (title, beginningDate, endingDate) => {
    const component = (
      <Fragment>
        <h4>{title}</h4>
        <strong>Dates: {`${beginningDate} - ${endingDate}`}</strong>
        <p>Mean: {stats.mean}</p> <p>Median: {stats.median}</p>{" "}
        <p style={{overflowWrap: "break-word"}}>Mode: {stats.mode.join(", ")}{" "}</p>
      </Fragment>
    );
    return component;
  };

  const getMedianMeanMode = () => {
    log(`MEAN: ${mean(numbers)}`);
    log("MODE:", mode(numbers));
    log("MEDIAN:", median(numbers));
    log(`-------------------------------------------------------`);
  };

  const getAllLafayetteData = async () => {
    setShowCalculatedDataCol(true);
    let res;
    try {
      res = await API.getAllLafayetteData();
    } catch (err) {
      log(err);
    }

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
    });

    // console.log(res.data.list);
    log(temperatures);
  };

  useEffect(() => {
    // getAllLafayetteData();
  }, [numbers, inputValue]);

  return (
    <div>
      <Container>
        <Row>
          <Col lg={12} className="my-4">
            <strong>
              <label className="mx-2">Enter a valid zip code</label>
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
              disabled={!isInputANumber}
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
              // disabled={!(numbers.length > 0)}
            >
              {" "}
              Get Median, Mean, and Mode for Lafayette
            </Button>
          </Col>

          {showCalculatedDataCol && (
            <Col lg={6}>
              {dataComponent(
                "Lafayette 3 day forcast",
                stats.beginningDate,
                stats.endingDate
              )}
            </Col>
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
