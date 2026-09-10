const pool = require('./config/db');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    const hash = await bcrypt.hash('siet@2025', 10);
    await pool.query('UPDATE admins SET password = ? WHERE username = "siet_admin"', [hash]);
    console.log('Password reset for siet_admin');
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
})();