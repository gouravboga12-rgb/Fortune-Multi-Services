const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Hostinger database credentials provided by user
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1', // localhost or 127.0.0.1 on Hostinger
  user: process.env.DB_USER || 'u565828925_user',
  password: process.env.DB_PASSWORD || '@qGi~u3iR',
  database: process.env.DB_NAME || 'u565828925_fortune_db',
  connectionLimit: 10
};

let pool = null;
let useMySQL = false;

// Initialize connection and check if MySQL is available
async function initDB() {
  try {
    pool = mysql.createPool(dbConfig);
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to Hostinger MySQL Database successfully.');
    connection.release();
    useMySQL = true;
    await createTables();

    // Check if database categories are empty and seed automatically
    const [catRows] = await pool.query('SELECT COUNT(*) as count FROM categories');
    if (catRows[0].count === 0) {
      console.log('🌱 MySQL database is empty. Automatically seeding from services.json...');
      const seedData = readJSON(SERVICES_FILE, null);
      if (seedData && seedData.length > 0) {
        await db.saveServicesData(seedData);
        console.log('🌱 MySQL database seeded successfully from services.json.');
      }
    }
  } catch (error) {
    console.warn('⚠️ Hostinger MySQL database connection failed. Falling back to local JSON database storage.');
    console.warn(`Error detail: ${error.message}`);
    useMySQL = false;
  }
}

// Create database tables if they do not exist (for Hostinger environment)
async function createTables() {
  if (!useMySQL) return;

  const queries = [
    `CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'active',
      sort_order INT DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_slug VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      tag VARCHAR(255) DEFAULT '',
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) DEFAULT 199.00,
      discount_price DECIMAL(10, 2) DEFAULT 199.00,
      status VARCHAR(50) DEFAULT 'active',
      overview TEXT,
      target_audience TEXT,
      timeline VARCHAR(255),
      characteristics JSON,
      benefits JSON,
      documents JSON,
      process JSON,
      pros JSON,
      cons JSON,
      common_mistakes JSON,
      post_compliances JSON,
      form_fields JSON,
      payment_modes JSON
    )`,
    `CREATE TABLE IF NOT EXISTS faqs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_slug VARCHAR(255) NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INT DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(50) DEFAULT 'enquiry',
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      message TEXT,
      service_name VARCHAR(255),
      amount DECIMAL(10, 2) DEFAULT 0.00,
      paid BOOLEAN DEFAULT FALSE,
      payment_id VARCHAR(255) DEFAULT '',
      order_status VARCHAR(100) DEFAULT 'New',
      lead_status VARCHAR(100) DEFAULT 'New',
      certificate_name VARCHAR(255) DEFAULT '',
      certificate_url VARCHAR(255) DEFAULT '',
      form_details JSON,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS settings (
      key_name VARCHAR(255) PRIMARY KEY,
      value_data TEXT
    )`
  ];

  for (const query of queries) {
    try {
      await pool.query(query);
    } catch (e) {
      console.error('Error creating database table:', e.message);
    }
  }
}

// JSON file fallback paths
const SERVICES_FILE = path.join(__dirname, 'services.json');
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// --- Helper JSON file readers ---
function readJSON(file, defaultVal = []) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultVal, null, 2));
      return defaultVal;
    }
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data || JSON.stringify(defaultVal));
  } catch (e) {
    return defaultVal;
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    return false;
  }
}

// --- Dynamic DB Operations Wrapper ---
const db = {
  // Check active mode
  isMySQL: () => useMySQL,

  // CATEGORIES & SERVICES Operations
  getServicesData: async () => {
    if (useMySQL) {
      try {
        // Query categories and services and construct the hierarchical structure
        const [categories] = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC');
        const [services] = await pool.query('SELECT * FROM services');
        const [faqs] = await pool.query('SELECT * FROM faqs ORDER BY sort_order ASC');

        return categories.map(cat => {
          const catServices = services
            .filter(s => s.category_slug === cat.slug)
            .map(s => {
              // Parse JSON columns
              const parseJSON = (val) => {
                if (!val) return [];
                if (typeof val === 'object') return val;
                try { return JSON.parse(val); } catch(e) { return []; }
              };

              const serviceFaqs = faqs
                .filter(f => f.service_slug === s.slug)
                .map(f => ({ question: f.question, answer: f.answer }));

              return {
                name: s.name,
                tag: s.tag,
                slug: s.slug,
                description: s.description,
                price: parseFloat(s.price || 199),
                discountPrice: parseFloat(s.discount_price || 199),
                status: s.status,
                details: {
                  overview: s.overview,
                  targetAudience: s.target_audience,
                  timeline: s.timeline,
                  characteristics: parseJSON(s.characteristics),
                  benefits: parseJSON(s.benefits),
                  documents: parseJSON(s.documents),
                  process: parseJSON(s.process),
                  pros: parseJSON(s.pros),
                  cons: parseJSON(s.cons),
                  commonMistakes: parseJSON(s.common_mistakes),
                  postCompliances: parseJSON(s.post_compliances),
                  faqs: serviceFaqs,
                  formFields: parseJSON(s.form_fields),
                  paymentModes: parseJSON(s.payment_modes)
                }
              };
            });

          return {
            title: cat.title,
            slug: cat.slug,
            description: cat.description,
            status: cat.status,
            services: catServices,
            details: {
              benefits: [],
              documents: [],
              process: [],
              timeline: ""
            },
            faqs: []
          };
        });
      } catch (e) {
        console.error('MySQL query error, fallback to JSON:', e);
        return readJSON(SERVICES_FILE, []);
      }
    } else {
      return readJSON(SERVICES_FILE, []);
    }
  },

  saveServicesData: async (data) => {
    // Always sync JSON file as a fallback backup
    writeJSON(SERVICES_FILE, data);

    if (useMySQL) {
      try {
        // Simple syncing strategy for MySQL: Truncate and rewrite records
        // This is safe since this is administrative config mapping
        await pool.query('SET FOREIGN_KEY_CHECKS = 0');
        await pool.query('TRUNCATE TABLE categories');
        await pool.query('TRUNCATE TABLE services');
        await pool.query('TRUNCATE TABLE faqs');
        await pool.query('SET FOREIGN_KEY_CHECKS = 1');

        for (let cIdx = 0; cIdx < data.length; cIdx++) {
          const cat = data[cIdx];
          await pool.query(
            'INSERT INTO categories (title, slug, description, status, sort_order) VALUES (?, ?, ?, ?, ?)',
            [cat.title, cat.slug, cat.description || '', cat.status || 'active', cIdx]
          );

          if (cat.services && Array.isArray(cat.services)) {
            for (const s of cat.services) {
              const details = s.details || {};
              await pool.query(
                `INSERT INTO services (
                  category_slug, name, tag, slug, description, price, discount_price, status,
                  overview, target_audience, timeline, characteristics, benefits, documents,
                  process, pros, cons, common_mistakes, post_compliances, form_fields, payment_modes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  cat.slug,
                  s.name,
                  s.tag || '',
                  s.slug,
                  s.description || '',
                  s.price || 199.00,
                  s.discountPrice || 199.00,
                  s.status || 'active',
                  details.overview || '',
                  details.targetAudience || '',
                  details.timeline || '',
                  JSON.stringify(details.characteristics || []),
                  JSON.stringify(details.benefits || []),
                  JSON.stringify(details.documents || []),
                  JSON.stringify(details.process || []),
                  JSON.stringify(details.pros || []),
                  JSON.stringify(details.cons || []),
                  JSON.stringify(details.commonMistakes || []),
                  JSON.stringify(details.postCompliances || []),
                  JSON.stringify(details.formFields || []),
                  JSON.stringify(details.paymentModes || [])
                ]
              );

              if (details.faqs && Array.isArray(details.faqs)) {
                for (let fIdx = 0; fIdx < details.faqs.length; fIdx++) {
                  const faq = details.faqs[fIdx];
                  await pool.query(
                    'INSERT INTO faqs (service_slug, question, answer, sort_order) VALUES (?, ?, ?, ?)',
                    [s.slug, faq.question, faq.answer, fIdx]
                  );
                }
              }
            }
          }
        }
        return true;
      } catch (e) {
        console.error('MySQL write error:', e);
        return false;
      }
    }
    return true;
  },

  // INQUIRIES & ORDERS & LEADS CRM Operations
  getInquiries: async () => {
    if (useMySQL) {
      try {
        const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY date DESC');
        return rows.map(r => ({
          ...r,
          paid: !!r.paid,
          form_details: r.form_details ? (typeof r.form_details === 'object' ? r.form_details : JSON.parse(r.form_details)) : null
        }));
      } catch (e) {
        console.error('MySQL inquiries query error:', e);
        return readJSON(INQUIRIES_FILE, []);
      }
    } else {
      return readJSON(INQUIRIES_FILE, []);
    }
  },

  createInquiry: async (inquiryData) => {
    const defaultInquiry = {
      id: inquiryData.id || Date.now(),
      type: inquiryData.type || (inquiryData.paid ? 'order' : 'enquiry'),
      name: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      message: inquiryData.message || '',
      service_name: inquiryData.service_name || inquiryData.service || '',
      amount: inquiryData.amount || 0.00,
      paid: inquiryData.paid || false,
      payment_id: inquiryData.payment_id || inquiryData.paymentId || '',
      order_status: inquiryData.order_status || inquiryData.orderStatus || 'New',
      lead_status: inquiryData.lead_status || inquiryData.leadStatus || 'New',
      certificate_name: inquiryData.certificate_name || '',
      certificate_url: inquiryData.certificate_url || '',
      form_details: inquiryData.form_details || inquiryData.formDetails || null,
      date: inquiryData.date || new Date().toISOString()
    };

    // Sync JSON backup
    const jsonInquiries = readJSON(INQUIRIES_FILE, []);
    jsonInquiries.push(defaultInquiry);
    writeJSON(INQUIRIES_FILE, jsonInquiries);

    if (useMySQL) {
      try {
        await pool.query(
          `INSERT INTO inquiries (
            id, type, name, email, phone, message, service_name, amount, paid, payment_id,
            order_status, lead_status, certificate_name, certificate_url, form_details, date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            defaultInquiry.id,
            defaultInquiry.type,
            defaultInquiry.name,
            defaultInquiry.email,
            defaultInquiry.phone,
            defaultInquiry.message,
            defaultInquiry.service_name,
            defaultInquiry.amount,
            defaultInquiry.paid ? 1 : 0,
            defaultInquiry.payment_id,
            defaultInquiry.order_status,
            defaultInquiry.lead_status,
            defaultInquiry.certificate_name,
            defaultInquiry.certificate_url,
            JSON.stringify(defaultInquiry.form_details),
            new Date(defaultInquiry.date).toISOString().slice(0, 19).replace('T', ' ')
          ]
        );
      } catch (e) {
        console.error('MySQL create inquiry error:', e);
      }
    }

    // Auto-create/ensure user profile exists
    await db.ensureUser(defaultInquiry.email);

    return defaultInquiry;
  },

  updateInquiry: async (id, updateData) => {
    // Sync JSON backup
    const jsonInquiries = readJSON(INQUIRIES_FILE, []);
    const idx = jsonInquiries.findIndex(item => String(item.id) === String(id));
    if (idx !== -1) {
      jsonInquiries[idx] = { ...jsonInquiries[idx], ...updateData };
      writeJSON(INQUIRIES_FILE, jsonInquiries);
    }

    if (useMySQL) {
      try {
        const fields = [];
        const params = [];
        for (const [key, value] of Object.entries(updateData)) {
          // Map camelCase keys to snake_case table columns
          let col = key;
          if (key === 'orderStatus') col = 'order_status';
          if (key === 'leadStatus') col = 'lead_status';
          if (key === 'paymentId') col = 'payment_id';
          if (key === 'serviceName') col = 'service_name';
          if (key === 'certificateName') col = 'certificate_name';
          if (key === 'certificateUrl') col = 'certificate_url';

          fields.push(`${col} = ?`);
          params.push(typeof value === 'object' && value !== null ? JSON.stringify(value) : value);
        }
        params.push(id);

        if (fields.length > 0) {
          await pool.query(`UPDATE inquiries SET ${fields.join(', ')} WHERE id = ?`, params);
        }
        return true;
      } catch (e) {
        console.error('MySQL update inquiry error:', e);
        return false;
      }
    }
    return true;
  },

  deleteInquiry: async (id) => {
    // Sync JSON backup
    const jsonInquiries = readJSON(INQUIRIES_FILE, []);
    const filtered = jsonInquiries.filter(item => String(item.id) !== String(id));
    writeJSON(INQUIRIES_FILE, filtered);

    if (useMySQL) {
      try {
        await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
        return true;
      } catch (e) {
        console.error('MySQL delete inquiry error:', e);
        return false;
      }
    }
    return true;
  },

  // USERS DATABASE
  getUsers: async () => {
    if (useMySQL) {
      try {
        const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        return rows;
      } catch (e) {
        console.error('MySQL users query error:', e);
        return readJSON(USERS_FILE, []);
      }
    } else {
      return readJSON(USERS_FILE, []);
    }
  },

  ensureUser: async (email) => {
    if (!email) return;
    const cleanEmail = email.toLowerCase().trim();

    // Sync JSON backup
    const jsonUsers = readJSON(USERS_FILE, []);
    if (!jsonUsers.some(u => u.email === cleanEmail)) {
      jsonUsers.push({ email: cleanEmail, status: 'active', created_at: new Date().toISOString() });
      writeJSON(USERS_FILE, jsonUsers);
    }

    if (useMySQL) {
      try {
        await pool.query('INSERT IGNORE INTO users (email) VALUES (?)', [cleanEmail]);
      } catch (e) {
        console.error('MySQL ensureUser error:', e);
      }
    }
  },

  updateUserStatus: async (email, status) => {
    const cleanEmail = email.toLowerCase().trim();
    // Sync JSON backup
    const jsonUsers = readJSON(USERS_FILE, []);
    const idx = jsonUsers.findIndex(u => u.email === cleanEmail);
    if (idx !== -1) {
      jsonUsers[idx].status = status;
      writeJSON(USERS_FILE, jsonUsers);
    }

    if (useMySQL) {
      try {
        await pool.query('UPDATE users SET status = ? WHERE email = ?', [status, cleanEmail]);
        return true;
      } catch (e) {
        console.error('MySQL updateUserStatus error:', e);
        return false;
      }
    }
    return true;
  },

  // SETTINGS DATABASE
  getSettings: async () => {
    const defaultSettings = {
      paymentModes: {
        upi: true,
        razorpay: true,
        bankTransfer: true,
        manual: true
      }
    };

    if (useMySQL) {
      try {
        const [rows] = await pool.query('SELECT * FROM settings WHERE key_name = ?', ['global_config']);
        if (rows.length > 0) {
          return JSON.parse(rows[0].value_data);
        } else {
          // Seed settings
          await pool.query('INSERT INTO settings (key_name, value_data) VALUES (?, ?)', ['global_config', JSON.stringify(defaultSettings)]);
          return defaultSettings;
        }
      } catch (e) {
        console.error('MySQL settings query error:', e);
        return readJSON(SETTINGS_FILE, defaultSettings);
      }
    } else {
      return readJSON(SETTINGS_FILE, defaultSettings);
    }
  },

  saveSettings: async (settingsData) => {
    writeJSON(SETTINGS_FILE, settingsData);

    if (useMySQL) {
      try {
        await pool.query(
          'INSERT INTO settings (key_name, value_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_data = ?',
          ['global_config', JSON.stringify(settingsData), JSON.stringify(settingsData)]
        );
        return true;
      } catch (e) {
        console.error('MySQL settings save error:', e);
        return false;
      }
    }
    return true;
  }
};

// Initialize connection immediately
initDB();

module.exports = db;
