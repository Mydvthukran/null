/**
 * Gallery Routes — Manage Image Gallery
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

// Ensure uploads/gallery directory exists
const galleryDir = path.join(__dirname, '..', 'uploads', 'gallery');
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, galleryDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max for images
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, PNG, WEBP, and GIF images are allowed.'));
    }
  },
});

// GET /api/gallery — List all gallery images
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY createdAt DESC');
    res.json({ images: rows });
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Server error fetching gallery images' });
  }
});

// POST /api/gallery — Upload a new image
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded.' });
  }

  const { title, category } = req.body;
  if (!title) {
    // If we fail, delete the just-uploaded file
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Image title is required.' });
  }

  try {
    const imagePath = '/uploads/gallery/' + req.file.filename;
    const cat = category || 'general';

    const [result] = await pool.query(
      'INSERT INTO gallery (title, category, imagePath) VALUES (?, ?, ?)',
      [title, cat, imagePath]
    );

    res.json({ message: 'Image uploaded successfully', id: result.insertId });
  } catch (err) {
    console.error('Error uploading image:', err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Server error saving image' });
  }
});

// PUT /api/gallery/:id — Update image title and category
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, category } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Image title is required.' });
  }

  try {
    const cat = category || 'general';
    await pool.query(
      'UPDATE gallery SET title = ?, category = ? WHERE id = ?',
      [title, cat, req.params.id]
    );
    res.json({ message: 'Image updated successfully' });
  } catch (err) {
    console.error('Error updating image:', err);
    res.status(500).json({ error: 'Server error updating image' });
  }
});

// DELETE /api/gallery/:id — Delete an image
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Image not found.' });
    
    let img = rows[0];

    // Delete file from local storage
    if (img.imagePath) {
      const fileName = path.basename(img.imagePath);
      const localPath = path.join(galleryDir, fileName);
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    }

    await pool.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Server error deleting image' });
  }
});

module.exports = router;
