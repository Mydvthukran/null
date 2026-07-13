/**
 * Documents Routes — Manage System Documents
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX files are allowed.'));
    }
  },
});

// GET /api/documents — List all system documents
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documents ORDER BY category, name');
    res.json({ documents: rows });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Server error fetching documents' });
  }
});

// PUT /api/documents/:key — Replace a specific system document
router.put('/:key', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM documents WHERE document_key = ?', [req.params.key]);
    if (rows.length === 0) return res.status(404).json({ error: 'System document key not found.' });
    
    let doc = rows[0];

    // Optionally delete old file from local storage
    if (doc.filePath) {
      const oldPath = path.join(uploadsDir, path.basename(doc.filePath));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const fileSizeKB = (req.file.size / 1024).toFixed(0);
    const sizeLabel = req.file.size > 1024 * 1024
      ? (req.file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : fileSizeKB + ' KB';

    // We do NOT update the `name` or `category` because they are fixed system definitions.
    // We only update the file references.
    const filePath = '/uploads/' + req.file.filename;
    const updatedAt = new Date().toISOString().split('T')[0];

    await pool.query(
      'UPDATE documents SET size=?, updatedAt=?, filePath=? WHERE document_key=?',
      [sizeLabel, updatedAt, filePath, req.params.key]
    );

    await logActivity(req.admin, 'Documents', 'Update', `Replaced document: ${doc.name}`);

    res.json({ message: 'Document replaced successfully', filePath });
  } catch (err) {
    console.error('Error replacing document:', err);
    res.status(500).json({ error: 'Server error replacing document' });
  }
});

module.exports = router;
