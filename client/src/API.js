import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const log = console;
const data = {
  getAllLafayetteData: () => {
    const allData = axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=30.2240897&lon=-92.01984270000003&cnt=24&appid=${process.env.REACT_APP_APP_ID}`
    );

    return allData;
  },
};

export default data;