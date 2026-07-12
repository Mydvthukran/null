/**
 * Applications Routes — CRUD for student admission applications
 * FUTURE: Replace mockData with MySQL queries
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mockData = require('../config/db');

// GET /api/applications — List all applications
router.get('/', authMiddleware, (req, res) => {
  res.json({ applications: mockData.applications });
});

// GET /api/applications/:id — Get single application
router.get('/:id', authMiddleware, (req, res) => {
  const app = mockData.applications.find((a) => a.id === req.params.id);
  if (!app) return res.status(404).json({ error: 'Application not found.' });
  res.json({ application: app });
});

// PUT /api/applications/:id/status — Update application status
router.put('/:id/status', authMiddleware, (req, res) => {
  const { status } = req.body;
  const app = mockData.applications.find((a) => a.id === req.params.id);
  if (!app) return res.status(404).json({ error: 'Application not found.' });

  app.status = status;
  res.json({ message: 'Status updated', application: app });
});

module.exports = router;
