require('dotenv').config({ override: true });
const mysql = require('mysql2/promise');

const noticesData = [
  { title: 'Office Order - Student Dress Code Guidelines', category: 'Notice', date: '02 Sep 2026', priority: 'High', status: 'Active', file_path: '/Office Order Dress Code.pdf' },
  { title: 'Anti Ragging squad for the session 2026-27', category: 'Notice', date: '25 Aug 2026', priority: 'High', status: 'Active', file_path: '/Anti Ragging squad for the session 2026-27.pdf' },
  { title: 'Dept. Incharges SIET Panchkula', category: 'Notice', date: '25 Aug 2026', priority: 'High', status: 'Active', file_path: '/Dept. Incharges SIET Panchkula.pdf' },
  { title: 'Notice Regarding Outsiders and parking', category: 'Notice', date: '20 Aug 2026', priority: 'High', status: 'Active', file_path: '/parkingorder.pdf' },
  { title: 'Smart India Hackathon (SIH) 2026 – Registration Open!', category: 'Event', date: '06 Aug 2026', priority: 'High', status: 'Active', file_path: '/sih-2026' },
  { title: 'Application Form for Visiting Faculty (Updated)', category: 'Notice', date: '08 Aug 2026', priority: 'High', status: 'Active', file_path: '/Application%20Form%20Visiting%20Faculty.pdf?v=20260808' },
  { title: 'On Spot Counselling will be from 5/08/2026', category: 'Notice', date: '04 Aug 2026', priority: 'High', status: 'Active', file_path: '/onspotcounselling.jpeg' },
  { title: 'Job Vacancy Notice 2026', category: 'Notice', date: '03 Aug 2026', priority: 'High', status: 'Active', file_path: '/vacancy.jpeg' },
  { title: 'Hostel Allotment List 2026-27', category: 'Event', date: '31 Jul 2026', priority: 'High', status: 'Active', file_path: '/Hostel Allotment List new.pdf' },
  { title: 'Induction Program Schedule 2026-27', category: 'Event', date: '30 Jul 2026', priority: 'High', status: 'Active' },
  { title: 'Diploma (Non OCET) Merit List', category: 'Admission', date: '29 Jul 2026', priority: 'High', status: 'Active', file_path: '/Merit List Diploma.pdf' },
  { title: 'OCET Merit / Selection List', category: 'Admission', date: '29 Jul 2026', priority: 'High', status: 'Active', file_path: '/Merit List OCET.pdf' },
  { title: 'Diploma (Non OCET) / 10+2 & B.Sc. Physical Reporting', category: 'Event', date: '28 Jul 2026', priority: 'High', status: 'Active' },
  { title: 'Induction Program for Freshers', category: 'Event', date: '23 Jul 2026', priority: 'High', status: 'Active', file_path: '/order-168.jpeg' },
  { title: 'B.Tech. Physical Counselling 2026-27', category: 'Event', date: '18 Jul 2026', priority: 'High', status: 'Active' },
  { title: 'College Reopening Notice', category: 'Event', date: '17 Jul 2026', priority: 'High', status: 'Active' },
  { title: 'B.Tech Prospectus 2025-26', category: 'Admission', date: '05 May 2025', priority: 'High', status: 'Active' },
  { title: 'Application Form (PKL)', category: 'Admission', date: '08 Aug 2025', priority: 'High', status: 'Active' },
  { title: 'B.Tech LEET Syllabus 2025-26', category: 'Academic', date: '07 May 2025', priority: 'Medium', status: 'Active' },
  { title: 'Academic Calendar 2025-26', category: 'Academic', date: 'Jan 2026', priority: 'High', status: 'Active' },
  { title: 'Fee Structure B.Tech 2025', category: 'Fee', date: 'Jul 2025', priority: 'Medium', status: 'Active' },
  { title: 'Notice PTM', category: 'Notice', date: 'Mar 2026', priority: 'Low', status: 'Active' },
  { title: 'Training Policy', category: 'Policy', date: 'Mar 2025', priority: 'Low', status: 'Active' },
  { title: 'AICTE Degree Pay Qualifications and Promotions', category: 'Regulation', date: 'Aug 2025', priority: 'Low', status: 'Active' },
  { title: 'Guest Faculty Engagement Guidelines', category: 'Guideline', date: '22 Dec 2022', priority: 'Low', status: 'Active' },
  { title: 'B.Tech LEET Information', category: 'Admission', date: 'Aug 2025', priority: 'Medium', status: 'Active' },
  { title: 'B.Tech LEET Key Dates 2025', category: 'Admission', date: 'Jun 2025', priority: 'High', status: 'Active' },
  { title: 'B.Tech Admission Document Set', category: 'Admission', date: 'Jul 2025', priority: 'Medium', status: 'Active' },
  { title: 'B.Tech Admission Document Set (Revised)', category: 'Admission', date: 'Jul 2025', priority: 'Medium', status: 'Active' }
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
        'INSERT INTO notices (title, date, status, category, file_path) VALUES (?, ?, ?, ?, ?)',
        [notice.title, notice.date, notice.status, notice.category || 'Notice', notice.file_path || null]
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
