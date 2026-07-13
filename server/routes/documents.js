/**
 * Documents Routes — Upload, list, replace, delete website documents
 * FUTURE: Replace local uploads with Hostinger Cloud Storage
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

// ============================================================
// File Upload Config (local for now)
// FUTURE: Swap multer disk storage for Hostinger cloud SDK
// ============================================================
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
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

// GET /api/documents — List all documents
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documents ORDER BY id DESC');
    res.json({ documents: rows });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Server error fetching documents' });
  }
});

// POST /api/documents — Upload a new document
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const { category } = req.body;
    const fileSizeKB = (req.file.size / 1024).toFixed(0);
    const sizeLabel = req.file.size > 1024 * 1024
      ? (req.file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : fileSizeKB + ' KB';

    const name = req.file.originalname;
    const cat = category || 'General';
    const updatedAt = new Date().toISOString().split('T')[0];
    const filePath = '/uploads/' + req.file.filename;

    const [result] = await pool.query(
      'INSERT INTO documents (name, category, size, updatedAt, filePath) VALUES (?, ?, ?, ?, ?)',
      [name, cat, sizeLabel, updatedAt, filePath]
    );

    const newDoc = {
      id: result.insertId,
      name,
      category: cat,
      size: sizeLabel,
      updatedAt,
      filePath,
    };

    res.status(201).json({ message: 'Document uploaded', document: newDoc });
  } catch (err) {
    console.error('Error uploading document:', err);
    res.status(500).json({ error: 'Server error saving document metadata' });
  }
});

// PUT /api/documents/:id — Replace a document file
router.put('/:id', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documents WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Document not found.' });
    
    let doc = rows[0];

    if (req.file) {
      // Delete old file from local storage
      const oldPath = path.join(uploadsDir, path.basename(doc.filePath));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const fileSizeKB = (req.file.size / 1024).toFixed(0);
      const sizeLabel = req.file.size > 1024 * 1024
        ? (req.file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : fileSizeKB + ' KB';

      doc.name = req.file.originalname;
      doc.size = sizeLabel;
      doc.filePath = '/uploads/' + req.file.filename;
      doc.updatedAt = new Date().toISOString().split('T')[0];
    }

    if (req.body.category) doc.category = req.body.category;

    await pool.query(
      'UPDATE documents SET name=?, category=?, size=?, updatedAt=?, filePath=? WHERE id=?',
      [doc.name, doc.category, doc.size, doc.updatedAt, doc.filePath, req.params.id]
    );

    res.json({ message: 'Document replaced', document: doc });
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).json({ error: 'Server error updating document metadata' });
  }
});

// DELETE /api/documents/:id — Delete a document
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documents WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Document not found.' });

    const doc = rows[0];
    
    // Delete file from local storage
    const oldPath = path.join(uploadsDir, path.basename(doc.filePath));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    await pool.query('DELETE FROM documents WHERE id = ?', [req.params.id]);
    
    res.json({ message: 'Document deleted' });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ error: 'Server error deleting document' });
  }
});

module.exports = router;
