const Employee = require("../models/Employee")

async function GetAllEmployees(req,res){
    try {        
        const allEmployees = await Employee.find({});
        if( !allEmployees ) return res.status(404).json({msg: "Error in fetching users"});

        return res.status(200).json({allEmployees});

    } catch (error) {
        console.log("error" , error);
        return res.status(500).json({msg : "error"});
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
  

module.exports = {
    GetAllEmployees,
    GetSpecficUser
}