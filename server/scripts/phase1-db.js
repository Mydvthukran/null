require('dotenv').config({ path: '../.env', override: true });
const mysql = require('mysql2/promise');

async function migratePhase1() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Creating contact_submissions table...');
    await pool.query(`
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

    console.log('Creating event_registrations table...');
    await pool.query(`
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

    console.log('Adding publish_date to notices table...');
    try {
      await pool.query(`ALTER TABLE notices ADD COLUMN publish_date DATETIME`);
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('publish_date column already exists.');
      } else {
        throw e;
      }
    }

    console.log('Phase 1 DB Migration Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migratePhase1();
