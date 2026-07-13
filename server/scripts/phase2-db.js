require('dotenv').config({ path: '../.env', override: true });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const facultyData = [
  {
    slug: 'dr-milap-sharma',
    name: 'Dr. Milap Sharma',
    designation: 'Assistant Professor',
    qualification: 'Ph.D., M.Tech., B.Tech.',
    email: 'milapsharma25@gmail.com',
    areaOfInterest: 'Computer Aided Design, Sensors, Production & Industrial Engineering, Ergonomics, Research Methodology',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682368',
    image: '/assets/new-assets/depatment/facalities/teachers/MILAP.jpg',
    departments: ['robotics', 'electronics-vlsi']
  },
  {
    slug: 'mrs-ankita-jiwan',
    name: 'Mrs. Ankita Jiwan',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'jiwan.soloman.ankita@gmail.com',
    areaOfInterest: 'Object Oriented Programming, Database System, C, C++, Python',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682850',
    image: '/assets/new-assets/depatment/facalities/teachers/ANKITA.jpg',
    departments: ['cse']
  },
  {
    slug: 'dr-divya-garg',
    name: 'Dr. Divya Garg',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (CSE), M.Tech. (CSE), B.Tech. (CSE)',
    email: 'divya29garg@gmail.com',
    areaOfInterest: 'Affective Computing, Artificial Intelligence, Human Computer Interaction',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682325',
    image: '/assets/new-assets/depatment/facalities/teachers/DIVYAGARG.jpg',
    departments: ['ai-ml', 'cse']
  },
  {
    slug: 'mrs-priyanka-diwan-goyal',
    name: 'Mrs. Priyanka Diwan Goyal',
    designation: 'Assistant Professor',
    qualification: 'M.Tech. (CSE), B.Tech. (CSE)',
    email: 'diwan.priyanka@gmail.com',
    areaOfInterest: 'C, C++, VB, Network Security, Software Engineering, Wireless Sensor Networks, Artificial Intelligence',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682537',
    image: '/assets/new-assets/depatment/facalities/teachers/priyanka.jpg',
    departments: ['cyber-security', 'cse']
  },
  {
    slug: 'ms-luxmi-sharma',
    name: 'Ms. Luxmi Sharma',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'luxmisharma44@gmail.com',
    areaOfInterest: 'Advance Database Management System, Python, Data Analytics, Data Structure and Algorithm, MATLAB, Wireless Sensor Network',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682335',
    image: '/assets/new-assets/depatment/facalities/teachers/LUXMI.jpg',
    departments: ['cse', 'ai-ml']
  },
  {
    slug: 'ms-nivedita-kapoor',
    name: 'Ms. Nivedita Kapoor',
    designation: 'Assistant Professor',
    qualification: 'M.A. (English), M.Phil.',
    email: 'nivedita.kapoor03@gmail.com',
    areaOfInterest: 'English Literature, Language and Linguistics, Translation Studies, Regional and Folk Literature, Indian Aesthetics and Indian Knowledge System, Soft Skills and Personality Development',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/683757',
    image: '/assets/new-assets/depatment/facalities/teachers/NAVNEETA.jpg',
    departments: ['cse', 'ai-ml', 'cyber-security', 'robotics', 'electrical-engineering', 'electronics-vlsi']
  },
  {
    slug: 'ms-reena-dhull',
    name: 'Ms. Reena Dhull',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'reenakdhull@gmail.com',
    areaOfInterest: 'Power System Protection, Power System Stability, Automatic Generation Control using Fuzzy Logic Controller, Power Electronics and Drives, Electrical Vehicles',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/681915',
    image: '/assets/new-assets/depatment/facalities/teachers/REENADULL.jpg',
    departments: ['electrical-engineering', 'electronics-vlsi']
  },
  {
    slug: 'dr-elam-siwach',
    name: 'Dr. Elam Siwach',
    designation: 'Assistant Professor',
    qualification: 'Ph.D., M.Sc., B.Sc., B.Ed.',
    email: 'elamsiwach@sietpanchkula.ac.in',
    areaOfInterest: 'Reliability Analysis, Mathematical Modeling of Industrial Machines, Mechanical Modeling, Laplace Transformation, Stochastic Process, Statistics',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682378',
    image: '/assets/new-assets/depatment/facalities/teachers/ELAM.jpg',
    departments: ['robotics', 'electrical-engineering']
  },
  {
    slug: 'ms-monika',
    name: 'Ms. Monika',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'monika.saini.393@gmail.com',
    areaOfInterest: 'C, C++, Python, Computer Networks, Network Security, Wireless Networks, Artificial Intelligence, Software Engineering',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682375',
    image: '/assets/new-assets/depatment/facalities/teachers/MONIKA.jpg',
    departments: ['cyber-security', 'cse']
  },
  {
    slug: 'er-tushar',
    name: 'Er. Tushar',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'tushar@sietpanchkula.ac.in',
    areaOfInterest: 'Cyber Security, Computer Networks, Ad Hoc Network, DBMS, Agile Software Development, Cloud Computing, Software Verification Validation and Testing',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682234',
    image: '/assets/new-assets/depatment/facalities/teachers/TUSHAR.jpg',
    departments: ['cyber-security']
  },
  {
    slug: 'ms-ritu-kadiyan',
    name: 'Ms. Ritu Kadiyan',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'ritukadiyan@sietpanchkula.ac.in',
    areaOfInterest: 'Computer Network, Python, Internet of Things, Computer Architecture, DBMS, Artificial Intelligence, Discrete Mathematics',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682303',
    image: '/assets/new-assets/depatment/facalities/teachers/RITU.jpg',
    departments: ['ai-ml', 'cse']
  },
  {
    slug: 'dr-divya-singla',
    name: 'Dr. Divya Singla',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (CSE), M.Tech. (CSE), B.Tech. (CSE)',
    email: 'drdivvyasingla@gmail.com',
    areaOfInterest: 'Software Engineering, Database Management System, Machine Learning, Artificial Intelligence',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682323',
    image: '/assets/new-assets/depatment/facalities/teachers/DIVYASINGLA (1).jpg',
    departments: ['ai-ml', 'cse']
  }
];

async function migrateFaculty() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Creating faculty table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(150) NOT NULL,
        designation VARCHAR(150),
        qualification VARCHAR(255),
        email VARCHAR(150),
        area_of_interest TEXT,
        vidwan_link VARCHAR(255),
        image_path VARCHAR(255)
      )
    `);

    console.log('Creating faculty_departments table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS faculty_departments (
        faculty_id INT NOT NULL,
        department_slug VARCHAR(100) NOT NULL,
        PRIMARY KEY (faculty_id, department_slug),
        FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE
      )
    `);

    // Ensure uploads/faculty exists
    const uploadsDir = path.join(__dirname, '..', 'uploads', 'faculty');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Insert data
    for (const member of facultyData) {
      // Check if exists
      const [rows] = await pool.query('SELECT id FROM faculty WHERE slug = ?', [member.slug]);
      let facultyId = null;

      if (rows.length === 0) {
        // Copy image from client/src to server/uploads
        let dbImagePath = null;
        if (member.image) {
          const originalPath = path.join(__dirname, '..', '..', 'client', 'src', member.image);
          if (fs.existsSync(originalPath)) {
            const ext = path.extname(originalPath);
            const newFilename = `${member.slug}${ext}`;
            const destPath = path.join(uploadsDir, newFilename);
            fs.copyFileSync(originalPath, destPath);
            dbImagePath = `/uploads/faculty/${newFilename}`;
          }
        }

        const [result] = await pool.query(
          'INSERT INTO faculty (slug, name, designation, qualification, email, area_of_interest, vidwan_link, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [member.slug, member.name, member.designation, member.qualification, member.email, member.areaOfInterest, member.vidwan, dbImagePath]
        );
        facultyId = result.insertId;
        console.log(`Inserted faculty: ${member.name}`);
      } else {
        facultyId = rows[0].id;
      }

      // Add departments
      if (facultyId) {
        for (const deptSlug of member.departments) {
          await pool.query('INSERT IGNORE INTO faculty_departments (faculty_id, department_slug) VALUES (?, ?)', [facultyId, deptSlug]);
        }
      }
    }

    console.log('Phase 2 Faculty DB Migration Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateFaculty();
