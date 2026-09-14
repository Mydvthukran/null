require('dotenv').config();
const pool = require('./config/db');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be provided in the .env file.");
    }

    const hash = await bcrypt.hash(password, 10);
    
    // Check if the admin exists
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      await pool.query('INSERT INTO admins (username, password, name, role) VALUES (?, ?, ?, ?)', [username, hash, 'System Admin', 'super_admin']);
      console.log(`Admin ${username} created successfully with the new credentials.`);
    } else {
      await pool.query('UPDATE admins SET password = ? WHERE username = ?', [hash, username]);
      console.log(`Admin ${username} credentials updated successfully.`);
    }
    
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
})();
