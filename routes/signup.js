const express = require("express");
const signupRouter = express.Router();
const bcrypt = require("bcrypt")

signupRouter
.route("/signup")
.get((req,res) => {
    res.send("this is signup page")
})
.post( async (req,res) => {
    const body = req.body;

    try {
        const hashedPassword = await bcrypt.hash(body.password , 10);
        const NewEmployee = await Employee.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email.toLowerCase(),
            password: hashedPassword,
            phoneNo: body.phoneNo || "",
        })
        return res.status(201).json({ msg: "User created successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Failed to create user"});
    }
});

module.exports = signupRouter;