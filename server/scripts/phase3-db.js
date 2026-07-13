require('dotenv').config({ path: '../.env', override: true });
const mysql = require('mysql2/promise');

const defaultSettings = [
  { setting_key: 'welcome_title', setting_value: 'Welcome to SIET' },
  { setting_key: 'welcome_subtitle', setting_value: 'Empowering the next generation of engineers with practical skills and innovative thinking.' },
  { setting_key: 'contact_email', setting_value: 'info@siet.edu.in' },
  { setting_key: 'contact_phone', setting_value: '+91-1234567890' },
  { setting_key: 'address', setting_value: 'SIET Campus, Main Road, City, State 123456' },
  { setting_key: 'facebook_link', setting_value: 'https://facebook.com/siet' },
  { setting_key: 'twitter_link', setting_value: 'https://twitter.com/siet' },
  { setting_key: 'instagram_link', setting_value: 'https://instagram.com/siet' },
  { setting_key: 'linkedin_link', setting_value: 'https://linkedin.com/school/siet' }
];

async function migrateSettings() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Creating site_settings table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT
      )
    `);

    console.log('Inserting default settings...');
    for (const setting of defaultSettings) {
      await pool.query(
        'INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)',
        [setting.setting_key, setting.setting_value]
      );
    }

    // Add extra document categories to documents table if they are missing
    console.log('Ensuring document categories...');
    const extraDocs = [
      { document_key: 'prospectus', name: 'College Prospectus 2025', category: 'General' },
      { document_key: 'admission_form', name: 'Admission Form PDF', category: 'Admissions' },
      { document_key: 'academic_calendar', name: 'Academic Calendar', category: 'Academic' },
      { document_key: 'policies', name: 'Student Policies & Guidelines', category: 'General' }
    ];

    for (const doc of extraDocs) {
      await pool.query(
        'INSERT IGNORE INTO documents (document_key, name, category, size) VALUES (?, ?, ?, ?)',
        [doc.document_key, doc.name, doc.category, '0 KB']
      );
    }

    console.log('Phase 3 DB Migration Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateSettings();
