const express = require("express");
const { GetAllEmployees , AddUser , GetUserRoles} = require("../controller/ManageEmployee")
const authenticateJWT = require("../Middleware/auth")
const dashboardrouter = express.Router();

dashboardrouter.get("/employees" , authenticateJWT , GetAllEmployees);
dashboardrouter.get( "/" , authenticateJWT , GetUserRoles);
dashboardrouter.post("/employees/add" , AddUser);

module.exports = dashboardrouter