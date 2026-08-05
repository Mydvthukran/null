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
const { logActivity } = require('../utils/logger');
const rateLimit = require('express-rate-limit');
const { uploadToFTP, deleteFromFTP } = require('../config/ftp');

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: { error: 'Too many registrations from this IP, please try again later.' }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, JPEG, PNG files are allowed.'));
    }
  },
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

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  let filePath = null;
  if (req.file) {
    try {
      filePath = await uploadToFTP(req.file.buffer, 'events', req.file.originalname);
    } catch (err) {
      console.error('FTP upload error:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO events (title, date, status, category, file_path) VALUES (?, ?, ?, ?, ?)',
      [title, date || new Date().toISOString().split('T')[0], status || 'Upcoming', category || 'Event', filePath]
    );
    await logActivity(req.admin, 'Events', 'Create', `Added event: ${title}`);
    res.status(201).json({ message: 'Event created successfully', id: result.insertId });
  } catch (err) {
    console.error('Error creating event:', err);
    if (filePath) {
      await deleteFromFTP(filePath);
    }
    res.status(500).json({ error: 'Server error creating event' });
  }
});

// PUT /api/events/:id — Update an event
router.put('/:id', authMiddleware, upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, date, status, category } = req.body;
  
  let filePath = null;
  try {
    let query = 'UPDATE events SET title = ?, date = ?, status = ?, category = ? WHERE id = ?';
    let params = [title, date, status, category, id];

    if (req.file) {
      filePath = await uploadToFTP(req.file.buffer, 'events', req.file.originalname);
      
      const [oldRows] = await pool.query('SELECT file_path FROM events WHERE id = ?', [id]);
      if (oldRows.length > 0 && oldRows[0].file_path) {
        await deleteFromFTP(oldRows[0].file_path);
      }

      query = 'UPDATE events SET title = ?, date = ?, status = ?, category = ?, file_path = ? WHERE id = ?';
      params = [title, date, status, category, filePath, id];
    }

    await pool.query(query, params);
    await logActivity(req.admin, 'Events', 'Update', `Updated event: ${title}`);
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Error updating event:', err);
    if (filePath) {
      await deleteFromFTP(filePath);
    }
    res.status(500).json({ error: 'Server error updating event' });
  }
});

// DELETE /api/events/:id — Delete an event
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT file_path FROM events WHERE id = ?', [id]);
    if (rows.length > 0 && rows[0].file_path) {
      await deleteFromFTP(rows[0].file_path);
    }
    
    await pool.query('DELETE FROM events WHERE id = ?', [id]);
    await logActivity(req.admin, 'Events', 'Delete', `Deleted event ID: ${id}`);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Server error deleting event' });
  }
});

// POST /api/events/register — Register for an event
router.post('/register', registerLimiter, async (req, res) => {
  const { event_id, name, email, phone, student_id } = req.body;
  if (!event_id || !name || !email) {
    return res.status(400).json({ error: 'Event ID, Name, and Email are required.' });
  }
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
  try {
    await pool.query(
      'INSERT INTO event_registrations (event_id, name, email, phone, student_id, date) VALUES (?, ?, ?, ?, ?, ?)',
      [event_id, name, email, phone, student_id, date]
    );
    res.json({ message: 'Successfully registered for the event' });
  } catch (err) {
    console.error('Error registering for event:', err);
    res.status(500).json({ error: 'Server error registering for event' });
  }
});

// GET /api/events/registrations/:id — Get registrations for an event (admin)
router.get('/registrations/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM event_registrations WHERE event_id = ? ORDER BY id DESC', [req.params.id]);
    res.json({ registrations: rows });
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ error: 'Server error fetching registrations' });
  }
});

module.exports = router;
