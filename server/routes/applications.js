/**
 * Applications Routes — CRUD for student admission applications
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');
const { logActivity } = require('../utils/logger');
const rateLimit = require('express-rate-limit');

const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: { error: 'Too many applications submitted from this IP, please try again later.' }
});

// GET /api/applications — List all applications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications ORDER BY id DESC');
    res.json({ applications: rows });
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Server error fetching applications' });
  }
});

// GET /api/applications/:id — Get single application
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Application not found.' });
    res.json({ application: rows[0] });
  } catch (err) {
    console.error('Error fetching application:', err);
    res.status(500).json({ error: 'Server error fetching application' });
  }
});

// POST /api/applications — Submit a new application (public)
router.post('/', appLimiter, async (req, res) => {
  try {
    const { name, course } = req.body;
    if (!name || !course) {
      return res.status(400).json({ error: 'Name and course are required.' });
    }
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    await pool.query(
      'INSERT INTO applications (name, course, date, status) VALUES (?, ?, ?, ?)',
      [name, course, date, 'Under Review']
    );
    
    // Pass null for admin since this is public
    await logActivity(null, 'Admissions', 'Create', `New application submitted by ${name}`);
    
    res.json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Server error submitting application' });
  }
});

// PUT /api/applications/:id/status — Update application status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Under Review', 'Missing Docs', 'Accepted', 'Rejected', 'Waitlisted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid application status.' });
    }
    
    // Check if application exists
    const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Application not found.' });

    // Update status
    await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status, req.params.id]);
    
    // Fetch updated app
    const [updatedRows] = await pool.query('SELECT * FROM applications WHERE id = ?', [req.params.id]);

    await logActivity(req.admin, 'Admissions', 'Update', `Updated application status for ${rows[0].name} to ${status}`);

    res.json({ message: 'Status updated', application: updatedRows[0] });
  } catch (err) {
    console.error('Error updating application status:', err);
    res.status(500).json({ error: 'Server error updating status' });
  }
});

module.exports = router;
