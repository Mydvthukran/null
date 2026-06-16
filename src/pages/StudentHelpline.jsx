import React from 'react';

const StudentHelpline = () => {
  return (
    <section className="section" aria-label="Student helpline page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Student Helpline</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Dedicated support flow for student queries, grievances, and urgent assistance.</p>
        </div>

        <div className="submenu-layout">
          <main className="submenu-main">
            <div className="submenu-content-card">
              <h2 className="submenu-section-title">How Support Works</h2>
              <ol className="submenu-point-list">
                <li>Raise your issue using official channels listed below.</li>
                <li>Include your name, roll number, branch, semester, and issue summary.</li>
                <li>For academic urgency, include deadline date in the subject line.</li>
                <li>Track progress using the acknowledgement from department office.</li>
              </ol>
            </div>

            <div className="submenu-content-card" style={{ marginTop: '1rem' }}>
              <h2 className="submenu-section-title">Student Support Channels</h2>
              <p className="submenu-paragraph">General Helpdesk Email: <a href="mailto:sietpkl@gmail.com">sietpkl@gmail.com</a></p>
              <p className="submenu-paragraph">Institute Contact: <a href="tel:01722979887">0172-2979887</a></p>
              <p className="submenu-paragraph">For grievance handling, use the Grievance Redressal route once enabled in your section menu.</p>
            </div>
          </main>

          <aside className="submenu-aside">
            <div className="submenu-aside-card">
              <h3>Emergency Guidance</h3>
              <ul className="submenu-mini-list">
                <li>Hostel and safety concerns should be reported immediately.</li>
                <li>Do not share personal credentials in complaint messages.</li>
                <li>Keep screenshot evidence for exam or portal issues.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default StudentHelpline;
