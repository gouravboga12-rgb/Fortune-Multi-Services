const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Set limits high to support base64 document/certificate uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API Route: Authentication ---
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
      token: 'fortune_secure_admin_session_token',
      role: 'admin',
      user: { email: cleanEmail, role: 'admin' }
    });
  }

  // standard customer email-only login (create user if not exist)
  try {
    await db.ensureUser(cleanEmail);
    // Retrieve users list to check if blocked
    const users = await db.getUsers();
    const userRecord = users.find(u => u.email === cleanEmail);
    
    if (userRecord && userRecord.status === 'blocked') {
      return res.status(403).json({ error: 'This user account has been blocked by administrators' });
    }

    return res.status(200).json({
      success: true,
      role: 'user',
      user: { email: cleanEmail, role: 'user' }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Internal database authentication error' });
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
