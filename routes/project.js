const express = require("express");
const authenticateJWT = require("../Middleware/auth")
const projectrouter = express.Router();
const { HandleCreateProject } = require("../controller/project");
const {HandleGetManagers , HandleGetEmployees } = require("../controller/ManageEmployee")

projectrouter.post("/create" , authenticateJWT , HandleCreateProject);
projectrouter.get("/managers" , authenticateJWT , HandleGetManagers );
projectrouter.get("/Employees" , authenticateJWT , HandleGetEmployees);

module.exports = projectrouter;