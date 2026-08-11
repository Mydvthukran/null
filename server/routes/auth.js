/**
 * Auth Routes — Login
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

const AUTH_COOKIE = 'siet_admin_session';
const cookieAttributes = () => {
  const production = process.env.NODE_ENV === 'production';
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

    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role || 'editor',
        permissions
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
        permissions
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

module.exports = router;
