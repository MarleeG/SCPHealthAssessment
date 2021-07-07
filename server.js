const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const apiRoutes = require("./routes/api");

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`🌎 ==> API server now on port ${PORT}!`);
  
});