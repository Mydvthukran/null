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
      password: '$2b$10$SkKGKvQesmp9EHMeUfkBh.Lkfz2kP4AymGuT4cqOQtdfFmybyfFBG',
      name: 'System Admin',
    },
  ],

  // Visitor count tracker
  visitors: {
    total: 124563,
    monthly: [
      { month: 'May', count: 18200 },
      { month: 'Jun', count: 19450 },
      { month: 'Jul', count: 21300 },
    ],
  },

  // Student applications
  applications: [
    { id: 'APP-4029', name: 'Rahul Sharma', course: 'B.Tech Computer Science', date: '2026-10-24', status: 'Under Review' },
    { id: 'APP-4028', name: 'Priya Patel', course: 'B.Tech Electronics', date: '2026-10-23', status: 'Approved' },
    { id: 'APP-4027', name: 'Amit Kumar', course: 'B.Tech Mechanical', date: '2026-10-21', status: 'Missing Docs' },
    { id: 'APP-4026', name: 'Neha Singh', course: 'B.Tech Civil', date: '2026-10-20', status: 'Approved' },
    { id: 'APP-4025', name: 'Vikram Verma', course: 'B.Tech Computer Science', date: '2026-10-18', status: 'Rejected' },
  ],

  // Website documents
  documents: [
    { id: 1, name: 'Academic_Calendar_2026.pdf', category: 'Academics', size: '245 KB', updatedAt: '2026-10-15', filePath: '/uploads/Academic_Calendar_2026.pdf' },
    { id: 2, name: 'Admission_Brochure_2026.pdf', category: 'Admissions', size: '4.2 MB', updatedAt: '2026-09-20', filePath: '/uploads/Admission_Brochure_2026.pdf' },
    { id: 3, name: 'Fee_Structure_BTech.xlsx', category: 'Finance', size: '128 KB', updatedAt: '2026-08-10', filePath: '/uploads/Fee_Structure_BTech.xlsx' },
  ],

  // Notices
  notices: [
    { id: 1, title: 'Mid-Semester Exam Datesheet', content: 'Exams start from Nov 1, 2026.', date: '2026-10-22', status: 'Published' },
    { id: 2, title: 'Holiday Notice - Diwali', content: 'College closed from Oct 30 to Nov 3.', date: '2026-10-20', status: 'Published' },
  ],

  // Events
  events: [
    { id: 1, title: 'Tech Symposium 2026', date: '2026-11-15', description: 'Annual technical symposium.', status: 'Upcoming' },
    { id: 2, title: 'Guest Lecture - AI in Healthcare', date: '2026-11-05', description: 'By Dr. Ramesh from IIT Delhi.', status: 'Upcoming' },
  ],
};

module.exports = mockData;
