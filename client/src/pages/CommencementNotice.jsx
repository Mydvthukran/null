import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const CommencementNotice = () => {
  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <div className="submenu-content-card">
                <div className="section-header">
                  <h1 className="section-title" style={{ fontSize: '2rem' }}>NOTICE</h1>
                  <div className="title-underline"></div>
                </div>

                <div className="submenu-prose">
                  <ScrollReveal>
                    <div style={{
                      backgroundColor: '#fcfaf2',
                      border: '1px solid #c5a059',
                      borderRadius: '8px',
                      padding: '2rem',
                      boxShadow: '0 4px 12px rgba(10, 25, 47, 0.05)',
                      color: '#0a192f',
                      lineHeight: '1.8',
                      fontSize: '1.1rem'
                    }}>
                      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#c5a059', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Commencement of B.Tech. 1st Year Regular Classes
                      </h2>
                      
                      <p style={{ marginBottom: '1.2rem' }}>
                        This is to inform all newly admitted B.Tech. 1st Year students that the Inaugural Induction Program will commence on <strong>3 August 2026</strong> at the Auditorium, PWD Rest House, Sector 1, Panchkula.
                      </p>

                      <p style={{ marginBottom: '1.2rem' }}>
                        All students must accompany their parents/guardians on <strong>3 August 2026</strong> for the Inaugural Induction Program.
                      </p>

                      <p style={{ marginBottom: '1.2rem' }}>
                        From <strong>4 August 2026</strong> onwards, regular classes along with the 3-week Induction Program will be conducted at the SIET Panchkula Campus. The induction program will be held for 2–3 hours each day.
                      </p>

                      <div style={{ margin: '1.5rem 0', padding: '1rem', backgroundColor: '#fff', borderRadius: '6px', borderLeft: '4px solid #c5a059' }}>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontWeight: 'bold' }}>
                          <li style={{ marginBottom: '0.5rem' }}>Week 1: Academic Induction</li>
                          <li style={{ marginBottom: '0.5rem' }}>Week 2: Industrial Induction</li>
                          <li>Week 3: Motivational Sessions</li>
                        </ul>
                      </div>

                      <p style={{ marginBottom: '1.2rem', fontStyle: 'italic', fontWeight: 'bold', color: '#e53e3e' }}>
                        *Attendance in the Induction Program as well as regular classes is mandatory for all admitted students.*
                      </p>

                      <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                        *All students are instructed to attend the induction program and classes regularly from the very first day.*
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommencementNotice;
