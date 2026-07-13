const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

const uploadsDir = path.join(__dirname, '..', 'uploads', 'faculty');
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Helper to get faculty with their departments
const fetchFacultyWithDepartments = async (whereClause = '', params = []) => {
  const [facultyRows] = await pool.query(`SELECT * FROM faculty ${whereClause}`, params);
  
  if (facultyRows.length === 0) return [];

  const facultyIds = facultyRows.map(f => f.id);
  const [deptRows] = await pool.query('SELECT * FROM faculty_departments WHERE faculty_id IN (?)', [facultyIds]);

  return facultyRows.map(f => ({
    ...f,
    departments: deptRows.filter(d => d.faculty_id === f.id).map(d => d.department_slug)
  }));
};

// GET /api/faculty — Fetch all faculty
router.get('/', async (req, res) => {
  try {
    const data = await fetchFacultyWithDepartments('ORDER BY name ASC');
    res.json(data);
  } catch (err) {
    console.error('Error fetching faculty:', err);
    res.status(500).json({ error: 'Server error fetching faculty' });
  }
});

// GET /api/faculty/department/:slug — Fetch faculty by department
router.get('/department/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [relations] = await pool.query('SELECT faculty_id FROM faculty_departments WHERE department_slug = ?', [slug]);
    
    if (relations.length === 0) return res.json([]);
    
    const ids = relations.map(r => r.faculty_id);
    const data = await fetchFacultyWithDepartments('WHERE id IN (?) ORDER BY name ASC', [ids]);
    res.json(data);
  } catch (err) {
    console.error('Error fetching department faculty:', err);
    res.status(500).json({ error: 'Server error fetching department faculty' });
  }
});

// GET /api/faculty/:slug — Fetch single faculty by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await fetchFacultyWithDepartments('WHERE slug = ?', [slug]);
    if (data.length === 0) return res.status(404).json({ error: 'Faculty not found' });
    res.json(data[0]);
  } catch (err) {
    console.error('Error fetching faculty details:', err);
    res.status(500).json({ error: 'Server error fetching faculty details' });
  }
});

// POST /api/faculty — Add new faculty (Admin)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, slug, designation, qualification, email, area_of_interest, vidwan_link, departments } = req.body;
  const imagePath = req.file ? `/uploads/faculty/${req.file.filename}` : null;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO faculty (slug, name, designation, qualification, email, area_of_interest, vidwan_link, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [slug, name, designation, qualification, email, area_of_interest, vidwan_link, imagePath]
    );

    const facultyId = result.insertId;
    
    if (departments) {
      const depts = JSON.parse(departments);
      for (const deptSlug of depts) {
        await pool.query('INSERT INTO faculty_departments (faculty_id, department_slug) VALUES (?, ?)', [facultyId, deptSlug]);
      }
    }

    res.status(201).json({ message: 'Faculty created successfully', id: facultyId });
  } catch (err) {
    console.error('Error creating faculty:', err);
    res.status(500).json({ error: 'Server error creating faculty' });
  }
});

// PUT /api/faculty/:id — Update faculty (Admin)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, slug, designation, qualification, email, area_of_interest, vidwan_link, departments } = req.body;
  
  try {
    let query = 'UPDATE faculty SET slug=?, name=?, designation=?, qualification=?, email=?, area_of_interest=?, vidwan_link=? WHERE id=?';
    let params = [slug, name, designation, qualification, email, area_of_interest, vidwan_link, id];

    if (req.file) {
      const imagePath = `/uploads/faculty/${req.file.filename}`;
      query = 'UPDATE faculty SET slug=?, name=?, designation=?, qualification=?, email=?, area_of_interest=?, vidwan_link=?, image_path=? WHERE id=?';
      params = [slug, name, designation, qualification, email, area_of_interest, vidwan_link, imagePath, id];
    }

    await pool.query(query, params);

    // Update departments
    if (departments) {
      const depts = JSON.parse(departments);
      await pool.query('DELETE FROM faculty_departments WHERE faculty_id = ?', [id]);
      for (const deptSlug of depts) {
        await pool.query('INSERT INTO faculty_departments (faculty_id, department_slug) VALUES (?, ?)', [id, deptSlug]);
      }
    }

    res.json({ message: 'Faculty updated successfully' });
  } catch (err) {
    console.error('Error updating faculty:', err);
    res.status(500).json({ error: 'Server error updating faculty' });
  }
});

// DELETE /api/faculty/:id — Delete faculty (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM faculty WHERE id = ?', [id]);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    console.error('Error deleting faculty:', err);
    res.status(500).json({ error: 'Server error deleting faculty' });
  }
});

module.exports = router;
