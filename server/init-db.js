require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function initDB() {
  console.log('Connecting to MySQL...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected to database. Creating tables...');

    // Admins table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100)
      )
    `);

    // Visitors table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT PRIMARY KEY DEFAULT 1,
        total INT DEFAULT 0
      )
    `);

    // Applications table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        course VARCHAR(100),
        date VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Under Review'
      )
    `);

    // Documents table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        size VARCHAR(50),
        updatedAt VARCHAR(50),
        filePath VARCHAR(255) NOT NULL
      )
    `);

    // Notices table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(50),
        status VARCHAR(50)
      )
    `);

    // Events table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(50),
        status VARCHAR(50)
      )
    `);

    console.log('Tables created successfully.');

    // Seed data
    // 1. Admin
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be provided in environment variables.");
    }
    
    const [adminRows] = await connection.execute('SELECT * FROM admins WHERE username = ?', [adminUsername]);
    if (adminRows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await connection.execute(
        'INSERT INTO admins (username, password, name) VALUES (?, ?, ?)',
        [adminUsername, hashedPassword, 'System Admin']
      );
      console.log(`Default admin seeded (username: ${adminUsername})`);
    }

    // 2. Visitors
    const [visitorRows] = await connection.execute('SELECT * FROM visitors WHERE id = 1');
    if (visitorRows.length === 0) {
      await connection.execute('INSERT INTO visitors (id, total) VALUES (1, 0)');
      console.log('Visitor tracker seeded.');
    }

    console.log('Database initialization complete!');
    await connection.end();
    process.exit(0);

  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
}

initDB();
