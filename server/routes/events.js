/**
 * Events Routes — Manage Events items with optional file uploads
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

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

// GET /api/events — Fetch all events
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Server error fetching events' });
  }
});

// POST /api/events — Add a new event
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  const { title, date, status, category } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO events (title, date, status, category, file_path) VALUES (?, ?, ?, ?, ?)',
      [title, date || new Date().toISOString().split('T')[0], status || 'Upcoming', category || 'Event', filePath]
    );
    res.status(201).json({ message: 'Event created successfully', id: result.insertId });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Server error creating event' });
  }
});

// PUT /api/events/:id — Update an event
router.put('/:id', authMiddleware, upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, date, status, category } = req.body;
  
  try {
    // If a new file is uploaded, update file_path, otherwise keep old
    let query = 'UPDATE events SET title = ?, date = ?, status = ?, category = ? WHERE id = ?';
    let params = [title, date, status, category, id];

    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      query = 'UPDATE events SET title = ?, date = ?, status = ?, category = ?, file_path = ? WHERE id = ?';
      params = [title, date, status, category, filePath, id];
    }

    await pool.query(query, params);
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Server error updating event' });
  }
});

// DELETE /api/events/:id — Delete an event
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    // Optionally delete the physical file here if needed (skipping for simplicity/archival)
    await pool.query('DELETE FROM events WHERE id = ?', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Server error deleting event' });
  }
});

module.exports = router;
