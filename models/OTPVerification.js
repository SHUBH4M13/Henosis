const mongoose = require("mongoose");

const OTPVerifySchema = new mongoose.Schema({
    userId : String,
    otp : String,
    createdAt : Date,
    ExpiresAt: Date,
})

const OTPVerify = mongoose.model("OTPVerify", OTPVerifySchema);

module.exports = OTPVerify