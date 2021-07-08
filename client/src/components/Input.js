import React, { useState, useEffect, Fragment } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { mean, median, mode, orderedTemperatures } from "./Index.js";
import API from "../API";

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

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    if (checkIfValidZipCode(value)) {
      setIsValidZip(true);
    } else {
      setIsValidZip(false);
    }
  };

  const handleSubmit = (e) => {
    setShowCalculatedDataCol(true);
    getDataByZipCode(inputValue);
  };

  const setCalculatedData = (res) => {
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
    return isValidZip;
  };

  useEffect(() => {}, []);

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
    </div>
  );
};

export default Input;
