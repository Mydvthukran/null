require('dotenv').config();
const pool = require('./config/db');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    console.log(`Checking configuration for username: ${username}`);

    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      console.error(`❌ Admin user '${username}' not found in the database.`);
      process.exit(1);
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (isMatch) {
      console.log(`✅ Success! The password for '${username}' in the database matches the ADMIN_PASSWORD in your .env file.`);
    } else {
      console.error(`❌ Error: The password for '${username}' in the database does NOT match the .env file.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
})();
