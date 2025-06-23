const nodemailer = require("nodemailer");
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // required for port 465
    auth: {
        user: process.env.NodeMailer_User,
        pass: process.env.NodeMailer_Pass,
    },
});

function sendMail(to, GeneratedOTP) {
    
    const htmlTemp = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>OTP Verification</title>
    </head>
    <body style="margin:0; padding:0; background-color:#0b0b0b; font-family:'Segoe UI', sans-serif; color:#ffffff;">
      <div style="max-width:600px; margin:0 auto; padding:40px 24px;">
       <h1 style="font-size:36px; font-weight:700; text-align:center; margin-bottom:10px; background: linear-gradient(to right, #fd9a00, #ffcc70); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">
          Confirm Your Identity
        </h1>
        <p style="text-align:center; font-size:16px; color:#bbbbbb; margin-top:10px; margin-bottom:30px;">
          Use the code below to verify your email. This OTP is valid for 10 minutes only.
        </p>
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(8px); border-radius: 16px; padding: 30px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.4); margin-bottom: 40px;">
          <span style="font-size:40px; font-weight:600; letter-spacing:8px; color:#fd9a00;">
            ${GeneratedOTP}
          </span>
        </div>
        <p style="font-size:13px; text-align:center; color:#777;">
          Didn’t request this? Ignore this email. The OTP will expire automatically.
        </p>
      </div>
    </body>
    </html>`;

    transport.sendMail({
        from: process.env.NodeMailer_User,
        to: to,
        subject: "Your OTP Code - Henosis",
        html: htmlTemp,
    }, (err, info) => {
        if (err) {
            console.error("❌ Error sending OTP email:", err);
        } else {
            console.log("✅ OTP email sent:", info.response);
        }
    });
}

module.exports = {
    sendMail,
};
