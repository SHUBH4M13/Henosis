const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



async function HandleVerifyLogin(req,res){
    const {email , password } = req.body;

    if( !email || !password ){
        return res.status(400).json({msg : "Email or password is missing"})
    }

    const user = await Employee.findOne({email});

    if( !user ) return res.status(404).json({msg: "User not found"})

    if( user.verified === false ){
        return res.status(403).json({msg: "User not Verifed"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
        msg: "Login Successfull",
        token,
        user: {
            _id : user._id,
            name : user.firstName,
            email : user.email
        },
    })

}

module.exports = {
    HandleVerifyLogin
}