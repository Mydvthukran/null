import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import doc1 from '../assets/new-assets/student/addmission document/Documents_SIET B.Tech. Admissions 2026.pdf';
import doc3 from '../assets/new-assets/student/addmission document/Fee Structure 2026-27.pdf';
import doc4 from '../assets/new-assets/student/addmission document/SIET B.Tech. Admission Form 2026-27.pdf';
import updatedSchedulePdf from '../assets/new-assets/home/notices/Updated Schedule for Physical Counselling.pdf';

const PhysicalCounselling = () => {
  const [accepted, setAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showClosedNotice, setShowClosedNotice] = useState(false);

  const handleApplyNow = () => {
    if (!accepted) {
      setShowWarning(true);
      return;
    }
    setShowClosedNotice(true);
  };

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="section-header">
                  <h1 className="section-title">Physical Counselling</h1>
                  <div className="title-underline"></div>
                </div>

                <div className="submenu-prose">
                  <ScrollReveal>
                    {/* On the Spot Admission Announcement Banner */}
                    <div
                      style={{
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #86efac',
                        borderLeft: '5px solid #16a34a',
                        borderRadius: '8px',
                        padding: '1.25rem 1.5rem',
                        marginBottom: '1.5rem',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.12)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>⚡</span>
                        <h3 style={{ margin: 0, color: '#14532d', fontSize: '1.15rem', fontWeight: 'bold' }}>
                          On the Spot Admission Announcement
                        </h3>
                      </div>
                      <p style={{ margin: 0, color: '#166534', fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.6' }}>
                        *On the Spot Admission on first come first serve basis will be held from 05.08.2026 (10 am onwards) for B.Tech. 1st Year and B.Tech. 2nd Year (LEET) up to final cutoff date of the admissions, i.e., 14.08.2026.
                      </p>
                    </div>

                    {/* Highlighted Announcement Banner */}
                    <div
                      style={{
                        backgroundColor: '#fff9e6',
                        border: '1px solid #f6e05e',
                        borderLeft: '5px solid #d69e2e',
                        borderRadius: '8px',
                        padding: '1.25rem 1.5rem',
                        marginBottom: '1.5rem',
                        boxShadow: '0 4px 12px rgba(214, 158, 46, 0.12)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>📢</span>
                        <h3 style={{ margin: 0, color: '#744210', fontSize: '1.15rem', fontWeight: 'bold' }}>
                          Physical Reporting Announcement
                        </h3>
                      </div>
                      <p style={{ margin: 0, color: '#975a16', fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.5' }}>
                        Diploma (Non OCET) / 10+2 (with Mathematics as a compulsory subject) &amp; B.Sc. Percentage : Physical Reporting on 04/08/2026
                      </p>
                      <a
                        href={updatedSchedulePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', padding: '0.55rem 1.1rem', fontSize: '0.95rem', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        <span>View Updated On Spot Counselling Schedule (PDF)</span>
                        <span>📄</span>
                      </a>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#f3f8ff',
                        border: '1px solid #b8d4f5',
                        borderLeft: '5px solid #0a66c2',
                        borderRadius: '8px',
                        padding: '1.2rem 1.5rem',
                        marginBottom: '1rem',
                        boxShadow: '0 4px 12px rgba(10, 102, 194, 0.08)'
                      }}
                    >
                      <h3 style={{ margin: '0 0 0.5rem', color: '#0a4f91', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        Merit List — Diploma (Non OCET)
                      </h3>
                      <p style={{ margin: 0, color: '#173f67', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5' }}>
                        View the published merit list for Diploma (Non OCET) admissions.
                      </p>
                      <a href="/Merit List Diploma.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '0.85rem', padding: '0.55rem 1rem', textDecoration: 'none' }}>
                        View Merit List
                      </a>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#f3f8ff',
                        border: '1px solid #b8d4f5',
                        borderLeft: '5px solid #0a66c2',
                        borderRadius: '8px',
                        padding: '1.2rem 1.5rem',
                        marginBottom: '1rem',
                        boxShadow: '0 4px 12px rgba(10, 102, 194, 0.08)'
                      }}
                    >
                      <h3 style={{ margin: '0 0 0.5rem', color: '#0a4f91', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        Merit List — OCET
                      </h3>
                      <p style={{ margin: 0, color: '#173f67', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5' }}>
                        View the published merit list for OCET candidates.
                      </p>
                      <a href="/Merit List OCET.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '0.85rem', padding: '0.55rem 1rem', textDecoration: 'none' }}>
                        View Merit List
                      </a>
                    </div>

                    {/* Notice Banner - Closed Form */}
                    <div style={{
                      backgroundColor: '#fff5f5',
                      border: '1px solid #feb2b2',
                      borderLeft: '5px solid #e53e3e',
                      borderRadius: '8px',
                      padding: '1.25rem 1.5rem',
                      marginBottom: '2rem',
                      boxShadow: '0 4px 12px rgba(229, 62, 62, 0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.3rem' }}>🚫</span>
                        <h3 style={{ margin: 0, color: '#9b2c2c', fontSize: '1.15rem', fontWeight: 'bold' }}>
                          This form is no longer accepting responses
                        </h3>
                      </div>
                      <p style={{ margin: 0, color: '#c53030', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5' }}>
                        Physical Counselling deadline was 28/07/2026 and this form is no longer accepting responses. Merit list of selected students will be displayed tomorrow for LEET Students, i.e. 29/07/2026.
                      </p>
                    </div>

                    {showClosedNotice ? (
                      /* Closed Form Notice Screen */
                      <div style={{
                        textAlign: 'center',
                        padding: '3rem 2rem',
                        backgroundColor: '#ffffff',
                        border: '2px solid #feb2b2',
                        borderRadius: '12px',
                        boxShadow: '0 8px 30px rgba(229, 62, 62, 0.12)',
                        marginBottom: '2rem'
                      }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          backgroundColor: '#fff5f5',
                          border: '3px solid #feb2b2',
                          color: '#e53e3e',
                          fontSize: '2.2rem',
                          marginBottom: '1.5rem'
                        }}>
                          🚫
                        </div>

                        <h2 style={{ fontSize: '1.8rem', color: '#9b2c2c', marginBottom: '0.8rem', fontWeight: '800' }}>
                          This Form Is No Longer Accepting Responses
                        </h2>

                        <div style={{
                          backgroundColor: '#fff5f5',
                          border: '1px solid #fbb6ce',
                          borderRadius: '8px',
                          padding: '1.5rem 2rem',
                          maxWidth: '720px',
                          margin: '0 auto 2rem auto'
                        }}>
                          <p style={{ color: '#742a2a', fontSize: '1.15rem', fontWeight: '700', lineHeight: '1.6', margin: 0 }}>
                            Physical Counselling deadline was 28/07/2026 and this form is no longer accepting responses. Merit list of selected students will be displayed tomorrow for LEET Students, i.e. 29/07/2026.
                          </p>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                          gap: '1.2rem',
                          maxWidth: '640px',
                          margin: '0 auto 2.5rem auto'
                        }}>
                          <div style={{ padding: '1.2rem', backgroundColor: '#fff5f5', borderRadius: '8px', border: '1px solid #feb2b2' }}>
                            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9b2c2c', fontWeight: 'bold' }}>
                              Form Deadline
                            </div>
                            <div style={{ fontSize: '1.2rem', color: '#e53e3e', fontWeight: '800', marginTop: '0.3rem' }}>
                              28/07/2026 (Passed)
                            </div>
                          </div>
                          <a
                            href={updatedSchedulePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '1.2rem',
                              backgroundColor: '#f0f7ff',
                              borderRadius: '8px',
                              border: '1px solid #b8d4f5',
                              textDecoration: 'none',
                              display: 'block'
                            }}
                          >
                            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0a4f91', fontWeight: 'bold' }}>
                              Counselling Schedule
                            </div>
                            <div style={{ fontSize: '1.05rem', color: '#0a66c2', fontWeight: '800', marginTop: '0.3rem', textDecoration: 'underline' }}>
                              Read the Updated On Spot counselling schedule 📄
                            </div>
                          </a>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => setShowClosedNotice(false)}
                            className="btn btn-secondary"
                            style={{ padding: '0.75rem 1.75rem', color: '#0a192f', borderColor: '#0a192f', fontWeight: 'bold' }}
                          >
                            View Documents &amp; Information
                          </button>
                          <a
                            href={updatedSchedulePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            Read the Updated On Spot counselling schedule
                          </a>
                          <a
                            href="mailto:admissions@sietpanchkula.ac.in"
                            className="btn btn-secondary"
                            style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', color: '#0a66c2', borderColor: '#0a66c2' }}
                          >
                            Contact Admissions
                          </a>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="terms-content" style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '2rem' }}>
                          <p style={{ marginBottom: '1rem' }}>By submitting this form, you confirm that all information provided is accurate and complete.</p>

                          <p style={{ marginBottom: '1rem' }}>Email your generated PDF to the admissions email address: <a href="mailto:admissions@sietpanchkula.ac.in" style={{ color: '#c5a059', fontWeight: 'bold' }}>admissions@sietpanchkula.ac.in</a>, along with your Class 10 DMC, Class 12 DMC or Diploma Certificate, and your JEE Main Scorecard or OCET Rank Card (if applicable), before the deadline. Otherwise, your online application will not be considered.</p>

                          <p style={{ marginBottom: '1rem' }}>Any false, misleading, or incomplete information may result in rejection of your submission.</p>

                          <p style={{ marginBottom: '1rem' }}>The data collected through this portal is solely for the purpose of generating the merit list. Submission of the application or inclusion in the merit list does not guarantee admission.</p>

                          <p style={{ marginBottom: '1rem' }}>The information collected will be used solely for the purposes of the Academic Year 2026–27.</p>

                          <p style={{ marginBottom: '1rem' }}>Submission of this form does not guarantee approval, acceptance, or any specific outcome.</p>

                          <p style={{ marginBottom: '1rem' }}>You are responsible for ensuring that all required documents and details are submitted correctly.</p>

                          <p style={{ marginBottom: '1rem' }}>An application fee of ₹1,000/- for General Category and ₹700/- for all Reserved Categories (Girls/SC/SCD/BC/PH/FF/ESM/KM) is applicable if it has not already been paid on the online HSTES Portal.<br />
                            For online applicants, the applicable application fee will be collected in person at the time of reporting, if not paid earlier through the HSTES Portal.</p>

                          <p style={{ marginBottom: '1rem' }}>By using this portal, you agree to comply with all applicable laws, regulations, and these Terms &amp; Conditions.</p>

                          <p style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#0a192f' }}>Note: After submitting your form, confirm by phone that it has been successfully received. This confirmation should be completed before the last submission date to ensure that your application has been successfully submitted.</p>
                        </div>

                        {/* On Spot Counselling Flyer */}
                        <div className="advertisement-flyer" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                          <img
                            src="/onspotcounselling.jpeg"
                            alt="On Spot Counselling Flyer"
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            onError={(e) => {
                              // Fallback if image isn't found
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div style={{ marginBottom: '3rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', margin: '0 auto' }}>
                            <a href={updatedSchedulePdf} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                              <span>Updated Schedule for Physical Counselling (PDF)</span>
                              <span style={{ fontSize: '1.2rem' }}>📄</span>
                            </a>
                            <a href={doc4} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                              <span>Physical Counselling form</span>
                              <span style={{ fontSize: '1.2rem' }}>📄</span>
                            </a>
                            <a href={doc1} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                              <span>Required Documents for On-Spot Counselling 2026</span>
                              <span style={{ fontSize: '1.2rem' }}>📄</span>
                            </a>
                            <a href={doc3} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                              <span>Fee Structure</span>
                              <span style={{ fontSize: '1.2rem' }}>📄</span>
                            </a>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            id="accept-terms"
                            checked={accepted}
                            onChange={(e) => {
                              setAccepted(e.target.checked);
                              if (e.target.checked) setShowWarning(false);
                            }}
                            style={{ marginTop: '0.3rem', width: '18px', height: '18px', accentColor: '#c5a059', cursor: 'pointer' }}
                          />
                          <label htmlFor="accept-terms" style={{ color: '#0a192f', fontWeight: '500', cursor: 'pointer', fontSize: '1.1rem' }}>
                            I accept the terms and conditions
                          </label>
                        </div>

                        {showWarning && (
                          <p style={{ color: '#e53e3e', marginBottom: '1rem', fontWeight: 'bold', fontSize: '0.95rem' }}>
                            Please Accept the terms and conditions
                          </p>
                        )}

                        <button
                          onClick={handleApplyNow}
                          className="btn btn-primary"
                          style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.1rem',
                          }}
                        >
                          Apply Online
                        </button>
                      </>
                    )}
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

export default PhysicalCounselling;
