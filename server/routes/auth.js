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

const firebaseAuth = require('../utils/firebaseAuth');

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

// POST /api/auth/login — Deprecated: Raw username/password login removed
router.post('/login', (req, res) => {
  return res.status(400).json({
    error: 'Username and password authentication has been removed. Please sign in with your authorized Google account.'
  });
});

// POST /api/auth/firebase-login
router.post('/firebase-login', loginLimiter, async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Firebase ID token is required.' });
    }

    let firebaseUser;
    try {
      firebaseUser = await firebaseAuth.verifyFirebaseIdToken(idToken);
    } catch (verifyErr) {
      console.warn('Firebase token verification failed:', verifyErr.message);
      return res.status(401).json({ error: `Authentication failed: ${verifyErr.message}` });
    }

    const userEmail = (firebaseUser.email || '').toLowerCase().trim();

    // Determine allowed emails:
    // Primary administrator: my3596418@gmail.com
    // Additional administrators can be configured via ADMIN_EMAILS environment variable or MySQL admins table
    const envEmails = (process.env.ADMIN_EMAILS || 'my3596418@gmail.com')
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    if (!envEmails.includes('my3596418@gmail.com')) {
      envEmails.push('my3596418@gmail.com');
    }

    let dbAdmin = null;

    try {
      // Find matching admin in MySQL by email, username, or UID
      const [rows] = await pool.query(
        'SELECT * FROM admins WHERE LOWER(username) = ? OR username = ?',
        [userEmail, firebaseUser.uid]
      );
      if (rows.length > 0) {
        dbAdmin = rows[0];
      }
    } catch (dbErr) {
      console.warn('⚠️ MySQL Auth query warning (using fallback mode):', dbErr.message);
    }

    // Verify whether this email is authorized
    const isAuthorized = envEmails.includes(userEmail) || Boolean(dbAdmin);

    if (!isAuthorized) {
      console.warn(`Unauthorized login attempt by: ${userEmail}`);
      return res.status(403).json({
        error: `Access Denied: Google account (${userEmail || 'unknown'}) is not authorized to access the Admin Portal. Only authorized administrators (such as my3596418@gmail.com) are permitted.`
      });
    }

    const defaultPermissions = [
      'overview', 'applications', 'notices', 'documents',
      'events', 'gallery', 'faculty', 'forms', 'settings', 'menus', 'grievances', 'users'
    ];

    // If no existing record in MySQL, configure as authenticated admin
    const admin = dbAdmin || {
      id: firebaseUser.uid,
      username: userEmail,
      name: firebaseUser.name || 'System Admin',
      role: 'super_admin',
      permissions: JSON.stringify(defaultPermissions)
    };

    // Parse permissions safely
    let permissions = defaultPermissions;
    try {
      permissions = typeof admin.permissions === 'string'
        ? JSON.parse(admin.permissions)
        : (admin.permissions || defaultPermissions);
    } catch (e) {
      permissions = defaultPermissions;
    }

    // Generate session JWT token (expires in 24 hours)
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        email: firebaseUser.email,
        name: admin.name || firebaseUser.name,
        role: admin.role || 'super_admin',
        firebaseUid: firebaseUser.uid,
        permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.setHeader('Set-Cookie', `${AUTH_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes()}`);
    return res.json({
      message: 'Login successful via Firebase Authentication',
      admin: {
        id: admin.id,
        username: admin.username,
        email: firebaseUser.email,
        name: admin.name || firebaseUser.name,
        role: admin.role || 'super_admin',
        permissions
      }
    });
  } catch (err) {
    console.error('Firebase login error:', err);
    res.status(500).json({ error: 'Server error during Firebase login.' });
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
