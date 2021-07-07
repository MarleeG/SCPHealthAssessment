const express = require("express");
const router = express.Router();
const {getLafayetteData, getDataByZip} = require("../controllers/index")

router
  .get("/", getLafayetteData)
  .get(`/:zip`, getDataByZip);

  module.exports = router;