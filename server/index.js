const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Set limits high to support base64 document/certificate uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API Route: Authentication ---
const auth = require('./auth');
const bcrypt = require('bcryptjs');

// Register OTP Request
app.post('/api/auth/register-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const existingUser = await db.getUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' });
    }

    const otp = auth.generateOTP();
    global.registerOtps = global.registerOtps || {};
    global.registerOtps[cleanEmail] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    // Send registration OTP via shared SMTP transporter in auth.js
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    console.log('SMTP_USER:', smtpUser ? 'loaded' : 'MISSING');
    console.log('SMTP_PASS:', smtpPass ? 'loaded' : 'MISSING');

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: `"Fortune Multi Services" <${smtpUser}>`,
      to: cleanEmail,
      subject: 'Verify Your Email - Fortune Multi Services',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b1329; color: #ffffff; padding: 40px 20px; text-align: center; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid rgba(255,255,255,0.05);">
          <h2 style="color: #00d2ff; font-weight: 900; margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase;">Verify Registration</h2>
          <p style="color: #b9c9d6; font-size: 14px; margin-bottom: 25px;">Use the verification code below to complete your account registration:</p>
          <div style="background-color: #112240; padding: 18px 30px; border-radius: 12px; border: 1px solid #1e3a8a; display: inline-block; margin-bottom: 25px;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #00d2ff; font-family: monospace;">${otp}</span>
          </div>
          <p style="color: #64748b; font-size: 11px; max-width: 320px; margin: 0 auto 20px auto;">This verification code is valid for 10 minutes.</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 25px 0;">
          <p style="color: #475569; font-size: 9px; text-transform: uppercase; letter-spacing: 1px;">Secure Authentication System &copy; Fortune Multi Services</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Verification OTP sent to your email.' });
  } catch (err) {
    console.error('Registration OTP dispatch failed:', err);
    return res.status(500).json({ error: 'Failed to send verification email. Please verify your SMTP credentials.' });
  }
});

// Verify Register OTP & Create User
app.post('/api/auth/register-verify', async (req, res) => {
  const { name, email, password, otp } = req.body;
  if (!email || !password || !otp) {
    return res.status(400).json({ error: 'Email, password, and OTP code are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const record = global.registerOtps ? global.registerOtps[cleanEmail] : null;

  if (!record || record.code !== otp.trim()) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  if (record.expiresAt < Date.now()) {
    delete global.registerOtps[cleanEmail];
    return res.status(400).json({ error: 'Verification code has expired' });
  }

  // Clear OTP
  delete global.registerOtps[cleanEmail];

  try {
    const existingUser = await db.getUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await db.createUser(cleanEmail, passwordHash, name || '');
    const token = auth.generateSessionToken(cleanEmail);

    return res.status(201).json({
      success: true,
      token,
      role: 'user',
      user: { email: cleanEmail, name: name || '', role: 'user' }
    });
  } catch (err) {
    console.error('Verify registration error:', err);
    return res.status(500).json({ error: 'Failed to create user account' });
  }
});

// Register User
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const existingUser = await db.getUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await db.createUser(cleanEmail, passwordHash, name || '');
    const token = auth.generateSessionToken(cleanEmail);

    // Send welcome email via SMTP (asynchronous background task)
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || `"Fortune Multi Services" <${process.env.SMTP_USER}>`,
        to: cleanEmail,
        subject: 'Welcome to Fortune Multi Services!',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0b1329; color: #ffffff; padding: 40px 20px; text-align: center; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid rgba(255,255,255,0.05);">
            <h2 style="color: #00d2ff; font-weight: 900; margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase;">Welcome!</h2>
            <p style="color: #b9c9d6; font-size: 14px; margin-bottom: 25px;">Thank you for registering at Fortune Multi Services, ${name || 'Valued Client'}. Your account is fully active.</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 25px 0;">
            <p style="color: #475569; font-size: 9px; text-transform: uppercase; letter-spacing: 1px;">Secure Authentication System &copy; Fortune Multi Services</p>
          </div>
        `
      };
      transporter.sendMail(mailOptions).catch(err => {
        console.error('SMTP background Welcome Email dispatch failed:', err.message);
      });
    } catch (e) {
      console.error('Failed to initialize welcome email config:', e.message);
    }

    return res.status(201).json({
      success: true,
      token,
      role: 'user',
      user: { email: cleanEmail, name: name || '', role: 'user' }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Password Login User
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const user = await db.getUserByEmail(cleanEmail);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    if (!user.password) {
      return res.status(400).json({ error: 'This account was created via Google Sign-In. Please sign in using Google.' });
    }

    const matches = bcrypt.compareSync(password, user.password);
    if (!matches) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = auth.generateSessionToken(cleanEmail);
    return res.status(200).json({
      success: true,
      token,
      role: 'user',
      user: { email: cleanEmail, name: user.name || '', role: 'user' }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server login error' });
  }
});

// Forgot Password OTP Request
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  try {
    const user = await db.getUserByEmail(cleanEmail);
    if (!user) {
      return res.status(400).json({ error: 'No account found with this email address' });
    }

    const otp = auth.generateOTP();
    global.resetOtps = global.resetOtps || {};
    global.resetOtps[cleanEmail] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    // Send password reset OTP mail via SMTP
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Fortune Multi Services" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: 'Reset Your Password - Fortune Multi Services',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0b1329; color: #ffffff; padding: 40px 20px; text-align: center; border-radius: 16px; max-width: 500px; margin: auto; border: 1px solid rgba(255,255,255,0.05);">
          <h2 style="color: #00d2ff; font-weight: 900; margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase;">Reset Password</h2>
          <p style="color: #b9c9d6; font-size: 14px; margin-bottom: 25px;">Use the verification code below to reset your portal password:</p>
          <div style="background-color: #112240; padding: 18px 30px; border-radius: 12px; border: 1px solid #1e3a8a; display: inline-block; margin-bottom: 25px;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #00d2ff; font-family: monospace;">${otp}</span>
          </div>
          <p style="color: #64748b; font-size: 11px; max-width: 320px; margin: 0 auto 20px auto;">This verification code is valid for 10 minutes.</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 25px 0;">
          <p style="color: #475569; font-size: 9px; text-transform: uppercase; letter-spacing: 1px;">Secure Authentication System &copy; Fortune Multi Services</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Password reset code sent to email' });
  } catch (err) {
    console.error('Forgot password SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send password reset code. Check SMTP configurations.' });
  }
});

// Reset Password OTP Submit
app.post('/api/auth/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: 'Email, verification code, and new password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const record = global.resetOtps ? global.resetOtps[cleanEmail] : null;

  if (!record || record.code !== otp.trim()) {
    return res.status(400).json({ error: 'Invalid password reset code' });
  }

  if (record.expiresAt < Date.now()) {
    delete global.resetOtps[cleanEmail];
    return res.status(400).json({ error: 'Password reset code has expired' });
  }

  delete global.resetOtps[cleanEmail];

  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newPassword, salt);
    await db.updateUserPassword(cleanEmail, passwordHash);

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reset password in database' });
  }
});

// Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Retrieve users list to check if blocked
  try {
    const users = await db.getUsers();
    const userRecord = users.find(u => u.email === cleanEmail);
    if (userRecord && userRecord.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    const otp = auth.generateOTP();
    global.otps = global.otps || {};
    global.otps[cleanEmail] = {
      code: otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    await auth.sendOTPEmail(cleanEmail, otp);
    return res.status(200).json({ success: true, message: 'Verification code sent to email successfully' });
  } catch (err) {
    console.error('SMTP OTP send error:', err);
    return res.status(500).json({ error: 'Failed to send OTP verification email. Please check SMTP credentials.' });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP verification code are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const record = global.otps ? global.otps[cleanEmail] : null;

  if (!record || record.code !== otp.trim()) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  if (record.expiresAt < Date.now()) {
    delete global.otps[cleanEmail];
    return res.status(400).json({ error: 'Verification code has expired' });
  }

  // Clear OTP
  delete global.otps[cleanEmail];

  try {
    await db.ensureUser(cleanEmail);
    const users = await db.getUsers();
    const userRecord = users.find(u => u.email === cleanEmail);
    if (userRecord && userRecord.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    const token = auth.generateSessionToken(cleanEmail);
    return res.status(200).json({
      success: true,
      token,
      role: 'user',
      user: { email: cleanEmail, role: 'user' }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to register/authenticate user in database' });
  }
});

// Google Authentication
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: 'Google credential ID token is required' });
  }

  try {
    const payload = await auth.verifyGoogleToken(credential);
    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Failed to verify Google identity payload' });
    }

    const cleanEmail = payload.email.toLowerCase().trim();
    
    await db.ensureUser(cleanEmail);
    const users = await db.getUsers();
    const userRecord = users.find(u => u.email === cleanEmail);
    if (userRecord && userRecord.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    const token = auth.generateSessionToken(cleanEmail);
    return res.status(200).json({
      success: true,
      token,
      role: 'user',
      user: { email: cleanEmail, name: payload.name, picture: payload.picture, role: 'user' }
    });
  } catch (err) {
    console.error('Google OAuth sign-in error:', err);
    return res.status(401).json({ error: 'Google account authentication failed' });
  }
});

// Verify Session
app.get('/api/auth/verify-session', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authentication token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fortune_multi_services_session_secret_key');

    const users = await db.getUsers();
    const userRecord = users.find(u => u.email === decoded.email);
    if (userRecord && userRecord.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    return res.status(200).json({
      success: true,
      user: decoded
    });
  } catch (err) {
    return res.status(401).json({ error: 'Session token has expired or is invalid' });
  }
});

// Admin & Legacy Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const cleanEmail = email.toLowerCase().trim();

  // Admin Check
  if (cleanEmail === 'fortunemultiservices2023@gmail.com' && password === 'Fortunemultiservices@2023') {
    return res.status(200).json({
      success: true,
      token: auth.generateSessionToken(cleanEmail, 'admin'),
      role: 'admin',
      user: { email: cleanEmail, role: 'admin' }
    });
  }

  // Fallback to legacy mock login
  try {
    await db.ensureUser(cleanEmail);
    const users = await db.getUsers();
    const userRecord = users.find(u => u.email === cleanEmail);
    if (userRecord && userRecord.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    return res.status(200).json({
      success: true,
      token: auth.generateSessionToken(cleanEmail, 'user'),
      role: 'user',
      user: { email: cleanEmail, role: 'user' }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Database login error' });
  }
});

// --- API Route: Services CRUD ---
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.getServicesData();
    res.status(200).json(services);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch services data' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const success = await db.saveServicesData(req.body);
    if (success) {
      res.status(200).json({ success: true, message: 'Services database updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to save services to database' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to update services data' });
  }
});

// --- API Route: Inquiries, Orders & Leads ---
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await db.getInquiries();
    res.status(200).json(inquiries);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const newRecord = await db.createInquiry(req.body);
    res.status(201).json(newRecord);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create inquiry record' });
  }
});

app.put('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await db.updateInquiry(id, req.body);
    if (success) {
      res.status(200).json({ success: true, message: 'Inquiry record updated successfully' });
    } else {
      res.status(404).json({ error: 'Record not found or failed to update' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to update inquiry record' });
  }
});

app.delete('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await db.deleteInquiry(id);
    if (success) {
      res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } else {
      res.status(404).json({ error: 'Record not found or delete failed' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

// --- API Route: User Directory ---
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch user profiles' });
  }
});

app.put('/api/users/:email/status', async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const success = await db.updateUserStatus(email, status);
    if (success) {
      res.status(200).json({ success: true, message: 'User status updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update user status' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to process user status update' });
  }
});

// Delete User Account
app.delete('/api/users/:email', async (req, res) => {
  const { email } = req.params;
  const decodedEmail = decodeURIComponent(email);

  try {
    const success = await db.deleteUser(decodedEmail);
    if (success) {
      res.status(200).json({ success: true, message: `User ${decodedEmail} deleted successfully` });
    } else {
      res.status(404).json({ error: 'User not found or could not be deleted' });
    }
  } catch (e) {
    console.error('Delete user error:', e);
    res.status(500).json({ error: 'Failed to delete user account' });
  }
});

// --- API Route: Settings ---
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await db.getSettings();
    res.status(200).json(settings);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const success = await db.saveSettings(req.body);
    if (success) {
      res.status(200).json({ success: true, message: 'Global settings updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// --- API Route: File Uploads (Certificates) ---
app.post('/api/upload-certificate', (req, res) => {
  const { fileName, fileData } = req.body;

  if (!fileName || !fileData) {
    return res.status(400).json({ error: 'fileName and fileData (base64) are required' });
  }

  try {
    // Save to the public/uploads directory of the workspace root
    const uploadDir = path.join(__dirname, '../public/uploads');
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueFileName = `${Date.now()}_${fileName.replace(/\s+/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    
    // Write binary file from base64 string
    fs.writeFileSync(filePath, Buffer.from(fileData, 'base64'));

    const fileUrl = `/uploads/${uniqueFileName}`;
    res.status(200).json({
      success: true,
      fileName: uniqueFileName,
      fileUrl: fileUrl
    });
  } catch (error) {
    console.error('File upload failed:', error);
    res.status(500).json({ error: 'Failed to save certificate file on server' });
  }
});

// Serve frontend static files if built and running in integrated Node mode (Hostinger setup)
const buildDir = path.join(__dirname, '../dist');
if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
  
  // Catch-all route to serve index.html for client-side routing
  app.get('*', (req, res, next) => {
    // If request is API, pass through (though it should already be handled by endpoints above)
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(buildDir, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Fortune Multi Services backend online at http://localhost:${PORT}`);
});

module.exports = app;
