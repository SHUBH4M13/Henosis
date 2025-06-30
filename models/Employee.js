const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true, 
    },
    profilePic: {
      data: Buffer,
      contentType: String
    },
    phoneNo: {
      type: String,
    },
    gender: {
        type: String,
    },
    location: {
      type: String,
      default: ""
    },
    dob: {
      type: Date,
    },
    company: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
          type: String
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    roles: [
      {
        type: String,
        enum: ["Admin", "Manager", "HR" , "Employee" , "Intern"],
      },
    ],
  
  }, { timestamps: true });

  const Employee = mongoose.model("Employee" , EmployeeSchema );

  module.exports = Employee