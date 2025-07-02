const Employee = require("../models/Employee");
const { SendWelcomeMail } = require("../controller/NodeMailer");

async function GetAllEmployees(req, res) {
  try {
    const allEmployees = await Employee.find({});
    if (!allEmployees)
      return res.status(404).json({ msg: "Error in fetching users" });

    return res.status(200).json({ allEmployees });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: "error" });
  }
}

async function GetSpecficUser(req, res) {
  try {
    const id = req.params.user_id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function GetUserByToken(req, res) {
  try {
    const id = req.user._id;
    const employee = await Employee.findById(id).select('-password');
    if (!employee) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function AddUser(req, res) {
  try {
    const id = req.user_id;
    const employee = await Employee.findById(id);
    const allowedRoles = ['HR' , 'Admin' , 'Manager'];
    if ( !employee.roles.some(role => allowedRoles.includes(role)) ) {
      return res.status(401).json({ msg: "not authorized roles to add user" });
    }
    const { email, firstName, password } = req.body;
    const mails = await Employee.create(req.body);
    SendWelcomeMail(email, firstName, email, password);
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function HandleGetManagers(req,res){
  try{
      const roles = ['manager'];
      const data = await Employee.find({
      roles: { $in: roles }
      });
      return res.status(201).json(data);
  } catch(err){
      console.log("error" , err);
      return res.status(400).json({msg : "error"})
  } 
}

async function HandleGetEmployees(req,res){
  try{
      const roles = ['employee'];
      const data = await Employee.find({
      roles: { $in: roles }
      });
      return res.status(201).json(data);
  } catch(err){
      console.log("error" , err);
      return res.status(400).json({msg : "error"})
  } 
}


module.exports = {
  GetAllEmployees,
  HandleGetManagers,
  HandleGetEmployees,
  GetSpecficUser,
  AddUser,
  GetUserByToken,
};
