import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import doc1 from '../assets/new-assets/student/addmission document/Documents_SIET B.Tech. Admissions 2026.pdf';
import doc3 from '../assets/new-assets/student/addmission document/Fee Structure 2026-27.pdf';
import doc4 from '../assets/new-assets/student/addmission document/SIET B.Tech. Admission Form 2026-27.pdf';

const PhysicalCounselling = () => {
  const [accepted, setAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleApplyNow = () => {
    if (accepted) {
      setShowWarning(false);
      window.location.href = 'https://admissions2026.sietpanchkula.ac.in';
    } else {
      setShowWarning(true);
    }
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
                    <div className="terms-content" style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '2rem' }}>
                      <p style={{ marginBottom: '1rem' }}>By submitting this form, you confirm that all information provided is accurate and complete.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>Email your generated PDF to the admissions email address: <a href="mailto:admissions@sietpanchkula.ac.in" style={{ color: '#c5a059', fontWeight: 'bold' }}>admissions@sietpanchkula.ac.in</a>, along with your Class 10 DMC, Class 12 DMC or Diploma Certificate, and your JEE Main Scorecard or OCET Rank Card (if applicable), before the deadline. Otherwise, your online application will not be considered.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>Any false, misleading, or incomplete information may result in rejection of your submission.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>The data collected through this portal is solely for the purpose of generating the merit list. Submission of the application or inclusion in the merit list does not guarantee admission.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>The information collected will be used solely for the purposes of the Academic Year 2026–27.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>Submission of this form does not guarantee approval, acceptance, or any specific outcome.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>You are responsible for ensuring that all required documents and details are submitted correctly.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>An application fee of ₹1,000/- for General Category and ₹700/- for all Reserved Categories (Girls/SC/SCD/BC/PH/FF/ESM/KM) is applicable if it has not already been paid on the online HSTES Portal.<br/>
                      For online applicants, the applicable application fee will be collected in person at the time of reporting, if not paid earlier through the HSTES Portal.</p>
                      
                      <p style={{ marginBottom: '1rem' }}>By using this portal, you agree to comply with all applicable laws, regulations, and these Terms & Conditions.</p>

                      <p style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#0a192f' }}>Note: After submitting your form, confirm by phone that it has been successfully received. This confirmation should be completed before the last submission date to ensure that your application has been successfully submitted.</p>
                    </div>

                    {/* Advertisement Flyer - Removed because image is missing */}
                    <div className="advertisement-flyer" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                      {/*
                      <img 
                        src="/adv_flyer.jpeg" 
                        alt="Advertisement Flyer" 
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                        onError={(e) => {
                          // Fallback if image isn't found
                          e.target.style.display = 'none';
                        }}
                      />
                      */}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ marginBottom: '3rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', margin: '0 auto' }}>
                        <a href={doc4} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <span>Physical Counselling form</span>
                          <span style={{ fontSize: '1.2rem' }}>📄</span>
                        </a>
                        <a href={doc1} target="_blank" rel="noopener noreferrer" className="document-link" style={{ padding: '1rem 1.5rem', backgroundColor: '#fcfaf2', border: '1px solid rgba(197, 160, 89, 0.4)', borderRadius: '8px', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e6d2'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcfaf2'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <span>Required Documents B.Tech. Admissions 2026</span>
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
