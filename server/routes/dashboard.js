/**
 * Dashboard Routes — Aggregated stats for the admin overview
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mockData = require('../config/db');

// GET /api/dashboard — Get all dashboard stats
router.get('/', authMiddleware, (req, res) => {
  res.json({
    stats: {
      totalVisitors: mockData.visitors.total,
      pendingApplications: mockData.applications.filter((a) => a.status === 'Under Review' || a.status === 'Missing Docs').length,
      activeNotices: mockData.notices.length,
      upcomingEvents: mockData.events.filter((e) => e.status === 'Upcoming').length,
    },
    recentActivity: [
      { module: 'Admissions', description: `New B.Tech CSE Application (#${mockData.applications[0]?.id})`, date: 'Today, 10:42 AM', status: 'Pending Review' },
      { module: 'Notices', description: mockData.notices[0]?.title || 'No notices', date: 'Yesterday, 03:00 PM', status: 'Published' },
      { module: 'Events', description: mockData.events[0]?.title || 'No events', date: 'Yesterday, 11:15 AM', status: 'Scheduled' },
    ],
  });
});

module.exports = router;
