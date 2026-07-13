require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');

const ALL_PERMISSIONS = [
  'overview', 'applications', 'notices', 'documents',
  'events', 'gallery', 'faculty', 'forms', 'settings', 'menus'
];

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'siet_db',
};

async function runMigration() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    // 1. Add 'role' column if not exists
    const [cols] = await connection.query(`SHOW COLUMNS FROM admins LIKE 'role'`);
    if (cols.length === 0) {
      await connection.query(`ALTER TABLE admins ADD COLUMN role VARCHAR(50) DEFAULT 'editor' AFTER name`);
      console.log('Added "role" column to admins table.');
    } else {
      console.log('"role" column already exists.');
    }

    // 2. Add 'permissions' column if not exists
    const [permCols] = await connection.query(`SHOW COLUMNS FROM admins LIKE 'permissions'`);
    if (permCols.length === 0) {
      await connection.query(`ALTER TABLE admins ADD COLUMN permissions TEXT AFTER role`);
      console.log('Added "permissions" column to admins table.');
    } else {
      console.log('"permissions" column already exists.');
    }

    // 3. Set existing admin (id=1) to super_admin with all permissions
    await connection.query(
      `UPDATE admins SET role = 'super_admin', permissions = ? WHERE id = 1`,
      [JSON.stringify(ALL_PERMISSIONS)]
    );
    console.log('Updated existing admin to super_admin with all permissions.');

    console.log('Phase 5 DB Migration Complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
