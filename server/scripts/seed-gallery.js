require('dotenv').config({ path: '../.env', override: true });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function seedGallery() {
  const sourceDir = path.join(__dirname, '../../client/src/assets/new-assets/life at siet/gallery');
  const destDir = path.join(__dirname, '../uploads/gallery');
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(sourceDir);
    
    for (const [index, file] of files.entries()) {
      if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
      
      const sourcePath = path.join(sourceDir, file);
      const uniqueName = Date.now() + '-' + file.replace(/\s+/g, '-');
      const destPath = path.join(destDir, uniqueName);
      
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
      
      const dbPath = `/uploads/gallery/${uniqueName}`;
      
      // We will assign the first 6 as "Home Carousel" and the rest as "Campus"
      const category = index < 6 ? 'Home Carousel' : 'Campus';
      const title = `Campus Photo ${index + 1}`;
      
      await pool.query(
        'INSERT INTO gallery (title, category, imagePath) VALUES (?, ?, ?)',
        [title, category, dbPath]
      );
      
      console.log(`Seeded: ${title} (${category})`);
    }
    
    console.log('✅ Successfully seeded the gallery!');
  } catch (err) {
    console.error('Error seeding gallery:', err);
  } finally {
    process.exit(0);
  }
}

seedGallery();
