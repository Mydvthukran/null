/**
 * Auth Routes — Login
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('../middleware/auth');
const crypto = require('crypto');
const UAParser = require('ua-parser-js');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

const AUTH_COOKIE = 'siet_admin_session';
const cookieAttributes = () => {
  // Detect production: explicit NODE_ENV, or common PaaS indicators (Render, Heroku, Vercel, Railway, etc.)
  const production = process.env.NODE_ENV === 'production'
    || !!process.env.RENDER
    || !!process.env.DYNO
    || !!process.env.RAILWAY_ENVIRONMENT
    || !!process.env.VERCEL;
  return `HttpOnly; Path=/; Max-Age=86400; SameSite=${production ? 'None' : 'Lax'}${production ? '; Secure' : ''}`;
};

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Find admin user in MySQL
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const admin = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Parse permissions
    let permissions = [];
    try {
      permissions = JSON.parse(admin.permissions || '[]');
    } catch (e) {
      permissions = [];
    }

    // Generate session ID
    const sessionId = crypto.randomUUID();

    // Log the login attempt
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    let cleanIp = ip.split(',')[0].trim();
    if (cleanIp === '::1' || cleanIp === '::ffff:127.0.0.1') cleanIp = '127.0.0.1';
    
    // Parse User Agent
    const parser = new UAParser(req.headers['user-agent']);
    const browser = `${parser.getBrowser().name || 'Unknown'} ${parser.getBrowser().version || ''}`.trim();
    const os = `${parser.getOS().name || 'Unknown'} ${parser.getOS().version || ''}`.trim();
    const device = parser.getDevice().type || 'Desktop';
    
    // Attempt to get location
    let location = 'Unknown';
    if (cleanIp !== '127.0.0.1' && require('net').isIP(cleanIp)) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${cleanIp}`);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === 'success') {
            location = `${geoData.city}, ${geoData.country}`;
          }
        }
      } catch (geoErr) {
        console.error('GeoIP fetch failed:', geoErr.message);
      }
    } else {
      location = 'Localhost';
    }

    // Insert into login_logs
    await pool.query(
      `INSERT INTO login_logs (admin_id, admin_name, ip_address, location, device, browser, os, session_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [admin.id, admin.name || admin.username, cleanIp, location, device, browser, os, sessionId]
    );

    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role || 'editor',
        permissions,
        session_id: sessionId
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.setHeader('Set-Cookie', `${AUTH_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes()}`);
    res.json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role || 'editor',
        permissions,
        session_id: sessionId
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

router.post('/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${AUTH_COOKIE}=; ${cookieAttributes().replace('Max-Age=86400', 'Max-Age=0')}`);
  res.json({ success: true });
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
