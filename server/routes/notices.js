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
const { uploadToFTP, deleteFromFTP } = require('../config/ftp');

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

// GET /api/notices — Fetch published notices (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notices WHERE publish_date IS NULL OR publish_date <= UTC_TIMESTAMP() ORDER BY id DESC');
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

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  let filePath = null;
  if (req.file) {
    try {
      filePath = await uploadToFTP(req.file.buffer, 'notices', req.file.originalname);
    } catch (err) {
      console.error('FTP upload error:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
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
    if (filePath) {
      await deleteFromFTP(filePath);
    }
    res.status(500).json({ error: 'Server error creating notice' });
  }
});

// PUT /api/notices/:id — Update a notice
router.put('/:id', authMiddleware, upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, date, status, category, publish_date } = req.body;
  
  let filePath = null;
  try {
    const pubDate = publish_date ? new Date(publish_date).toISOString().slice(0, 19).replace('T', ' ') : null;
    let query = 'UPDATE notices SET title = ?, date = ?, status = ?, category = ?, publish_date = ? WHERE id = ?';
    let params = [title, date, status, category, pubDate, id];

    if (req.file) {
      filePath = await uploadToFTP(req.file.buffer, 'notices', req.file.originalname);
      
      const [oldRows] = await pool.query('SELECT file_path FROM notices WHERE id = ?', [id]);
      if (oldRows.length > 0 && oldRows[0].file_path) {
        await deleteFromFTP(oldRows[0].file_path);
      }

      query = 'UPDATE notices SET title = ?, date = ?, status = ?, category = ?, publish_date = ?, file_path = ? WHERE id = ?';
      params = [title, date, status, category, pubDate, filePath, id];
    }

    await pool.query(query, params);
    await logActivity(req.admin, 'Notices', 'Update', `Updated notice: ${title}`);
    res.json({ message: 'Notice updated successfully' });
  } catch (err) {
    console.error('Error updating notice:', err);
    if (filePath) {
      await deleteFromFTP(filePath);
    }
    res.status(500).json({ error: 'Server error updating notice' });
  }
});

// DELETE /api/notices/:id — Delete a notice
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT file_path FROM notices WHERE id = ?', [id]);
    if (rows.length > 0 && rows[0].file_path) {
      await deleteFromFTP(rows[0].file_path);
    }
    
    await pool.query('DELETE FROM notices WHERE id = ?', [id]);
    await logActivity(req.admin, 'Notices', 'Delete', `Deleted notice ID: ${id}`);
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error('Error deleting notice:', err);
    res.status(500).json({ error: 'Server error deleting notice' });
  }
});

module.exports = router;
