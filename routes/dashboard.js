const express = require("express");
const { GetAllEmployees } = require("../controller/ManageEmployee")
const dashboardrouter = express.Router();

dashboardrouter
.get("/employees" , GetAllEmployees )


module.exports = dashboardrouter