import React, { useLayoutEffect } from 'react';
import sbiCollectPdf from '../assets/new-assets/student/pay fee online/SBI Collect.pdf';

const PayFeesOnline = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="submenu-page">


      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="submenu-prose" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <h2 className="submenu-section-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    Online Payment Portal
                  </h2>
                  <p className="submenu-paragraph" style={{ marginBottom: '2rem' }}>
                    Click the button below to be securely redirected to the SBI Collect portal for online fee payment. Please make sure to have your details ready before proceeding.
                  </p>
                  
                  <a 
                    href="https://onlinesbi.sbi.bank.in/sbicollect/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="gradient-button"
                    style={{ 
                      fontSize: '1.1rem', 
                      padding: '0.8rem 2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Pay Fees Online (SBI Collect)
                  </a>
                </div>

                <div className="coc-panel" style={{ marginTop: '3rem', boxShadow: 'var(--shadow-mid)' }}>
                  <div className="coc-preview-head">
                    <h3 style={{ margin: 0, color: 'var(--ink-900)', fontSize: '1.1rem', fontWeight: 700 }}>
                      Payment Instructions
                    </h3>
                  </div>
                  
                  <div className="coc-preview-frame-wrap" style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-soft)', width: '100%' }}>
                    <iframe title="Payment Instructions" src={sbiCollectPdf} className="coc-preview-frame" style={{ width: '100%', height: '600px', border: 'none' }} loading="lazy" />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PayFeesOnline;
