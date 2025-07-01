const Employee = require("../models/Employee");
const project = require("../models/Projects");

async function HandleCreateProject(req, res) {
    try {
      const content = req.body;
  
      if (!content) {
        return res.status(400).json({ msg: "Content not found" });
      }
  
      const newProject = await project.create(content);
  
      const { projectManager, projectTeam } = content;
      const allEmployeeIds = [...new Set([...projectManager, ...projectTeam])];
  
      await Employee.updateMany(
        { _id: { $in: allEmployeeIds } },
        { $push: { projects: newProject._id } }
      );
  
      return res.status(201).json({ msg: "Project created" });
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({ msg: "Error creating project" });
    }
  }
  

module.exports = {
    HandleCreateProject,
}