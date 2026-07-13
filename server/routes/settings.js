const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyAdmin = require('../middleware/auth');

// Get all settings
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settingsObj = {};
    rows.forEach(row => {
      settingsObj[row.setting_key] = row.setting_value;
    });
    res.json(settingsObj);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update multiple settings (Admin only)
router.put('/', verifyAdmin, async (req, res) => {
  try {
    const updates = req.body;
    
    // We expect req.body to be an object: { 'welcome_title': '...', 'contact_email': '...' }
    const keys = Object.keys(updates);
    if (keys.length === 0) return res.json({ success: true });

    const promises = keys.map(key => {
      return pool.query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, updates[key], updates[key]]
      );
    });

    await Promise.all(promises);
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
