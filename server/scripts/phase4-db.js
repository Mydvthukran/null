require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const navItems = [
  {
    name: 'Home',
    href: '/',
    submenu: null
  },
  {
    name: 'About Us',
    href: '/about',
    submenu: [
      { name: 'History', href: '/about/history' },
      { name: 'About Institute', href: '/about/about-institute' },
      { name: 'Vision & Mission', href: '/about/vision-mission' },
      { name: "Director - Principal's Desk", href: '/about/directors-message' },
      { name: 'Registrar\'s Desk', href: '/about/registrars-message' },
      { name: 'Unnat Bharat Abhiyan', href: 'https://unnatbharatabhiyan.gov.in/', external: true }
    ]
  },
  {
    name: 'Departments',
    href: '/departments',
    submenu: [
      {
        name: 'Computer Science & Engineering',
        href: '/departments/cse',
        submenu: [
          { name: 'About Department', href: '/departments/cse#about-department' },
          { name: 'Vision & Mission', href: '/departments/cse#vision-mission' },
          { name: 'Faculty', href: '/departments/cse#faculty' },
          { name: 'Time Table', href: '/departments/cse#time-table' }
        ]
      },
      {
        name: 'Computer Science & Engineering(AI & Machine Learning)',
        href: '/departments/ai-ml',
        submenu: [
          { name: 'About Department', href: '/departments/ai-ml#about-department' },
          { name: 'Vision & Mission', href: '/departments/ai-ml#vision-mission' },
          { name: 'Faculty', href: '/departments/ai-ml#faculty' },
          { name: 'Time Table', href: '/departments/ai-ml#time-table' }
        ]
      },
      {
        name: 'Computer Science & Engineering(Cyber Security)',
        href: '/departments/cyber-security',
        submenu: [
          { name: 'About Department', href: '/departments/cyber-security#about-department' },
          { name: 'Vision & Mission', href: '/departments/cyber-security#vision-mission' },
          { name: 'Faculty', href: '/departments/cyber-security#faculty' },
          { name: 'Time Table', href: '/departments/cyber-security#time-table' }
        ]
      },
      {
        name: 'Robotics & Automation',
        href: '/departments/robotics',
        submenu: [
          { name: 'About Department', href: '/departments/robotics#about-department' },
          { name: 'Vision & Mission', href: '/departments/robotics#vision-mission' },
          { name: 'Faculty', href: '/departments/robotics#faculty' },
          { name: 'Time Table', href: '/departments/robotics#time-table' }
        ]
      },
      {
        name: 'Electrical Engineering',
        href: '/departments/electrical-engineering',
        submenu: [
          { name: 'About Department', href: '/departments/electrical-engineering#about-department' },
          { name: 'Vision & Mission', href: '/departments/electrical-engineering#vision-mission' },
          { name: 'Faculty', href: '/departments/electrical-engineering#faculty' },
          { name: 'Time Table', href: '/departments/electrical-engineering#time-table' }
        ]
      },
      {
        name: 'Electronics Engineering (VLSI Design)',
        href: '/departments/electronics-vlsi',
        submenu: [
          { name: 'About Department', href: '/departments/electronics-vlsi#about-department' },
          { name: 'Vision & Mission', href: '/departments/electronics-vlsi#vision-mission' },
          { name: 'Faculty', href: '/departments/electronics-vlsi#faculty' },
          { name: 'Time Table', href: '/departments/electronics-vlsi#time-table' }
        ]
      }
    ]
  },
  {
    name: 'Student',
    href: '/academics',
    submenu: [
      { name: 'Academic Calendar', href: '/academics/academic-calendar' },
      { name: 'Syllabus', href: '/academics/syllabus' },
      { name: 'Query Form', href: '/admission-form' },
      { name: 'Admission Prospectus', href: '/academics/admission-prospectus' },
      { name: 'Pay Fees Online', href: '/pay-fees-online' },
      { name: 'Exam Schedule', href: '/academics/exam-schedule' },
      { name: 'Grievance Portal', href: 'https://grievance.sietpanchkula.ac.in/', external: true },
      { name: 'Code of Conduct', href: '/academics/code-of-conduct' },
      { name: 'Anti-Ragging', href: '/academics/anti-ragging' },
      { name: 'Clubs', href: '/life-at-siet/clubs' }
    ]
  },
  {
    name: 'Facilities',
    href: '/facilities',
    submenu: [
      { name: 'Infrastructure', href: '/facilities/infrastructure' },
      { name: 'Library', href: '/facilities/library' },
      { name: 'Hostel', href: '/facilities/hostels' },
      { name: 'Sports', href: '/facilities/sports' },
      { name: 'Smart Classrooms', href: '/facilities/smart-classrooms' },
      { name: 'Laboratories', href: '/facilities/laboratories' },
      { name: 'Cafeteria', href: '/facilities/cafeteria' },
      { name: 'Healthcare', href: '/facilities/healthcare' },
      { name: 'Security', href: '/facilities/security' }
    ]
  },
  {
    name: 'Training & Placements',
    href: 'https://tpo.sietpanchkula.ac.in/',
    external: true,
    submenu: null
  },
  {
    name: 'Alumni',
    href: '/alumni',
    submenu: [
      { name: 'Alumni Directory', href: '/alumni/alumni-directory' },
      { name: 'Alumni Registration', href: '/alumni/alumni-registration' },
      { name: 'Alumni Events', href: '/alumni/alumni-events' }
    ]
  },
  {
    name: 'Life @ SIET',
    href: '/life-at-siet',
    submenu: [
      { name: 'Life @ SIET Overview', href: '/life-at-siet' },
      { name: 'Events', href: '/events' },
      { name: 'Student Helpline', href: '/student-helpline' },
      { name: 'Top-Level Sections', href: '/top-level-sections' },
      { name: 'Content Differences', href: '/content-differences' },
      { name: 'Clubs', href: '/life-at-siet/clubs' }
    ]
  },
  {
    name: 'Admissions',
    href: '/admission-helpline',
    submenu: [
      { name: 'Admission Helpline', href: '/admission-helpline' },
      { name: 'Admission Prospectus', href: '/academics/admission-prospectus' },
      { name: 'Admission Documents', href: '/admission-documents' },
      { name: 'Pay Fees Online', href: '/pay-fees-online' }
    ]
  }
];

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'siet_db',
};

async function insertMenuRecursive(connection, items, parentId = null) {
  let order = 1;
  for (const item of items) {
    const isExternal = item.external ? 1 : 0;
    const [result] = await connection.execute(
      'INSERT INTO navigation_menus (parent_id, name, href, is_external, sort_order) VALUES (?, ?, ?, ?, ?)',
      [parentId, item.name, item.href || '', isExternal, order]
    );
    const newId = result.insertId;
    
    if (item.submenu && Array.isArray(item.submenu) && item.submenu.length > 0) {
      await insertMenuRecursive(connection, item.submenu, newId);
    }
    order++;
  }
}

async function runMigration() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    console.log('Creating navigation_menus table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS navigation_menus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parent_id INT DEFAULT NULL,
        name VARCHAR(255) NOT NULL,
        href VARCHAR(500) DEFAULT '',
        is_external TINYINT(1) DEFAULT 0,
        sort_order INT DEFAULT 0,
        FOREIGN KEY (parent_id) REFERENCES navigation_menus(id) ON DELETE CASCADE
      )
    `);

    // Check if empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM navigation_menus');
    if (rows[0].count === 0) {
      console.log('Inserting default navigation data...');
      await insertMenuRecursive(connection, navItems);
    } else {
      console.log('navigation_menus table already has data. Skipping insert.');
    }

    console.log('Phase 4 DB Migration Complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
