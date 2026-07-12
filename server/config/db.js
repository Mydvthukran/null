/**
 * Database Configuration
 * Currently uses in-memory mock data.
 * When ready, uncomment the MySQL pool to connect to Hostinger MySQL.
 */
// const mysql = require('mysql2/promise');

// ============================================================
// FUTURE: MySQL Connection Pool (Hostinger)
// ============================================================
// Uncomment and configure when your Hostinger MySQL database is ready.
//
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
//
// module.exports = pool;

// ============================================================
// CURRENT: In-Memory Mock Data Store
// ============================================================
// This acts as a temporary database until MySQL is connected.

const mockData = {
  // Admin credentials (in production, store hashed passwords in MySQL)
  admins: [
    {
      id: 1,
      username: 'admin',
      // This is bcrypt hash of "admin123" — change in production!
      password: '$2b$10$BsCvpI5/.RLvzMbHdOnGi.jLpeX7SshFy9GdylYigcFg51pb1KmJy',
      name: 'System Admin',
    },
  ],

  // Visitor count tracker
  visitors: {
    total: 0,
    monthly: [],
  },

  // Student applications
  applications: [],

  // Website documents
  documents: [],

  // Notices
  notices: [],

  // Events
  events: [],
};

module.exports = mockData;

// Trigger restart
