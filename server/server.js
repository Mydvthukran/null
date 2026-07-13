/**
 * SIET Admin Backend Server
 * =========================
 * Express.js backend for the college admin dashboard.
 * Currently uses in-memory mock data.
 * 
 * FUTURE INTEGRATIONS:
 *   - MySQL database (via Hostinger)
 *   - Hostinger Cloud Storage for document uploads
 */
require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// Middleware
// ============================================================
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================================
// API Routes
// ============================================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/events', require('./routes/events'));
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/menus', require('./routes/menus'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'SIET Admin Server is running' });
});

// ============================================================
// Error Handling
// ============================================================
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ============================================================
// Start Server
// ============================================================
app.listen(PORT, () => {
  console.log(`✅ SIET Admin Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
