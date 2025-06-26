const Employee = require("../models/Employee");
const OTPVerify = require("../models/OTPVerification");

const bcrypt = require("bcrypt")
const {sendMailOTP} = require("../controller/NodeMailer")

async function HandleCreateUser(req,res){
    const body = req.body;
    try {
        const hashedPassword = await bcrypt.hash(body.password , 10);
        const NewEmployee = await Employee.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email.toLowerCase(),
            password: hashedPassword,
        })

        await SendGenerateOTP({mailToBeVerifed: body.email});

        return res.status(201).json({ 
            msg: "User created successfully",
            emp_id: NewEmployee._id  // Return the employee ID
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "Failed to create user"});
    }
}

async function SendGenerateOTP({ mailToBeVerifed }) {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        await sendMailOTP(mailToBeVerifed, otp);

        const hashedOTP = await bcrypt.hash(otp, 10);
        const employee = await Employee.findOne({ email: mailToBeVerifed });

        if (!employee) {
            throw new Error("User not found for OTP generation");
        }

        await OTPVerify.create({
            userId: employee._id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

    } catch (err) {
        console.error("OTP generation failed:", err);
        throw err;
    }
}

async function HandleVerifyOtp(req, res) {
    const { emp_id, otp } = req.body;

    if (!emp_id || !otp) {
        return res.status(400).json({ error: "emp_id and otp are required" });
    }

    try {
        // Look for OTP record by userId, not _id
        const otpRecord = await OTPVerify.findOne({ userId: emp_id });

        if (!otpRecord) {
            return res.status(400).json({ error: "No OTP record found for this user" });
        }

        if (otpRecord.expiresAt < Date.now()) {
            // Clean up expired OTP
            await OTPVerify.deleteMany({ userId: emp_id });
            return res.status(400).json({ error: "OTP has expired" });
        }
        
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Delete all OTP records for this user after successful verification
        await OTPVerify.deleteMany({ userId: emp_id });
        
        // Optional: Mark user as verified
        await Employee.findByIdAndUpdate(emp_id, { verified: true });
        
        return res.status(200).json({ 
            message: "OTP verified successfully", 
            emp_id: emp_id 
        });
    } catch (err) {
        console.error("OTP verification error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    HandleCreateUser,
    SendGenerateOTP,
    HandleVerifyOtp,
}