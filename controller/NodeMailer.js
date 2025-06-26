const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // required for port 465
  auth: {
    user: process.env.NodeMailer_User,
    pass: process.env.NodeMailer_Pass,
  },
});

function sendMailOTP(to, GeneratedOTP) {
  const htmlTemp = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>OTP Verification</title>
    </head>
    <body style="margin:0; padding:0; background-color:#0b0b0b; font-family:'Segoe UI', sans-serif; color:#ffffff;">
      <div style="max-width:600px; margin:0 auto; padding:40px 24px;">
       <h1 style="font-size:36px; font-weight:700; text-align:center; margin-bottom:10px; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">
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

  transport.sendMail(
    {
      from: process.env.NodeMailer_User,
      to: to,
      subject: "Your OTP Code - Henosis",
      html: htmlTemp,
    },
    (err, info) => {
      if (err) {
        console.error("❌ Error sending OTP email:", err);
      } else {
        console.log("✅ OTP email sent:", info.response);
      }
    }
  );
}

function SendWelcomeMail(to, firstname, email, password) {
  const HTMLTemp = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Account Credentials</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #000000;
            color: #ffffff;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #111111;
            border-radius: 16px;
            border: 1px solid #262626;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 1px solid #262626;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #a3a3a3;
            font-size: 16px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-text {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .description {
            color: #a3a3a3;
            margin-bottom: 30px;
            text-align: center;
            font-size: 16px;
        }
        
        .credentials-box {
            background-color: #1a1a1a;
            border: 1px solid #262626;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .credentials-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #ffffff;
        }
        
        .credential-item {
            margin-bottom: 15px;
            padding: 15px;
            background-color: #0a0a0a;
            border-radius: 8px;
            border-left: 4px solid #fd9a00;
        }
        
        .credential-label {
            font-size: 14px;
            color: #a3a3a3;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .credential-value {
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            word-break: break-all;
        }
        
        .warning-box {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            border: 1px solid #ef4444;
        }
        
        .warning-title {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 12px;
            color: #ffffff;
        }
        
        .warning-icon {
            margin-right: 8px;
            font-size: 20px;
        }
        
        .warning-text {
            color: #fecaca;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .warning-list {
            margin-top: 12px;
            padding-left: 20px;
        }
        
        .warning-list li {
            margin-bottom: 8px;
            color: #fecaca;
        }
        
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #fd9a00 0%, #e88800 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            margin: 20px auto;
            display: block;
            max-width: 200px;
            transition: all 0.3s ease;
        }
        
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(253, 154, 0, 0.3);
        }
        
        .footer {
            background-color: #0a0a0a;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #262626;
        }
        
        .footer-text {
            color: #737373;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .contact-info {
            color: #a3a3a3;
            font-size: 14px;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #262626 50%, transparent 100%);
            margin: 30px 0;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .welcome-text {
                font-size: 20px;
            }
            
            .credentials-box {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Relig Global</div>
            <div class="subtitle">Welcome to the team</div>
        </div>
        
        <div class="content">
            <h1 class="welcome-text">Welcome aboard, ${firstname}!</h1>
            <p class="description">
                We're excited to have you join our team. Below are your account credentials to access our platform and get started with your new role.
            </p>
            
            <div class="credentials-box">
                <h2 class="credentials-title">🔐 Your Account Credentials</h2>
                
                <div class="credential-item">
                    <div class="credential-label">Username/Email</div>
                    <div class="credential-value">${email}</div>
                </div>
                
                <div class="credential-item">
                    <div class="credential-label">Temporary Password</div>
                    <div class="credential-value">${password}</div>
                </div>
                
                <div class="credential-item">
                    <div class="credential-label">Portal URL</div>
                    <div class="credential-value">${`https://collab-x-mocha.vercel.app/`}</div>
                </div>
            </div>
            
            <div class="warning-box">
                <div class="warning-title">
                    <span class="warning-icon">⚠️</span>
                    Important Security Notice
                </div>
                <div class="warning-text">
                    Please read and follow these security guidelines carefully:
                </div>
                <ul class="warning-list">
                    <li><strong>Change your password immediately</strong> upon first login</li>
                    <li><strong>Never share</strong> your credentials with anyone</li>
                    <li><strong>Use a strong password</strong> with at least 8 characters, including uppercase, lowercase, numbers, and symbols</li>
                    <li><strong>Enable two-factor authentication</strong> when prompted</li>
                    <li><strong>Log out</strong> when finished, especially on shared computers</li>
                    <li><strong>Report any suspicious activity</strong> to IT immediately</li>
                </ul>
            </div>
            
            <a href="[PORTAL_URL]" class="action-button">
                Access Your Account
            </a>
            
            <div class="divider"></div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                This is an automated message from Relig Global
            </div>
            <div class="contact-info">
                If you have any questions, please contact our HR department
            </div>
        </div>
    </div>
</body>
</html>`;

  transport.sendMail(
    {
      from: process.env.NodeMailer_User,
      to: to,
      subject: "Welcome!",
      html: HTMLTemp,
    },
    (err, info) => {
      if (err) {
        console.error("❌ Error sending OTP email:", err);
      } else {
        console.log("✅ OTP email sent:", info.response);
      }
    }
  );
}

module.exports = {
  sendMailOTP,
  SendWelcomeMail,
};
