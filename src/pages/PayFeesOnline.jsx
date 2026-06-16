import React, { useLayoutEffect } from 'react';

const PayFeesOnline = () => {
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
                <p className="submenu-kicker">ACADEMICS</p>
                <h1 className="submenu-title">Pay Fees Online</h1>
                <div className="title-underline" style={{ marginTop: '0.6rem' }}></div>
                <p className="submenu-subtitle">Secure online fee payment via SBI Collect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  
                  <div className="coc-preview-frame-wrap" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-soft)' }}>
                    <div className="submenu-pdf-empty" style={{ color: '#0a192f', textAlign: 'center', padding: '2rem' }}>
                      <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Instruction PDF will be uploaded here.</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--ink-500)' }}>Space reserved for the official step-by-step payment guide.</p>
                    </div>
                    {/* 
                      TODO: When PDF is ready, replace the empty state above with:
                      <iframe title="Payment Instructions" src={pdfUrl} className="coc-preview-frame" loading="lazy" />
                    */}
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
