/**
 * Visitors Routes — Track and retrieve visitor analytics
 * FUTURE: Store visitor hits in MySQL and aggregate
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mockData = require('../config/db');

// GET /api/visitors — Get visitor stats (admin only)
router.get('/', authMiddleware, (req, res) => {
  res.json({ visitors: mockData.visitors });
});

// POST /api/visitors/hit — Increment visitor count (public, called from frontend)
router.post('/hit', (req, res) => {
  mockData.visitors.total += 1;
  res.json({ total: mockData.visitors.total });
});

module.exports = router;
