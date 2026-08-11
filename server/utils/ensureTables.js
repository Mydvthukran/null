/**
 * Auto-migrate — Ensures all required database tables exist on server startup.
 * This avoids 500 errors on routes that depend on tables created by phase migration scripts.
 * Safe to run multiple times: every statement uses IF NOT EXISTS / IF NOT EXISTS pattern.
 */
const pool = require('../config/db');

async function ensureTables() {
  try {
    const conn = await pool.getConnection();
    try {
      // admins (base)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          name VARCHAR(100),
          role VARCHAR(50) DEFAULT 'editor',
          permissions TEXT
        )
      `);

      // visitors
      await conn.query(`
        CREATE TABLE IF NOT EXISTS visitors (
          id INT PRIMARY KEY DEFAULT 1,
          total INT DEFAULT 0
        )
      `);

      // applications
      await conn.query(`
        CREATE TABLE IF NOT EXISTS applications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          course VARCHAR(100),
          date VARCHAR(50),
          status VARCHAR(50) DEFAULT 'Under Review'
        )
      `);

      // documents (with document_key)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS documents (
          id INT AUTO_INCREMENT PRIMARY KEY,
          document_key VARCHAR(100) UNIQUE,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100),
          size VARCHAR(50),
          updatedAt VARCHAR(50),
          filePath VARCHAR(255)
        )
      `);

      // notices
      await conn.query(`
        CREATE TABLE IF NOT EXISTS notices (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          date VARCHAR(50),
          status VARCHAR(50),
          category VARCHAR(100),
          file_path VARCHAR(500),
          publish_date DATETIME
        )
      `);

      // events
      await conn.query(`
        CREATE TABLE IF NOT EXISTS events (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          date VARCHAR(50),
          status VARCHAR(50),
          category VARCHAR(100),
          file_path VARCHAR(500)
        )
      `);

      // contact_submissions (phase1)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150),
          phone VARCHAR(20),
          subject VARCHAR(200),
          message TEXT,
          date VARCHAR(50),
          status VARCHAR(50) DEFAULT 'New'
        )
      `);

      // event_registrations (phase1)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS event_registrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          event_id INT NOT NULL,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150),
          phone VARCHAR(20),
          student_id VARCHAR(50),
          date VARCHAR(50)
        )
      `);

      // faculty (phase2)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS faculty (
          id INT AUTO_INCREMENT PRIMARY KEY,
          slug VARCHAR(100) UNIQUE NOT NULL,
          name VARCHAR(150) NOT NULL,
          designation VARCHAR(150),
          qualification VARCHAR(255),
          email VARCHAR(150),
          area_of_interest TEXT,
          vidwan_link VARCHAR(255),
          image_path VARCHAR(255)
        )
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS faculty_departments (
          faculty_id INT NOT NULL,
          department_slug VARCHAR(100) NOT NULL,
          PRIMARY KEY (faculty_id, department_slug)
        )
      `);

      // site_settings (phase3)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(100) PRIMARY KEY,
          setting_value TEXT
        )
      `);

      // navigation_menus (phase4)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS navigation_menus (
          id INT AUTO_INCREMENT PRIMARY KEY,
          parent_id INT DEFAULT NULL,
          name VARCHAR(100) NOT NULL,
          href VARCHAR(255) DEFAULT '',
          is_external TINYINT(1) DEFAULT 0,
          sort_order INT DEFAULT 0
        )
      `);

      // gallery (setup-gallery)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS gallery (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255),
          category VARCHAR(100) DEFAULT 'Campus',
          image_path VARCHAR(500) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // activity_log (phase6)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS activity_log (
          id INT AUTO_INCREMENT PRIMARY KEY,
          admin_id INT,
          admin_name VARCHAR(100),
          module VARCHAR(50),
          action VARCHAR(50),
          description TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ All database tables verified/created.');
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('⚠️  Auto-migration warning (non-fatal):', err.message);
    // Non-fatal: the server can still start, individual routes will return errors if tables are missing.
  }
}

module.exports = ensureTables;
