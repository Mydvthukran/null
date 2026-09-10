/**
 * Dashboard Routes — Aggregated stats for the admin overview
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const pool = require('../config/db');

// GET /api/dashboard — Get all dashboard stats
router.get('/', authMiddleware, async (req, res) => {
  try {
    // 1. Fetch recent activity from the activity_log table
    const [recentActivityRows] = await pool.query(
      'SELECT id, admin_name, module, action, description, timestamp FROM activity_log ORDER BY timestamp DESC LIMIT 10'
    );
    
    // Map to a nice format for the frontend
    const recentActivity = recentActivityRows.map(row => ({
      id: row.id,
      module: row.module,
      action: row.action,
      description: row.description,
      user: row.admin_name,
      // Format as ISO string so frontend can format it nicely
      date: row.timestamp,
      status: row.action // frontend uses status for coloring
    }));

    // 2. Fetch Counts
    const [[visitorCount]] = await pool.query('SELECT total FROM visitors WHERE id = 1');
    const [[pendingAppCount]] = await pool.query('SELECT COUNT(*) as count FROM applications WHERE status IN ("Under Review", "Missing Docs")');
    const [[activeNoticeCount]] = await pool.query('SELECT COUNT(*) as count FROM notices');
    const [[upcomingEventCount]] = await pool.query('SELECT COUNT(*) as count FROM events WHERE status = "Upcoming"');
    const [[facultyCount]] = await pool.query('SELECT COUNT(*) as count FROM faculty');
    const [[galleryCount]] = await pool.query('SELECT COUNT(*) as count FROM gallery');
    const [[totalAppCount]] = await pool.query('SELECT COUNT(*) as count FROM applications');
    const [[contactCount]] = await pool.query('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "New"');

    res.json({
      stats: {
        totalVisitors: visitorCount ? visitorCount.total : 0,
        pendingApplications: pendingAppCount.count,
        activeNotices: activeNoticeCount.count,
        upcomingEvents: upcomingEventCount.count,
        facultyCount: facultyCount.count,
        galleryCount: galleryCount.count,
        totalApplications: totalAppCount.count,
        newContacts: contactCount.count,
      },
      recentActivity,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error retrieving dashboard stats' });
  }
});

// GET /api/dashboard/logs - Get login logs and session actions
router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const [logins] = await pool.query('SELECT * FROM login_logs ORDER BY login_time DESC LIMIT 50');
    
    // For each login, fetch the actions that match its session_id
    for (let log of logins) {
      if (log.session_id) {
        const [actions] = await pool.query(
          'SELECT module, action, description, timestamp FROM activity_log WHERE session_id = ? ORDER BY timestamp DESC',
          [log.session_id]
        );
        log.actions = actions;
      } else {
        log.actions = [];
      }
    }
    res.json({ logs: logins });
  } catch (err) {
    console.error('Failed to fetch logs:', err);
    res.status(500).json({ error: 'Server error retrieving logs' });
  }
});

module.exports = router;
