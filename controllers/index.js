const fetch = require("node-fetch");
const APP_ID = process.env.APPID;

const API_METHODS = {
  getLafayetteData: (req, res) => {
    const URL = `http://api.openweathermap.org/data/2.5/forecast?lat=30.2240897&lon=-92.01984270000003&cnt=25&units=imperial&appid=${APP_ID}`;

    fetch(URL, {method: 'GET'})
      .then((response) => response.json())
      .then((data) => res.json(data));
  },

  getDataByZip: (req, res) => {
    const zip = req.params.zip

    const URL = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&cnt=25&units=imperial&appid=${APP_ID}`;

    fetch(URL, {method: 'GET'})
      .then((response) => response.json())
      .then((data) => res.json(data));
  }
};

module.exports = API_METHODS;