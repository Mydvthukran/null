const pool = require('./config/db');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = "siet_admin"');
    if (rows.length === 0) {
      const hash = await bcrypt.hash('siet@2025', 10);
      await pool.query('INSERT INTO admins (username, password, name, role) VALUES (?, ?, ?, ?)', ['siet_admin', hash, 'Super Admin', 'super_admin']);
      console.log('Created siet_admin');
    } else {
      console.log('siet_admin already exists');
    }
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
})();