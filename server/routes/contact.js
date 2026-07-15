/**
 * Contact & Inquiry Routes — Handle public contact forms
 */
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: { error: 'Too many inquiries sent from this IP, please try again later.' }
});

// POST /api/contact — Submit a new contact inquiry (public)
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    await pool.query(
      'INSERT INTO contact_submissions (name, email, phone, subject, message, date, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, subject, message, date, 'New']
    );
    
    res.json({ message: 'Inquiry submitted successfully' });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ error: 'Server error submitting inquiry' });
  }
});

// GET /api/contact — List all contact inquiries (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_submissions ORDER BY id DESC');
    res.json({ inquiries: rows });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ error: 'Server error fetching inquiries' });
  }
});

// PUT /api/contact/:id/status — Update status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE contact_submissions SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Server error updating status' });
  }
});

module.exports = router;
