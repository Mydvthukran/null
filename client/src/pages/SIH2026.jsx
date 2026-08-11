import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const SIH2026 = () => {
  const sihFormUrl = 'https://forms.gle/f2rQw5oghq8SmQ726';
  const flyerUrl = '/sih flyer.jpeg';

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main" style={{ width: '100%', maxWidth: 'none', flex: 'none' }}>
              <div className="submenu-content-card" style={{ padding: '2.5rem clamp(1rem, 3vw, 2.5rem)' }}>
                
                {/* Section Header */}
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '0.35rem 1rem',
                      background: 'rgba(197, 160, 89, 0.15)',
                      color: '#9a7b38',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      borderRadius: '999px',
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    National Innovation Challenge
                  </span>
                  <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#0a192f', margin: '0 0 0.5rem' }}>
                    Smart India Hackathon (SIH) 2026 – Internal Hackathon Registration Open
                  </h1>
                  <p style={{ color: '#c5a059', fontWeight: '800', fontSize: '1.4rem', margin: '0.5rem 0 0', letterSpacing: '0.03em' }}>
                    Innovate. Build. Transform.
                  </p>
                  <div className="title-underline" style={{ margin: '1rem auto 0' }}></div>
                </div>

                <ScrollReveal>
                  {/* Hero Banner */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)',
                      borderRadius: '16px',
                      padding: '2.5rem 2rem',
                      color: '#ffffff',
                      boxShadow: '0 12px 30px rgba(10, 25, 47, 0.25)',
                      marginBottom: '2.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                      <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#f8fafc', marginBottom: '1.2rem' }}>
                        <strong>State Institute of Engineering & Technology (SIET), Panchkula</strong>, is organizing the <strong>Internal Hackathon for Smart India Hackathon (SIH) 2026</strong>. Students are invited to participate in this prestigious innovation challenge and showcase their problem-solving abilities, creativity, and technical skills.
                      </p>
                      <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.8rem' }}>
                        The Smart India Hackathon provides a national platform for students to develop innovative solutions for real-world problems and compete with talented teams across India.
                      </p>

                      {/* CTA Button */}
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                          href={sihFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{
                            background: '#c5a059',
                            color: '#0a192f',
                            padding: '0.9rem 2.2rem',
                            fontWeight: '800',
                            fontSize: '1.05rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 14px rgba(197, 160, 89, 0.4)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          📝 Register Now for SIH 2026 🚀
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Why Participate & Eligibility Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '1.75rem',
                      marginBottom: '2.5rem'
                    }}
                  >
                    {/* Why Participate in SIH 2026? */}
                    <div
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderTop: '4px solid #c5a059',
                        borderRadius: '12px',
                        padding: '1.8rem',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>💡</span>
                        <h3 style={{ margin: 0, color: '#0a192f', fontSize: '1.35rem', fontWeight: '700' }}>
                          Why Participate in SIH 2026?
                        </h3>
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155', fontSize: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span>
                          <span>Opportunity to solve real-life challenges through innovative ideas.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155', fontSize: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span>
                          <span>Platform to showcase technical skills and creativity.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155', fontSize: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span>
                          <span>Chance to represent SIET Panchkula at the national level.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155', fontSize: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span>
                          <span>Opportunity to compete in India's largest innovation-driven hackathon.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155', fontSize: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span>
                          <span>Certificates and recognition for participating teams.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#334155', fontSize: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span>
                          <span>Exciting cash prizes for winning teams.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Eligibility Criteria */}
                    <div
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderTop: '4px solid #2563eb',
                        borderRadius: '12px',
                        padding: '1.8rem',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>🎯</span>
                        <h3 style={{ margin: 0, color: '#0a192f', fontSize: '1.35rem', fontWeight: '700' }}>
                          Eligibility Criteria
                        </h3>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ fontSize: '1.4rem' }}>🎓</span>
                          <div>
                            <strong style={{ color: '#0a192f', display: 'block' }}>Branch Eligibility</strong>
                            <span style={{ color: '#475569', fontSize: '0.95rem' }}>Open to students from all branches of SIET Panchkula.</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ fontSize: '1.4rem' }}>👥</span>
                          <div>
                            <strong style={{ color: '#0a192f', display: 'block' }}>Team Size</strong>
                            <span style={{ color: '#475569', fontSize: '0.95rem' }}>Each team must consist of 6 members.</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ fontSize: '1.4rem' }}>👩</span>
                          <div>
                            <strong style={{ color: '#dc2626', display: 'block' }}>Gender Diversity Requirement</strong>
                            <span style={{ color: '#475569', fontSize: '0.95rem' }}>At least one female member in each team is mandatory.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Official SIH Flyer Banner */}
                  <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#0a192f', fontSize: '1.35rem', fontWeight: '700', marginBottom: '1rem' }}>
                      Official SIH 2026 Announcement Flyer
                    </h3>
                    <div style={{ display: 'inline-block', maxWidth: '680px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(197, 160, 89, 0.5)', boxShadow: '0 8px 24px rgba(10, 25, 47, 0.15)', backgroundColor: '#ffffff' }}>
                      <img src={flyerUrl} alt="SIH 2026 Flyer SIET Panchkula" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  </div>

                  {/* Deadline & Registration Box */}
                  <div
                    style={{
                      background: '#fffbe6',
                      border: '2px dashed #f59e0b',
                      borderRadius: '12px',
                      padding: '2rem',
                      textAlign: 'center',
                      marginBottom: '2.5rem'
                    }}
                  >
                    <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>⏳</div>
                    <h3 style={{ color: '#92400e', fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
                      Registration Details
                    </h3>
                    <p style={{ color: '#78350f', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1rem' }}>
                      Last Date of Registration: 12 August 2026
                    </p>
                    <a
                      href={sihFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        padding: '0.85rem 2.2rem',
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-block',
                        background: '#16a34a',
                        borderColor: '#16a34a'
                      }}
                    >
                      Fill Registration Form 📝
                    </a>
                  </div>

                  {/* Call to Action Footer */}
                  <div
                    style={{
                      background: 'rgba(10, 25, 47, 0.03)',
                      border: '1px solid rgba(10, 25, 47, 0.08)',
                      borderRadius: '12px',
                      padding: '1.8rem',
                      textAlign: 'center'
                    }}
                  >
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0a192f', margin: 0, lineHeight: '1.7' }}>
                      Students are encouraged to form teams, select innovative problem statements, and participate enthusiastically in this national-level innovation challenge. 🚀
                    </p>
                  </div>
                </ScrollReveal>

              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SIH2026;

