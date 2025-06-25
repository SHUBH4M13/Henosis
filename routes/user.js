const express = require("express");
const authenticateJWT = require("../Middleware/auth")
const UserRouter = express.Router();
const { GetSpecficUser } = require("../controller/ManageEmployee");

UserRouter
.get("/:user_id" , authenticateJWT , GetSpecficUser);

module.exports = UserRouter;