require('dotenv').config({ override: true });
const mysql = require('mysql2/promise');

async function alterTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected. Altering tables...');

    await connection.execute(`
      ALTER TABLE notices
      ADD COLUMN file_path VARCHAR(255) DEFAULT NULL,
      ADD COLUMN category VARCHAR(100) DEFAULT 'Notice'
    `);
    console.log('Added file_path and category to notices.');

    await connection.execute(`
      ALTER TABLE events
      ADD COLUMN file_path VARCHAR(255) DEFAULT NULL,
      ADD COLUMN category VARCHAR(100) DEFAULT 'Event'
    `);
    console.log('Added file_path and category to events.');

    await connection.end();
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    // If the columns already exist, MySQL throws an error. We can ignore it if it's ER_DUP_FIELDNAME.
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist. Proceeding...');
      process.exit(0);
    } else {
      console.error('Error:', err);
      process.exit(1);
    }
  }
}

alterTables();
