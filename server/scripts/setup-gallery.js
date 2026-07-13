require('dotenv').config({ path: '../.env', override: true });
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function run() {
  try {
    console.log('Connecting to database...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) DEFAULT 'general',
        imagePath VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Created `gallery` table (or already exists).');

    console.log('Successfully completed gallery setup.');
  } catch (err) {
    console.error('Error during setup:', err);
  } finally {
    process.exit(0);
  }
}

run();
