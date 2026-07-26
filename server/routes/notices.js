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
const { getCloudinaryStorage, deleteFromCloudinary } = require('../config/cloudinary');

const storage = getCloudinaryStorage('notices');

const upload = multer({
  storage,
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
  const filePath = req.file ? req.file.path : null;

  if (!title) {
    if (req.file && req.file.path) {
      await deleteFromCloudinary(req.file.path);
    }
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
    if (req.file && req.file.path) {
      await deleteFromCloudinary(req.file.path);
    }
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
      const filePath = req.file.path;
      
      const [oldRows] = await pool.query('SELECT file_path FROM notices WHERE id = ?', [id]);
      if (oldRows.length > 0 && oldRows[0].file_path) {
        if (oldRows[0].file_path.includes('cloudinary.com')) {
          await deleteFromCloudinary(oldRows[0].file_path);
        } else {
          const oldFile = path.join(__dirname, '..', oldRows[0].file_path);
          if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
        }
      }

      query = 'UPDATE notices SET title = ?, date = ?, status = ?, category = ?, publish_date = ?, file_path = ? WHERE id = ?';
      params = [title, date, status, category, pubDate, filePath, id];
    }

    await pool.query(query, params);
    await logActivity(req.admin, 'Notices', 'Update', `Updated notice: ${title}`);
    res.json({ message: 'Notice updated successfully' });
  } catch (err) {
    console.error('Error updating notice:', err);
    if (req.file && req.file.path) {
      await deleteFromCloudinary(req.file.path);
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
      if (rows[0].file_path.includes('cloudinary.com')) {
        await deleteFromCloudinary(rows[0].file_path);
      } else {
        const file = path.join(__dirname, '..', rows[0].file_path);
        if (fs.existsSync(file)) fs.unlinkSync(file);
      }
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
