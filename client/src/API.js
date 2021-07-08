import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const production = "https://scphealthassessment-mg.herokuapp.com";
const development = "http://localhost";

const BASE_URL = process.env.NODE_ENV === 'production'? production: development;
const PORT = process.env.NODE_ENV === 'production'? process.env.PORT : 5000;

const data = {
  getAllLafayetteData: () => {
    const FULL_URL = `${BASE_URL}:${PORT}/api`;
    console.log(`LF: ${FULL_URL}`);
    const allData = axios.get(FULL_URL)
    return allData;
  },

  getDataByZipCode: (zip) => {
    // const dataByZip = axios.get(`http://localhost:5000/api/${zip}`);
    const FULL_URL = `${BASE_URL}:${PORT}/api/${zip}`;
    console.log(`ZIP: ${FULL_URL}`);

    const dataByZip = axios.get(FULL_URL);


    return dataByZip
  },
};

export default data;