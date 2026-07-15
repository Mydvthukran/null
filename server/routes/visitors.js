/**
 * Visitors Routes — Track and retrieve visitor analytics
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');
const rateLimit = require('express-rate-limit');

const hitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 hits per minute per IP
  message: { error: 'Too many requests' }
});

// GET /api/visitors — Get visitor stats (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [[visitorCount]] = await pool.query('SELECT total FROM visitors WHERE id = 1');
    res.json({ visitors: { total: visitorCount ? visitorCount.total : 0, monthly: [] } });
  } catch (err) {
    console.error('Error fetching visitors:', err);
    res.status(500).json({ error: 'Server error fetching visitors' });
  }
});

// POST /api/visitors/hit — Increment visitor count (public, called from frontend)
router.post('/hit', hitLimiter, async (req, res) => {
  try {
    await pool.query('UPDATE visitors SET total = total + 1 WHERE id = 1');
    const [[visitorCount]] = await pool.query('SELECT total FROM visitors WHERE id = 1');
    res.json({ total: visitorCount.total });
  } catch (err) {
    console.error('Error updating visitors:', err);
    res.status(500).json({ error: 'Server error updating visitors' });
  }
});

module.exports = router;
