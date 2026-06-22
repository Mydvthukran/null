import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import doc1 from '../assets/new-assets/student/addmission document/Documents_SIET B.Tech. Admissions 2026.pdf';
import doc2 from '../assets/new-assets/student/addmission document/Miscllaneous Documents.pdf';

const AdmissionDocuments = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="submenu-page">

      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
                <h2 className="submenu-section-title" style={{ marginBottom: '1rem' }}>Admission Documents</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', width: '100%', maxWidth: '600px' }}>
                  <a href={doc1} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>Documents SIET B.Tech Admission</span>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                  </a>
                  <a href={doc2} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>Miscellaneous Documents</span>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                  </a>
                </div>
                <Link to="/" className="gradient-button" style={{ marginTop: '3rem' }}>Return to Home</Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionDocuments;
