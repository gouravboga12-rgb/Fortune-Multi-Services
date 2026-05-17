const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'inquiries.json');

app.use(cors());
app.use(express.json());

// Helper function to read from JSON file database
const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading database file:', error);
    return [];
  }
};

// Helper function to write to JSON file database
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database file:', error);
    return false;
  }
};

// API Route: Get all inquiries
app.get('/api/inquiries', (req, res) => {
  const inquiries = readDB();
  res.status(200).json(inquiries);
});

// API Route: Add new inquiry (Paid or Unpaid)
app.post('/api/inquiries', (req, res) => {
  const { name, phone, email, companyName, message, service, paid, paymentId, amount } = req.body;

  if (!name || !phone || !email || !service) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const inquiries = readDB();
  const newInquiry = {
    id: req.body.id || Date.now(),
    name,
    phone,
    email,
    companyName: companyName || '',
    message: message || '',
    service,
    paid: paid || false,
    paymentId: paymentId || '',
    amount: amount || 0,
    date: req.body.date || new Date().toISOString()
  };

  inquiries.push(newInquiry);
  writeDB(inquiries);

  res.status(201).json(newInquiry);
});

// API Route: Delete an inquiry by ID
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const inquiries = readDB();
  
  const filtered = inquiries.filter(item => String(item.id) !== String(id));
  
  if (inquiries.length === filtered.length) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  writeDB(filtered);
  res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
});

// API Route: Admin Dashboard Authentication
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Simple secure mock administration credentials matching frontend login logic
  if (email === 'admin@fortune.com' && password === 'admin123') {
    return res.status(200).json({ 
      success: true, 
      token: 'fortune_secure_admin_session_token', 
      user: { email: 'admin@fortune.com', role: 'admin' } 
    });
  }

  res.status(401).json({ error: 'Invalid administrative email or password' });
});

// Start server locally (if not run in Vercel Serverless environment)
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Fortune Multi Services backend online at http://localhost:${PORT}`);
  });
}

module.exports = app;
