const pool = require('./config/db');

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS login_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT,
        admin_name VARCHAR(255),
        ip_address VARCHAR(45),
        location VARCHAR(255),
        device VARCHAR(255),
        browser VARCHAR(255),
        os VARCHAR(255),
        session_id VARCHAR(100),
        login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Add session_id to activity_log if it doesn't exist
    const [cols] = await pool.query("SHOW COLUMNS FROM activity_log LIKE 'session_id'");
    if (cols.length === 0) {
      await pool.query("ALTER TABLE activity_log ADD COLUMN session_id VARCHAR(100)");
    }
    
    console.log("DB setup complete");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();