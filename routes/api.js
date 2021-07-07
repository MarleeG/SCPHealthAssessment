const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({"hello": 'hi'})
});

module.exports = router;