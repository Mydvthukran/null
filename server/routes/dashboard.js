/**
 * Dashboard Routes — Aggregated stats for the admin overview
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mockData = require('../config/db');

// GET /api/dashboard — Get all dashboard stats
router.get('/', authMiddleware, (req, res) => {
  const recentActivity = [];
  
  if (mockData.applications.length > 0) {
    const app = mockData.applications[mockData.applications.length - 1];
    recentActivity.push({ module: 'Admissions', description: `Application updated (#${app.id})`, date: app.date || 'Today', status: app.status });
  }
  
  if (mockData.notices.length > 0) {
    const notice = mockData.notices[mockData.notices.length - 1];
    recentActivity.push({ module: 'Notices', description: notice.title, date: notice.date || 'Today', status: notice.status });
  }

  res.json({
    stats: {
      totalVisitors: mockData.visitors.total,
      pendingApplications: mockData.applications.filter((a) => a.status === 'Under Review' || a.status === 'Missing Docs').length,
      activeNotices: mockData.notices.length,
      upcomingEvents: mockData.events.filter((e) => e.status === 'Upcoming').length,
    },
    recentActivity,
  });
});

module.exports = router;
