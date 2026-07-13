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

    res.json({
      stats: {
        totalVisitors: visitorCount ? visitorCount.total : 0,
        pendingApplications: pendingAppCount.count,
        activeNotices: activeNoticeCount.count,
        upcomingEvents: upcomingEventCount.count,
      },
      recentActivity,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error retrieving dashboard stats' });
  }
});

module.exports = router;
