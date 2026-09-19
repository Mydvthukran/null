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

    const envAdminUser = process.env.ADMIN_USERNAME || 'admin';
    const envAdminPass = process.env.ADMIN_PASSWORD || '123456';

    let admin = null;

    try {
      // Find admin user in MySQL
      const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
      if (rows.length > 0) {
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (isMatch) {
          admin = rows[0];
        }
      }
    } catch (dbErr) {
      console.warn('⚠️  MySQL Auth query warning (using fallback mode):', dbErr.message);
    }

    // Direct fallback check if DB is disconnected or env credentials match
    if (!admin && username === envAdminUser && password === envAdminPass) {
      admin = {
        id: 1,
        username: envAdminUser,
        name: 'System Admin',
        role: 'super_admin',
        permissions: JSON.stringify([
          'overview', 'applications', 'notices', 'documents',
          'events', 'gallery', 'faculty', 'forms', 'settings', 'menus', 'grievances'
        ])
      };
    }

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Parse permissions
    let permissions = [];
    try {
      permissions = typeof admin.permissions === 'string' ? JSON.parse(admin.permissions) : (admin.permissions || []);
    } catch (e) {
      permissions = [];
    }

    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role || 'super_admin',
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
        role: admin.role || 'super_admin',
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

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
