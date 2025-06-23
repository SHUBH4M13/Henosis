const express = require("express");
const loginrouter = express.Router();

loginrouter
  .route('/')
  .get((req, res) => {
    res.send("this is login page");
  });


module.exports = loginrouter;