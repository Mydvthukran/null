import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import doc1 from '../assets/new-assets/student/addmission document/Documents_SIET B.Tech. Admissions 2026.pdf';
import doc2 from '../assets/new-assets/student/addmission document/Miscllaneous Documents.pdf';
import doc3 from '../assets/new-assets/student/addmission document/Fee Structure 2026-27.pdf';
import doc4 from '../assets/new-assets/student/addmission document/SIET B.Tech. Admission Form 2026-27.pdf';
import doc5 from '../assets/new-assets/student/addmission document/SIET Fee Refund Performa 2026-27.pdf';

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
                <h2 className="submenu-section-title" style={{ marginBottom: '1rem' }}>Fee Structure</h2>
                <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginBottom: '1rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f0e6d2', color: '#0a192f' }}>
                        <th style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>S.No.</th>
                        <th style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Component of Fees</th>
                        <th style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>For B.Tech. 1st Year/ B. Tech Lateral Entry</th>
                        <th style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>For B.Tech. 2nd, 3rd and 4th Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>1</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Tuition fee (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>30000</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>30000</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>2</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Students Fund (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>3000</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>3000</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>3</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Seminar/Conference etc. (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>500</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>500</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>4</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Student Aid Fund (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>500</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>500</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>5</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Lab. Development, Internet Placement/Counselling, Training (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>2500</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>2500</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>6</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Examination Fee (Per Annum)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>4000</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>4000</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>7</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Sports, Youth Welfare, Magazine, Medical, NSS, Id-Card etc. (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>2000</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>2000</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>8</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>University Registration Fees (One Time)/Continuation Fees (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>1500</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>800</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>9</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>University Development Fess (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>1600</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>1600</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>10</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>University Establishment Charge (PA)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>800</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>800</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>11</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Caution Money (One Time)</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>500</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>0</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>12</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}><strong>*Digital Record Keeping (Vide Endst. No. Regn./R.-I/26/ 3454-3673 dated: 20-04-2026) Copy Attached</strong></td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}><strong>300</strong></td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}><strong>0</strong></td>
                      </tr>
                      <tr style={{ fontWeight: 'bold', backgroundColor: '#fcfaf2' }}>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}></td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>Total Fees</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>47200/-</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #c5a059' }}>45700/-</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ textAlign: 'left', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Note:</strong></p>
                    <p style={{ margin: '0 0 0.2rem 0', paddingLeft: '1rem' }}>For B.Tech. 1st year, B.Tech. Lateral Entry: 1st Instalment: Rs. 32,200/-, 2nd Installment: Rs. 15,000/-</p>
                    <p style={{ margin: '0', paddingLeft: '1rem' }}>For B.Tech. 2nd, 3rd and 4th year: 1st Instalment: Rs. 30,700/-, 2nd Installment: Rs. 15,000/-</p>
                  </div>
                </div>

                <h2 className="submenu-section-title" style={{ marginBottom: '1rem', marginTop: '2rem' }}>Admission Documents</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', width: '100%', maxWidth: '600px' }}>
                  <a href={doc1} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>Documents SIET B.Tech Admission</span>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                  </a>
                  <a href={doc2} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>Miscellaneous Documents</span>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                  </a>
                  <a href={doc3} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>Fee Structure 2026-27</span>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                  </a>
                  <a href={doc4} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>Application Form for On-Spot Counselling 2026-27</span>
                    <span style={{ fontSize: '1.2rem' }}>📄</span>
                  </a>
                  <a href={doc5} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span>SIET Fee Refund Performa 2026-27</span>
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
