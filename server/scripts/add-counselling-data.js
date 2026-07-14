require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    // 1. Add Physical Counselling to navigation_menus under Admissions
    const [admissions] = await connection.query('SELECT id FROM navigation_menus WHERE name = ? AND parent_id IS NULL', ['Admissions']);
    if (admissions.length > 0) {
      const parentId = admissions[0].id;
      const [existing] = await connection.query('SELECT * FROM navigation_menus WHERE parent_id = ? AND name = ?', [parentId, 'Physical Counselling']);
      if (existing.length === 0) {
        // get max sort_order
        const [maxSort] = await connection.query('SELECT MAX(sort_order) as maxOrder FROM navigation_menus WHERE parent_id = ?', [parentId]);
        const nextOrder = (maxSort[0].maxOrder || 0) + 1;
        await connection.execute(
          'INSERT INTO navigation_menus (parent_id, name, href, is_external, sort_order) VALUES (?, ?, ?, ?, ?)',
          [parentId, 'Physical Counselling', '/physical-counselling', 0, nextOrder]
        );
        console.log('Inserted Physical Counselling into navigation_menus.');
      } else {
        console.log('Physical Counselling already exists in navigation_menus.');
      }
    } else {
      console.log('Admissions menu not found.');
    }

    // 2. Add the two events
    const event1 = '2nd Counselling Reporting: 09/07/2026 to 11/07/2026 & 13/07/2026. | Timings: 10:00 AM to 05:00 PM | The institute will remain closed on Sunday.';
    const event2 = 'Physical counselling has started. [Physical Counselling](/physical-counselling)';

    const [e1] = await connection.query('SELECT * FROM events WHERE title = ?', [event1]);
    if (e1.length === 0) {
      await connection.execute('INSERT INTO events (title, date, status) VALUES (?, ?, ?)', [event1, 'July 2026', 'Active']);
      console.log('Inserted event 1.');
    }

    const [e2] = await connection.query('SELECT * FROM events WHERE title LIKE ?', ['%Physical counselling has started%']);
    if (e2.length === 0) {
      await connection.execute('INSERT INTO events (title, date, status) VALUES (?, ?, ?)', [event2, 'July 2026', 'Active']);
      console.log('Inserted event 2.');
    }

    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    connection.end();
  }
}

run();
