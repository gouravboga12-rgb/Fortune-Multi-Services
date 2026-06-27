const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.SMTP_FROM || `"Fortune Multi Services" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your Login Verification Code - Fortune Multi Services',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b1329; color: #ffffff; padding: 40px 20px; text-align: center; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid rgba(255,255,255,0.05);">
        <h2 style="color: #00d2ff; font-weight: 900; margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Fortune Multi Services</h2>
        <p style="color: #b9c9d6; font-size: 14px; margin-bottom: 25px;">Use the following verification code to secure your session and complete your sign-in:</p>
        
        <div style="background-color: #112240; padding: 18px 30px; border-radius: 12px; border: 1px solid #1e3a8a; display: inline-block; margin-bottom: 25px;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #00d2ff; font-family: monospace;">${otp}</span>
        </div>
        
        <p style="color: #64748b; font-size: 11px; max-width: 320px; margin: 0 auto 20px auto; line-height: 1.5;">This verification code is valid for 5 minutes. If you did not request this sign-in code, please ignore this message.</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 25px 0;">
        <p style="color: #475569; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Secure Authentication System &copy; Fortune Multi Services</p>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
}

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (err) {
    console.error('Error verifying Google Token:', err);
    throw err;
  }
}

function generateSessionToken(email, role = 'user') {
  return jwt.sign({ email, role }, process.env.JWT_SECRET || 'fortune_multi_services_session_secret_key', {
    expiresIn: '7d'
  });
}

module.exports = {
  generateOTP,
  sendOTPEmail,
  verifyGoogleToken,
  generateSessionToken
};
