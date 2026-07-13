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
    const recentActivity = [];

    // Applications
    const [appRows] = await pool.query('SELECT * FROM applications ORDER BY id DESC LIMIT 1');
    if (appRows.length > 0) {
      const app = appRows[0];
      recentActivity.push({ module: 'Admissions', description: `Application updated (#${app.id})`, date: app.date || 'Today', status: app.status });
    }

    // Notices
    const [noticeRows] = await pool.query('SELECT * FROM notices ORDER BY id DESC LIMIT 1');
    if (noticeRows.length > 0) {
      const notice = noticeRows[0];
      recentActivity.push({ module: 'Notices', description: notice.title, date: notice.date || 'Today', status: notice.status });
    }

    // Counts
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
