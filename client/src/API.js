import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const data = {
  // getAllLafayetteData: () => {
  //   const URL = `http://api.openweathermap.org/data/2.5/forecast?lat=30.2240897&lon=-92.01984270000003&cnt=25&units=imperial&appid=${process.env.REACT_APP_APP_ID}`;
  //   const allData = axios.get(URL);

  //   return allData;
  // },
  // getDataByZipCode: (zip) => {
  //   const URL = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&cnt=25&units=imperial&appid=${process.env.REACT_APP_APP_ID}`;

  //   return axios.get(URL);
  // },


  getAllLafayetteData: () => {
    const allData = axios.get("http://localhost:5000/api")
    return allData;
  },

  getDataByZipCode: (zip) => {
    const dataByZip = axios.get(`http://localhost:5000/api/${zip}`);

    return dataByZip
  },
};

export default data;