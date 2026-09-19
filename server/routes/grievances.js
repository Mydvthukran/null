/**
 * Grievance Redressal Routes
 * Public submission, ticket tracking, and admin resolution
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

// Rate limiter for public submission
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many grievances submitted from this IP, please try again later.' }
});

// Setup multer storage for grievance attachments
const uploadDir = path.join(__dirname, '../uploads/grievances');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'grievance-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images, PDFs, and Word documents under 5MB are allowed.'));
  }
});

// In-memory fallback array for local testing if DB is disconnected
let memoryGrievances = [];

// Helper: Generate unique ticket ID (e.g. GRV-2026-9812)
const generateTicketId = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `GRV-${year}-${randomDigits}`;
};

// POST /api/grievances/submit — Public grievance submission
router.post('/submit', submitLimiter, upload.single('attachment'), async (req, res) => {
  try {
    const {
      name,
      roll_number,
      email,
      phone,
      department,
      category,
      subject,
      description,
      is_anonymous
    } = req.body;

    if (!category || !subject || !description) {
      return res.status(400).json({ error: 'Category, subject, and description are required.' });
    }

    const ticket_id = generateTicketId();
    const isAnon = is_anonymous === 'true' || is_anonymous === true || is_anonymous === '1' ? 1 : 0;
    const attachmentPath = req.file ? `/uploads/grievances/${req.file.filename}` : null;
    const now = new Date();

    try {
      await pool.query(
        `INSERT INTO grievances (ticket_id, name, roll_number, email, phone, department, category, subject, description, attachment_path, is_anonymous, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', ?)`,
        [
          ticket_id,
          isAnon ? 'Anonymous' : (name || 'N/A'),
          isAnon ? 'N/A' : (roll_number || 'N/A'),
          isAnon ? 'N/A' : (email || 'N/A'),
          isAnon ? 'N/A' : (phone || 'N/A'),
          department || 'General',
          category,
          subject,
          description,
          attachmentPath,
          isAnon,
          now
        ]
      );
    } catch (dbErr) {
      console.warn('DB Insert fallback to memory:', dbErr.message);
      memoryGrievances.unshift({
        id: Date.now(),
        ticket_id,
        name: isAnon ? 'Anonymous' : (name || 'N/A'),
        roll_number: isAnon ? 'N/A' : (roll_number || 'N/A'),
        email: isAnon ? 'N/A' : (email || 'N/A'),
        phone: isAnon ? 'N/A' : (phone || 'N/A'),
        department: department || 'General',
        category,
        subject,
        description,
        attachment_path: attachmentPath,
        is_anonymous: isAnon,
        status: 'Submitted',
        resolution_remarks: null,
        created_at: now.toISOString()
      });
    }

    await logActivity(null, 'Grievance', 'Create', `New grievance ticket created: ${ticket_id} (${category})`);

    res.status(201).json({
      message: 'Grievance submitted successfully.',
      ticket_id,
      status: 'Submitted'
    });
  } catch (err) {
    console.error('Error submitting grievance:', err);
    res.status(500).json({ error: err.message || 'Server error submitting grievance.' });
  }
});

// GET /api/grievances/track/:ticketId — Public ticket tracking lookup
router.get('/track/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    if (!ticketId) {
      return res.status(400).json({ error: 'Ticket ID is required.' });
    }

    try {
      const [rows] = await pool.query('SELECT ticket_id, category, subject, description, status, resolution_remarks, created_at, updated_at FROM grievances WHERE ticket_id = ?', [ticketId.trim()]);
      if (rows.length > 0) {
        return res.json({ grievance: rows[0] });
      }
    } catch (dbErr) {
      const found = memoryGrievances.find(g => g.ticket_id.toLowerCase() === ticketId.trim().toLowerCase());
      if (found) {
        return res.json({ grievance: found });
      }
    }

    res.status(404).json({ error: 'No grievance ticket found matching that reference ID.' });
  } catch (err) {
    console.error('Error tracking ticket:', err);
    res.status(500).json({ error: 'Server error tracking grievance ticket.' });
  }
});

// GET /api/grievances — Admin list all grievances (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    try {
      const [rows] = await pool.query('SELECT * FROM grievances ORDER BY id DESC');
      return res.json({ grievances: rows });
    } catch (dbErr) {
      return res.json({ grievances: memoryGrievances });
    }
  } catch (err) {
    console.error('Error listing grievances:', err);
    res.status(500).json({ error: 'Server error fetching grievances list.' });
  }
});

// PUT /api/grievances/:id — Admin update grievance status and remarks
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, resolution_remarks } = req.body;
    const { id } = req.params;
    const validStatuses = ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed', 'Rejected'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid grievance status.' });
    }

    const now = new Date();

    try {
      const [existing] = await pool.query('SELECT * FROM grievances WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Grievance not found.' });
      }

      await pool.query(
        'UPDATE grievances SET status = ?, resolution_remarks = ?, updated_at = ? WHERE id = ?',
        [status || existing[0].status, resolution_remarks !== undefined ? resolution_remarks : existing[0].resolution_remarks, now, id]
      );

      const [updated] = await pool.query('SELECT * FROM grievances WHERE id = ?', [id]);
      await logActivity(req.admin, 'Grievances', 'Update', `Updated grievance ${existing[0].ticket_id} to ${status}`);
      return res.json({ message: 'Grievance updated successfully.', grievance: updated[0] });
    } catch (dbErr) {
      const itemIndex = memoryGrievances.findIndex(g => g.id == id);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Grievance not found in local memory.' });
      }
      if (status) memoryGrievances[itemIndex].status = status;
      if (resolution_remarks !== undefined) memoryGrievances[itemIndex].resolution_remarks = resolution_remarks;
      memoryGrievances[itemIndex].updated_at = now.toISOString();

      await logActivity(req.admin, 'Grievances', 'Update', `Updated grievance ${memoryGrievances[itemIndex].ticket_id} to ${status}`);
      return res.json({ message: 'Grievance updated in memory.', grievance: memoryGrievances[itemIndex] });
    }
  } catch (err) {
    console.error('Error updating grievance:', err);
    res.status(500).json({ error: 'Server error updating grievance.' });
  }
});

// DELETE /api/grievances/:id — Admin delete grievance (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM grievances WHERE id = ?', [id]);
    } catch (dbErr) {
      memoryGrievances = memoryGrievances.filter(g => g.id != id);
    }
    await logActivity(req.admin, 'Grievances', 'Delete', `Deleted grievance ID ${id}`);
    res.json({ message: 'Grievance deleted successfully.' });
  } catch (err) {
    console.error('Error deleting grievance:', err);
    res.status(500).json({ error: 'Server error deleting grievance.' });
  }
});

module.exports = router;
