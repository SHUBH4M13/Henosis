const Employee = require("../models/Employee");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function HandleEdit(req,res){
      try {
        const _id = req.user.user_id;
        const employee = await Employee.findById(_id);
  
        if (!employee) {
          return res.status(404).json({ msg: "User not found" });
        }
  
        const {
          firstName,
          lastName,
          bio,
          phoneNo,
          gender,
          location,
          dob,
          company,
          projects,
          roles,
        } = req.body;
  
        if (firstName) employee.firstName = firstName;
        if (lastName) employee.lastName = lastName;
        if (bio) employee.bio = bio;
        if (phoneNo) employee.phoneNo = phoneNo;
        if (gender) employee.gender = gender;
        if (location) employee.location = location;
        if (dob) employee.dob = dob;
        if (company) employee.company = company;
        if (projects) employee.projects = Array.isArray(projects) ? projects : [projects];
        if (roles) employee.roles = Array.isArray(roles) ? roles : [roles];
  
        if (req.file) {
          employee.profilePic.data = req.file.buffer;
          employee.profilePic.contentType = req.file.mimetype;
        }
  
        await employee.save();
  
        return res.json({ msg: "Profile updated successfully", user: employee });
      } catch (err) {
        console.error("Profile update failed:", err);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }

async function HandleGetUser(req,res){
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    HandleEdit,
    HandleGetUser
}