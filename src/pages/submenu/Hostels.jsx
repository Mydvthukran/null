import React from 'react';
import '../../css/submenu.css';

const Hostels = () => {
  const HOSTEL_APPLICATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScWotxjUaxhy-POgnQ_bzQPl2WjzpazwOan65xMhY0OTU9Iig/viewform';

  const cards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0a192f' }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      text: 'Warden-supervised hostel for girl students',
      borderColor: '#0a192f'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#c5a059' }}>
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
          <path d="M5 12h14" />
        </svg>
      ),
      text: 'Mess with hygienic, nutritious meals, common room, and basic amenities',
      borderColor: '#c5a059'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#1f8d63' }}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      text: 'Strict safety and discipline protocols enforced',
      borderColor: '#1f8d63'
    }
  ];

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main" style={{ width: '100%', maxWidth: 'none', flex: 'none' }}>
              <div className="submenu-content-card" style={{ padding: '2.5rem clamp(1rem, 3vw, 2.5rem)' }}>
                <div className="section-header">
                  <h1 className="section-title">Hostel</h1>
                  <div className="title-underline"></div>
                </div>
                
                <p style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  color: 'var(--ink-700)',
                  maxWidth: '720px',
                  margin: '0 auto 2.5rem',
                  lineHeight: '1.7'
                }}>
                  SIET provides safe, well-supervised hostel accommodation for girl students, with a focus on comfort, discipline, and a supportive living environment.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '3rem'
                }}>
                  {cards.map((card, index) => (
                    <div 
                      key={index}
                      style={{
                        borderRadius: '16px',
                        background: '#fff',
                        border: '1px solid rgba(16, 35, 63, 0.1)',
                        borderTop: `4px solid ${card.borderColor}`,
                        padding: '2.2rem 1.8rem',
                        boxShadow: 'var(--shadow-soft)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '1.2rem',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      className="hostel-card"
                    >
                      <div style={{
                        width: '3.2rem',
                        height: '3.2rem',
                        borderRadius: '50%',
                        background: 'rgba(197, 160, 89, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {card.icon}
                      </div>
                      <p style={{
                        fontSize: '0.98rem',
                        fontWeight: '600',
                        color: 'var(--ink-900)',
                        lineHeight: '1.5'
                      }}>
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <a 
                    href={HOSTEL_APPLICATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-gold"
                    style={{ padding: '0.8rem 2rem', fontSize: '0.9rem' }}
                  >
                    Hostel Application Form
                  </a>
                </div>

              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hostels;
