const Employee = require("../models/Employee");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function HandleEdit(req,res){
      try {
        const requestedUserId = req.params.user_id;
        const authenticatedUserId = req.user._id; // JWT contains _id as per login controller
        
        // Validate the user_id parameter
        if (!requestedUserId) {
          return res.status(400).json({ msg: "User ID is required" });
        }

        // Check if the authenticated user is editing their own profile
        if (requestedUserId !== authenticatedUserId) {
          return res.status(403).json({ msg: "Access denied. You can only edit your own profile." });
        }

        const employee = await Employee.findById(requestedUserId);
  
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
  
        return res.json({ 
          success: true,
          msg: "Profile updated successfully", 
          user: employee 
        });
      } catch (err) {
        console.error("Profile update failed:", err);
        
        // Handle invalid ObjectId format
        if (err.name === 'CastError') {
          return res.status(400).json({ msg: "Invalid user ID format" });
        }
        
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }


async function HandleGetProfile(req, res) {
  try {
    const requestedUserId = req.params.user_id;
    
    if (!requestedUserId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const user = await Employee.findById(requestedUserId).select('-password'); // Exclude password from response
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ 
      success: true,
      user 
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: "Invalid user ID format" });
    } 
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = {
    HandleEdit,
    HandleGetProfile
}