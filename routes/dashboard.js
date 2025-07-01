const express = require("express");
const { GetAllEmployees , AddUser , GetUserByToken , GetSpecficUser} = require("../controller/ManageEmployee")
const authenticateJWT = require("../Middleware/auth")
const dashboardrouter = express.Router();

dashboardrouter.get("/employees" , authenticateJWT , GetAllEmployees);
dashboardrouter.post("/employees/add" , AddUser);
dashboardrouter.get("/" , authenticateJWT , GetUserByToken );


module.exports = dashboardrouter;