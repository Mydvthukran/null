import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Jobs = () => {
  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="section-header">
                  <h1 className="section-title">Job Vacancies &amp; Careers</h1>
                  <div className="title-underline"></div>
                </div>

                <div className="submenu-prose">
                  <ScrollReveal>
                    {/* Announcement Banner */}
                    <div
                      style={{
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #86efac',
                        borderLeft: '5px solid #16a34a',
                        borderRadius: '8px',
                        padding: '1.25rem 1.5rem',
                        marginBottom: '2rem',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.12)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>📢</span>
                        <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.2rem', fontWeight: 'bold' }}>
                          Recruitment Notice 2026
                        </h3>
                      </div>
                      <p style={{ margin: 0, color: '#166534', fontSize: '1.05rem', fontWeight: '600', lineHeight: '1.6' }}>
                        Applications are invited for various positions at State Institute of Engineering &amp; Technology (SIET), Panchkula. Please review the official vacancy advertisement below for details regarding eligibility, qualification criteria, and application procedure.
                      </p>
                    </div>

                    {/* Visiting Faculty Application Form Card */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #2563eb',
                        borderRadius: '12px',
                        padding: '1.75rem 1.5rem',
                        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.1)',
                        marginBottom: '2rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>📄</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <h2 style={{ color: '#0a192f', fontSize: '1.35rem', fontWeight: '700', margin: 0 }}>
                              Application Form for Visiting Faculty
                            </h2>
                            <span style={{ backgroundColor: '#16a34a', color: '#ffffff', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>UPDATED 2026</span>
                          </div>
                          <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0.2rem 0 0' }}>
                            Download or view the official updated application form for engagement of Visiting Faculty at SIET Panchkula.
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                        <a
                          href="/Application%20Form%20Visiting%20Faculty.pdf?v=20260808"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', fontWeight: 'bold', background: '#2563eb', borderColor: '#2563eb' }}
                        >
                          <span>Open PDF in New Tab</span> ↗
                        </a>
                        <a
                          href="/Application%20Form%20Visiting%20Faculty.pdf?v=20260808"
                          download="Application_Form_Visiting_Faculty_SIET.pdf"
                          className="btn btn-secondary"
                          style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', color: '#0a192f', borderColor: '#0a192f', fontWeight: 'bold' }}
                        >
                          <span>Download Application Form (PDF)</span> 📥
                        </a>
                      </div>

                      {/* Embedded PDF Viewer */}
                      <div style={{ marginTop: '1.25rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                        <iframe
                          src="/Application%20Form%20Visiting%20Faculty.pdf?v=20260808"
                          title="Application Form Visiting Faculty SIET Panchkula"
                          style={{ width: '100%', height: '600px', border: 'none', display: 'block' }}
                        />
                      </div>
                    </div>

                    {/* Vacancy Image Flyer Display */}
                    <div
                      className="vacancy-flyer-card"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid rgba(197, 160, 89, 0.4)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        boxShadow: '0 8px 24px rgba(10, 25, 47, 0.08)',
                        marginBottom: '2rem'
                      }}
                    >
                      <h2 style={{ color: '#0a192f', fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.2rem' }}>
                        Official Vacancy Advertisement
                      </h2>

                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <img
                          src="/vacancy.jpeg"
                          alt="Job Vacancy Notice SIET Panchkula"
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '85vh',
                            borderRadius: '8px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                          href="/vacancy.jpeg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', fontWeight: 'bold' }}
                        >
                          <span>Open Image Fullscreen</span> ↗
                        </a>
                        <a
                          href="/vacancy.jpeg"
                          download="SIET_Panchkula_Vacancy.jpeg"
                          className="btn btn-secondary"
                          style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', color: '#0a192f', borderColor: '#0a192f', fontWeight: 'bold' }}
                        >
                          <span>Download Vacancy Flyer</span> 📥
                        </a>
                      </div>
                    </div>

                    {/* Application Instructions & Contact */}
                    <div
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                      }}
                    >
                      <h3 style={{ color: '#0a192f', marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700' }}>
                        Important Guidelines for Applicants
                      </h3>
                      <ul style={{ color: '#334155', lineHeight: '1.7', paddingLeft: '1.2rem', margin: 0 }}>
                        <li style={{ marginBottom: '0.6rem' }}>
                          Interested candidates must ensure they satisfy the eligibility criteria as specified in the notice before applying.
                        </li>
                        <li style={{ marginBottom: '0.6rem' }}>
                          All completed applications along with relevant self-attested documents must reach the institute as per the prescribed deadline.
                        </li>
                      </ul>
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

export default Jobs;
