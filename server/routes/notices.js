/**
 * Notices Routes — Manage Notice Board items with optional file uploads
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');
const { logActivity } = require('../utils/logger');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// GET /api/notices — Fetch published notices (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notices WHERE publish_date IS NULL OR publish_date <= NOW() ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ error: 'Server error fetching notices' });
  }
});

// GET /api/notices/admin — Fetch all notices (admin)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notices ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ error: 'Server error fetching notices' });
  }
});

// POST /api/notices — Add a new notice
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  const { title, date, status, category, publish_date } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const pubDate = publish_date ? new Date(publish_date).toISOString().slice(0, 19).replace('T', ' ') : null;
    const [result] = await pool.query(
      'INSERT INTO notices (title, date, status, category, file_path, publish_date) VALUES (?, ?, ?, ?, ?, ?)',
      [title, date || new Date().toISOString().split('T')[0], status || 'Active', category || 'Notice', filePath, pubDate]
    );
    await logActivity(req.admin, 'Notices', 'Create', `Added notice: ${title}`);
    res.status(201).json({ message: 'Notice created successfully', id: result.insertId });
  } catch (err) {
    console.error('Error creating notice:', err);
    res.status(500).json({ error: 'Server error creating notice' });
  }
});

// PUT /api/notices/:id — Update a notice
router.put('/:id', authMiddleware, upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, date, status, category, publish_date } = req.body;
  
  try {
    const pubDate = publish_date ? new Date(publish_date).toISOString().slice(0, 19).replace('T', ' ') : null;
    // If a new file is uploaded, update file_path, otherwise keep old
    let query = 'UPDATE notices SET title = ?, date = ?, status = ?, category = ?, publish_date = ? WHERE id = ?';
    let params = [title, date, status, category, pubDate, id];

    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      query = 'UPDATE notices SET title = ?, date = ?, status = ?, category = ?, publish_date = ?, file_path = ? WHERE id = ?';
      params = [title, date, status, category, pubDate, filePath, id];
    }

    await pool.query(query, params);
    await logActivity(req.admin, 'Notices', 'Update', `Updated notice: ${title}`);
    res.json({ message: 'Notice updated successfully' });
  } catch (err) {
    console.error('Error updating notice:', err);
    res.status(500).json({ error: 'Server error updating notice' });
  }
});

// DELETE /api/notices/:id — Delete a notice
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    // Optionally delete the physical file here if needed (skipping for simplicity/archival)
    await pool.query('DELETE FROM notices WHERE id = ?', [id]);
    await logActivity(req.admin, 'Notices', 'Delete', `Deleted notice ID: ${id}`);
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Error deleting notice:', err);
    res.status(500).json({ error: 'Server error deleting notice' });
  }
});

module.exports = router;
