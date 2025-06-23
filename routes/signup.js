const express = require("express");
const signupRouter = express.Router();
const {HandleCreateUser , HandleVerifyOtp }  = require("../controller/Signup")

signupRouter
.route("/")
.get((req,res) => {
    res.send("this is signup page")
})
.post(HandleCreateUser)

signupRouter
.route("/OTP")
.post(HandleVerifyOtp);

module.exports = signupRouter;