const express = require("express");
const loginrouter = express.Router();

const { HandleVerifyLogin } = require("../controller/Login")

loginrouter
  .route('/')
  .post(HandleVerifyLogin)

module.exports = loginrouter;