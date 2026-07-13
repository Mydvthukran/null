require('dotenv').config({ override: true });
const mysql = require('mysql2/promise');

const INITIAL_DOCS = [
  { key: 'BTECH_SYLLABUS_1ST_YEAR', name: 'B.Tech 1st Year Common Syllabus', category: 'Syllabus' },
  { key: 'BTECH_SYLLABUS_CSE_AIML_2ND_YEAR', name: 'B.Tech CSE/AIML/CS 2nd Year Syllabus', category: 'Syllabus' },
  { key: 'BTECH_SYLLABUS_ROBOTICS', name: 'B.Tech Robotics & Automation Syllabus', category: 'Syllabus' },
  { key: 'BTECH_SYLLABUS_AIML_5_6_SEM', name: 'B.Tech AIML 5th & 6th Sem Syllabus', category: 'Syllabus' },
  { key: 'PROSPECTUS_BE_BTECH_BARCH', name: 'BE/B.Tech/B.Arch Prospectus', category: 'Admission' },
  { key: 'PROSPECTUS_BTECH_LEET', name: 'B.Tech LEET Prospectus', category: 'Admission' },
  { key: 'TIMETABLE_AIML', name: 'AIML Branch Timetable', category: 'Timetable' },
  { key: 'TIMETABLE_CSE', name: 'CSE Branch Timetable', category: 'Timetable' },
  { key: 'TIMETABLE_ROBOTICS', name: 'Robotics Branch Timetable', category: 'Timetable' },
  { key: 'FEE_SBI_COLLECT', name: 'SBI Collect Payment Guide', category: 'Fee' },
  { key: 'ADMISSION_DOCS_REQUIRED', name: 'Documents Required for Admission', category: 'Admission' },
  { key: 'ADMISSION_MISC_DOCS', name: 'Miscellaneous Admission Documents', category: 'Admission' },
  { key: 'FEE_STRUCTURE', name: 'Fee Structure', category: 'Fee' },
  { key: 'ADMISSION_FORM', name: 'B.Tech Admission Form', category: 'Admission' },
  { key: 'FEE_REFUND_PERFORMA', name: 'Fee Refund Performa', category: 'Fee' },
  { key: 'MOU_IIT_ROPAR', name: 'MoU IIT Ropar & SIET Panchkula', category: 'General' },
];

async function seedDocuments() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected. Dropping old documents table (clearing mock data)...');
    await connection.execute('DROP TABLE IF EXISTS documents');

    console.log('Recreating documents table with document_key...');
    await connection.execute(`
      CREATE TABLE documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        document_key VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        size VARCHAR(50),
        updatedAt VARCHAR(50),
        filePath VARCHAR(255)
      )
    `);

    console.log('Inserting initial system documents...');
    for (const doc of INITIAL_DOCS) {
      await connection.execute(
        'INSERT INTO documents (document_key, name, category, updatedAt, filePath, size) VALUES (?, ?, ?, ?, ?, ?)',
        [doc.key, doc.name, doc.category, new Date().toISOString().split('T')[0], null, '0 KB']
      );
    }

    console.log('Successfully seeded system documents!');
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seedDocuments();
