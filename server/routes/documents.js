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
const mockData = require('../config/db');

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
router.get('/', authMiddleware, (req, res) => {
  res.json({ documents: mockData.documents });
});

// POST /api/documents — Upload a new document
router.post('/', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { category } = req.body;
  const fileSizeKB = (req.file.size / 1024).toFixed(0);
  const sizeLabel = req.file.size > 1024 * 1024
    ? (req.file.size / (1024 * 1024)).toFixed(1) + ' MB'
    : fileSizeKB + ' KB';

  const newDoc = {
    id: mockData.documents.length + 1,
    name: req.file.originalname,
    category: category || 'General',
    size: sizeLabel,
    updatedAt: new Date().toISOString().split('T')[0],
    filePath: '/uploads/' + req.file.filename,
  };

  mockData.documents.push(newDoc);
  res.status(201).json({ message: 'Document uploaded', document: newDoc });
});

// PUT /api/documents/:id — Replace a document file
router.put('/:id', authMiddleware, upload.single('file'), (req, res) => {
  const doc = mockData.documents.find((d) => d.id === parseInt(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Document not found.' });

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

  res.json({ message: 'Document replaced', document: doc });
});

// DELETE /api/documents/:id — Delete a document
router.delete('/:id', authMiddleware, (req, res) => {
  const index = mockData.documents.findIndex((d) => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Document not found.' });

  const doc = mockData.documents[index];
  // Delete file from local storage
  const filePath = path.join(uploadsDir, path.basename(doc.filePath));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  mockData.documents.splice(index, 1);
  res.json({ message: 'Document deleted' });
});

module.exports = router;
