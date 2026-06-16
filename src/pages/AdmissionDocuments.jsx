import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

const AdmissionDocuments = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="submenu-page">
      <section className="section submenu-hero">
        <div className="container">
          <div className="submenu-hero-surface">
            <div className="submenu-hero-grid no-visual">
              <div className="submenu-hero-copy">
                <p className="submenu-kicker">ADMISSIONS</p>
                <h1 className="submenu-title">Admission Documents</h1>
                <div className="title-underline" style={{ marginTop: '0.6rem' }}></div>
                <p className="submenu-subtitle">Official documents required for admission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
                <h2 className="submenu-section-title" style={{ marginBottom: '1rem' }}>Admission Documents</h2>
                <p className="submenu-paragraph" style={{ fontSize: '1.2rem', color: 'var(--ink-600)' }}>
                  This page will be updated soon with the required admission documents.
                </p>
                <Link to="/" className="gradient-button" style={{ marginTop: '2rem' }}>Return to Home</Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionDocuments;
