const mongoose = require("mongoose");

const ProjectScehma = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectDesc: {
    type: String,
  },
  projectManager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  projectTeam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  projectBoard: {
    ToDo: [
      {
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        assignee: {
          type: String,
          default: "",
        },
        dueDate: {
          type: Date,
        },
        tags: {
          type: [String],
          default: [],
        },
      },
    ],
    InProgress: [
      {
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        assignee: {
          type: String,
          default: "",
        },
        dueDate: {
          type: Date,
        },
        tags: {
          type: [String],
          default: [],
        },
      },
    ],
    Done: [
      {
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        assignee: {
          type: String,
          default: "",
        },
        dueDate: {
          type: Date,
        },
        tags: {
          type: [String],
          default: [],
        },
      },
    ],
  },
});

const project = mongoose.model("project", ProjectScehma);

module.exports = project;
