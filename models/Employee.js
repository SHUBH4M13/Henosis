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
    password: {
      type: String,
      required: true, 
    },
    phoneNo: {
      type: String,
    },
    gender: [
      {
          type: [String],
          enum: ["male" , "female"],
      }
    ],
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
        ref: "User",
      },
    ],
    roles: [
      {
        type: String,
        enum: ["Admin", "Manager", "Employee"],
      },
    ],
  
  }, { timestamps: true });

  const Employee = mongoose.model("Employee" , EmployeeSchema );

  module.exports = Employee