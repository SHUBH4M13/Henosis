const express = require("express");
const { GetAllEmployees , AddUser} = require("../controller/ManageEmployee")
const authenticateJWT = require("../Middleware/auth")
const dashboardrouter = express.Router();

dashboardrouter
.get("/employees" , authenticateJWT , GetAllEmployees )

dashboardrouter.post("/employees/add" , AddUser);

module.exports = dashboardrouter