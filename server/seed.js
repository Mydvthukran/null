require('dotenv').config({ override: true });
const mysql = require('mysql2/promise');

const noticesData = [
  { title: 'B.Tech Prospectus 2025-26', category: 'Admission', date: '05 May 2025', priority: 'High', status: 'Active' },
  { title: 'Application Form (PKL)', category: 'Admission', date: '08 Aug 2025', priority: 'High', status: 'Active' },
  { title: 'B.Tech LEET Syllabus 2025-26', category: 'Academic', date: '07 May 2025', priority: 'Medium', status: 'Active' },
  { title: 'Academic Calendar 2025-26', category: 'Academic', date: 'Jan 2026', priority: 'High', status: 'Active' },
  { title: 'Fee Structure B.Tech 2025', category: 'Fee', date: 'Jul 2025', priority: 'Medium', status: 'Active' },
  { title: '12th Merit List', category: 'Admission', date: 'Aug 2025', priority: 'Medium', status: 'Active' },
  { title: 'JEE Merit/Selection List', category: 'Admission', date: 'Aug 2025', priority: 'Medium', status: 'Active' },
  { title: 'Notice PTM', category: 'Notice', date: 'Mar 2026', priority: 'Low', status: 'Active' },
  { title: 'Training Policy', category: 'Policy', date: 'Mar 2025', priority: 'Low', status: 'Active' },
  { title: 'AICTE Degree Pay Qualifications and Promotions', category: 'Regulation', date: 'Aug 2025', priority: 'Low', status: 'Active' },
  { title: 'Guest Faculty Engagement Guidelines', category: 'Guideline', date: '22 Dec 2022', priority: 'Low', status: 'Active' },
  { title: 'B.Tech LEET Information', category: 'Admission', date: 'Aug 2025', priority: 'Medium', status: 'Active' },
  { title: 'B.Tech LEET Key Dates 2025', category: 'Admission', date: 'Jun 2025', priority: 'High', status: 'Active' },
  { title: 'B.Tech Admission Document Set', category: 'Admission', date: 'Jul 2025', priority: 'Medium', status: 'Active' },
  { title: 'B.Tech Admission Document Set (Revised)', category: 'Admission', date: 'Jul 2025', priority: 'Medium', status: 'Active' },
  { title: 'Internal Academic Calendar for Even Semester Session : 2025-26', category: 'Academic', date: '18 Feb, 2026', priority: 'Medium', status: 'Active' },
  { title: 'External Practical Datesheet & Announcement', category: 'Academic', date: '2 Jan, 2026', priority: 'Medium', status: 'Active' },
  { title: 'Commencement of Classes for Even Semester B.Tech. All Branches (AIML , CS & RA)', category: 'Academic', date: '2 Jan, 2026', priority: 'High', status: 'Active' },
  { title: 'Commencement of B.TECH 1st Year Classes at SIET Panchkula', category: 'Academic', date: '20 Aug, 2025', priority: 'High', status: 'Active' },
  { title: 'Commencement of New Session Classes for Second and Third Year.', category: 'Academic', date: '14 Aug, 2025', priority: 'High', status: 'Active' },
  { title: 'B.Tech LEET Physical Counselling Meri List 2025', category: 'Admission', date: '7 Aug, 2025', priority: 'Medium', status: 'Active' },
  { title: 'Physical Institute Wise Counseling Merit List [12th based]', category: 'Admission', date: '5 Aug, 2025', priority: 'Medium', status: 'Active' }
];

const eventsData = [
  { title: 'Quiz Competition on Martyrdom Day', date: '19 Mar, 2026', status: 'Upcoming' },
  { title: 'IIT Ropar Workshop Notice', date: '20 Feb, 2026', status: 'Completed' },
  { title: 'Web Development Competition', date: '20 Mar, 2026', status: 'Upcoming' }
];

async function seedData() {
  console.log('Connecting to MySQL...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected to database. Seeding notices and events...');

    for (const notice of noticesData) {
      await connection.execute(
        'INSERT INTO notices (title, date, status) VALUES (?, ?, ?)',
        [notice.title, notice.date, notice.status]
      );
    }
    console.log(`Inserted ${noticesData.length} notices.`);

    for (const event of eventsData) {
      await connection.execute(
        'INSERT INTO events (title, date, status) VALUES (?, ?, ?)',
        [event.title, event.date, event.status]
      );
    }
    console.log(`Inserted ${eventsData.length} events.`);

    console.log('Seeding complete!');
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedData();
