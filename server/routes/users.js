/**
 * User Management Routes — CRUD for admin users
 * Only accessible by super_admin role.
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');

// All routes require auth + super_admin role
router.use(authMiddleware);
router.use(requireRole('super_admin'));

// GET /api/users — List all admin users
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, name, role, permissions FROM admins ORDER BY id ASC');
    const users = rows.map(row => ({
      ...row,
      permissions: (() => {
        try { return JSON.parse(row.permissions || '[]'); }
        catch { return []; }
      })()
    }));
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/users — Create a new admin user
router.post('/', async (req, res) => {
  try {
    const { username, password, name, role, permissions } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Username, password, and name are required.' });
    }

    // Check if username already exists
    const [existing] = await pool.query('SELECT id FROM admins WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'editor';
    const userPermissions = JSON.stringify(permissions || []);

    const [result] = await pool.execute(
      'INSERT INTO admins (username, password, name, role, permissions) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, name, userRole, userPermissions]
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { id: result.insertId, username, name, role: userRole, permissions: permissions || [] }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id — Update a user's info (role, permissions, name, password)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, permissions, password } = req.body;

    // Prevent changing your own role away from super_admin
    if (parseInt(id) === req.admin.id && role && role !== 'super_admin') {
      return res.status(400).json({ error: 'You cannot demote yourself.' });
    }

    const updates = [];
    const values = [];

    if (name) { updates.push('name = ?'); values.push(name); }
    if (role) { updates.push('role = ?'); values.push(role); }
    if (permissions) { updates.push('permissions = ?'); values.push(JSON.stringify(permissions)); }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update.' });
    }

    values.push(id);
    await pool.execute(`UPDATE admins SET ${updates.join(', ')} WHERE id = ?`, values);

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id — Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Cannot delete yourself
    if (parseInt(id) === req.admin.id) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }

    await pool.execute('DELETE FROM admins WHERE id = ?', [id]);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
