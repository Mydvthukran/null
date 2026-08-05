require('dotenv').config({ path: '../.env' });
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function updateSuperAdmin() {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in the .env file!");
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // We update the user where id = 1 or username = 'admin', depending on what the current superadmin is.
    // In init-db, the default admin is usually id 1.
    const [result] = await pool.query(
      'UPDATE admins SET username = ?, password = ? WHERE role = ? OR id = 1',
      [adminUsername, hashedPassword, 'super_admin']
    );
    
    console.log('Super Admin credentials updated successfully!', result);
  } catch (err) {
    console.error('Failed to update credentials', err);
  } finally {
    process.exit();
  }
}

updateSuperAdmin();
