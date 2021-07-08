import axios from "axios";

const production = "https://scphealthassessment-mg.herokuapp.com";
const development = "http://localhost:5000";

const BASE_URL = process.env.NODE_ENV === 'production'? production: development;

const data = {
  getAllLafayetteData: () => {
    const FULL_URL = `${BASE_URL}/api`;
    const allData = axios.get(FULL_URL)
    return allData;
  },

  getDataByZipCode: (zip) => {
    const FULL_URL = `${BASE_URL}/api/${zip}`;
    const dataByZip = axios.get(FULL_URL);
    return dataByZip
  },
};

export default data;