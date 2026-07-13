require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'siet_db',
};

async function runMigration() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    // Create activity_log table
    await connection.query(`
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
    console.log('Created "activity_log" table.');

    console.log('Phase 6 DB Migration Complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
