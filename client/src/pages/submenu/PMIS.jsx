import React, { useState } from 'react';
import '../../css/submenu.css';

const PMIS = () => {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const keyHighlights = [
    {
      icon: '💼',
      title: '12-Month Internship',
      description: 'Hands-on practical exposure with India\'s top 500 companies across diverse industrial sectors.',
      color: '#0a192f',
    },
    {
      icon: '💰',
      title: 'Monthly Stipend & Financial Grant',
      description: 'Stipend of ₹5,000 per month (₹4,500 by Govt + ₹500 by Company) plus a one-time incidentals grant of ₹6,000.',
      color: '#c5a059',
    },
    {
      icon: '🛡️',
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance provided under PM Jeevan Jyoti Bima Yojana and PM Suraksha Bima Yojana.',
      color: '#1f8d63',
    },
    {
      icon: '🏢',
      title: 'Top 500 Industry Partners',
      description: 'Direct placement in leading public and private sector enterprises across India.',
      color: '#2563eb',
    },
  ];

  const eligibilityCriteria = [
    'Candidates aged between 21 and 24 years (at the time of application submission).',
    'Enrolled in or passed higher education degrees/diplomas (B.Tech, Diploma, BA, B.Sc, B.Com, BCA, BBA, B.Pharma, etc.) from recognized institutions.',
    'Students of State Institute of Engineering & Technology (SIET), Panchkula pursuing B.Tech (CSE, AI & ML, Cyber Security, Robotics & Automation, Electrical, VLSI) or Diploma programs.',
    'Indian Citizens not engaged in full-time employment or full-time higher education at the start of internship.',
    'Family income requirement as per Ministry of Corporate Affairs (MCA) PMIS guidelines.',
  ];

  const applicationSteps = [
    {
      step: '01',
      title: 'Register on Official MCA Portal',
      desc: 'Visit https://pminternship.mca.gov.in/login/ and sign up using your Aadhaar-linked mobile number.',
    },
    {
      step: '02',
      title: 'Complete Candidate Profile',
      desc: 'Fill in educational qualification details (SIET Panchkula), skill sets, location preferences, and contact details.',
    },
    {
      step: '03',
      title: 'Select Internship Preferences',
      desc: 'Browse through internship opportunities offered by top companies and choose up to 5 preferred options.',
    },
    {
      step: '04',
      title: 'Submit & Track Application',
      desc: 'Review and submit your application. Track selection status directly from your PMIS candidate dashboard.',
    },
  ];

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main" style={{ width: '100%', maxWidth: 'none', flex: 'none' }}>
              
              {/* TOP HEADER CONTAINER WITH LOGOS */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #0a192f 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '1.8rem clamp(1rem, 3vw, 2.5rem)',
                  color: '#ffffff',
                  marginBottom: '2rem',
                  boxShadow: '0 10px 30px rgba(10, 25, 47, 0.15)',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Left Top Logo: PMIS-logo1.jpeg */}
                  <div
                    style={{
                      background: '#ffffff',
                      padding: '0.6rem 1rem',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      maxHeight: '80px',
                    }}
                  >
                    <img
                      src="/PMIS-logo1.jpeg"
                      alt="PM Internship Scheme Logo"
                      style={{
                        maxHeight: '65px',
                        maxWidth: '180px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Header Title & Subtitle */}
                  <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.9rem',
                        borderRadius: '999px',
                        background: 'rgba(197, 160, 89, 0.2)',
                        color: '#c5a059',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                        border: '1px solid rgba(197, 160, 89, 0.35)',
                      }}
                    >
                      Government of India Initiative • Ministry of Corporate Affairs (MCA)
                    </span>
                    <h1
                      style={{
                        fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)',
                        fontWeight: '900',
                        color: '#ffffff',
                        margin: '0.3rem 0',
                        lineHeight: '1.2',
                      }}
                    >
                      Prime Minister Internship Scheme (PMIS)
                    </h1>
                    <p style={{ margin: '0.4rem 0 0', color: '#cbd5e1', fontSize: '1rem' }}>
                      Empowering Youth through 12-Month Professional Internships in Top 500 Companies across India
                    </p>
                  </div>

                  {/* Right Top Logo: mcalogo.jpeg */}
                  <div
                    style={{
                      background: '#ffffff',
                      padding: '0.6rem 1rem',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      maxHeight: '80px',
                    }}
                  >
                    <img
                      src="/mcalogo.jpeg"
                      alt="Ministry of Corporate Affairs Logo"
                      style={{
                        maxHeight: '65px',
                        maxWidth: '180px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>

                {/* Primary Action Button Bar */}
                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <a
                    href="https://pminternship.mca.gov.in/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.75rem 1.8rem',
                      backgroundColor: '#c5a059',
                      color: '#0a192f',
                      fontWeight: '800',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontSize: '1.02rem',
                      boxShadow: '0 4px 15px rgba(197, 160, 89, 0.4)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>🌐</span> Apply / Login on Official PMIS Portal ↗
                  </a>

                  <a
                    href="#pmis-poster"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontWeight: '700',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontSize: '0.98rem',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    <span>🖼️</span> View Official Poster & Guidelines
                  </a>
                </div>
              </div>

              {/* TWO COLUMN CONTENT: POSTER + SCHEME OVERVIEW */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '2rem',
                  marginBottom: '2.5rem',
                  alignItems: 'start',
                }}
              >
                {/* PMIS POSTER SECTION */}
                <div
                  id="pmis-poster"
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                    }}
                  >
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0a192f', margin: 0 }}>
                      📋 Official PMIS Poster
                    </h2>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                      }}
                    >
                      MCA Govt. Notice
                    </span>
                  </div>

                  <div
                    onClick={() => setIsPosterModalOpen(true)}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #cbd5e1',
                      cursor: 'pointer',
                      position: 'relative',
                      background: '#f8fafc',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    }}
                    title="Click to view full poster"
                  >
                    <img
                      src="/pmis.jpeg"
                      alt="PM Internship Scheme Poster"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(10, 25, 47, 0.85)',
                        color: '#fff',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      🔍 Click to Zoom Poster
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                      gap: '0.8rem',
                      justifyContent: 'center',
                    }}
                  >
                    <a
                      href="/pmis.jpeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.88rem',
                        color: '#0a192f',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: '#f1f5f9',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                      }}
                    >
                      📂 Open High-Res Poster
                    </a>
                    <a
                      href="/pmis.jpeg"
                      download="PMIS_Scheme_Poster.jpeg"
                      style={{
                        fontSize: '0.88rem',
                        color: '#ffffff',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: '#0a192f',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                      }}
                    >
                      ⬇️ Download Poster
                    </a>
                  </div>
                </div>

                {/* SCHEME INTRODUCTION & SIET ELIGIBILITY */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {/* About PMIS */}
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    }}
                  >
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a192f', marginTop: 0, marginBottom: '0.8rem' }}>
                      💡 About PM Internship Scheme (PMIS)
                    </h2>
                    <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
                      The <strong>Prime Minister’s Internship Scheme (PMIS)</strong> is a landmark national initiative launched by the <strong>Ministry of Corporate Affairs (MCA), Government of India</strong>. Designed to bridge the gap between academic learning and real-world employment, PMIS provides youth with 12 months of hands-on exposure to actual business environments across India’s top 500 companies.
                    </p>
                    <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: '1.7', margin: 0 }}>
                      Selected interns gain practical skills, industry mentorship, and monthly financial support comprising a stipend of <strong>₹5,000/month</strong> along with a one-time grant of <strong>₹6,000</strong> for incidental expenses.
                    </p>
                  </div>

                  {/* SIET Panchkula Eligibility Highlight */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f4ea 100%)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      border: '1px solid #bbf7d0',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>🎓</span>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#14532d', margin: 0 }}>
                        How SIET Panchkula Students are Eligible
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.96rem', color: '#166534', lineHeight: '1.65', margin: '0 0 0.8rem 0' }}>
                      <strong>State Institute of Engineering & Technology (SIET), Panchkula</strong> is a premier State Government Engineering Institution established by the Department of Technical Education, Government of Haryana, approved by AICTE and affiliated with Kurukshetra University / HSBTE.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#15803d', fontSize: '0.93rem', lineHeight: '1.6' }}>
                      <li><strong>Technical Institution Qualification:</strong> Students pursuing B.Tech degree or Diploma at SIET Panchkula satisfy the MCA criteria for higher education technical candidates.</li>
                      <li><strong>Age Criteria:</strong> Eligible candidates must be aged <strong>21 to 24 years</strong> at the time of applying.</li>
                      <li><strong>Employment Status:</strong> Open to students not currently engaged in full-time employment.</li>
                      <li><strong>Equal Opportunity:</strong> Candidates across all technical branches (CSE, AI & ML, Cyber Security, Robotics, Electrical, VLSI) can apply for domain-specific internship roles.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* KEY HIGHLIGHTS GRID */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0a192f', marginBottom: '1.2rem', textAlign: 'center' }}>
                  🌟 Key Highlights & Benefits of PMIS
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.2rem',
                  }}
                >
                  {keyHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderTop: `4px solid ${item.color}`,
                        borderRadius: '12px',
                        padding: '1.4rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{item.icon}</div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.55', margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ELIGIBILITY & HOW TO APPLY SECTION */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.8rem',
                  marginBottom: '2.5rem',
                }}
              >
                {/* Detailed Eligibility Checklist */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '1.6rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  }}
                >
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0a192f', marginTop: 0, marginBottom: '1rem' }}>
                    ✅ Eligibility Checklist
                  </h2>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {eligibilityCriteria.map((criterion, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.7rem',
                          fontSize: '0.93rem',
                          color: '#334155',
                          lineHeight: '1.55',
                        }}
                      >
                        <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '1.1rem', flexShrink: 0 }}>✓</span>
                        <span>{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Application Steps */}
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '1.6rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  }}
                >
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0a192f', marginTop: 0, marginBottom: '1rem' }}>
                    🚀 How SIET Students Can Apply
                  </h2>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {applicationSteps.map((step, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          gap: '0.9rem',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span
                          style={{
                            background: '#0a192f',
                            color: '#c5a059',
                            fontSize: '0.85rem',
                            fontWeight: '900',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '8px',
                            flexShrink: 0,
                          }}
                        >
                          {step.step}
                        </span>
                        <div>
                          <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.2rem 0' }}>
                            {step.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CALL TO ACTION BOTTOM BANNER */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #0a192f 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#ffffff',
                  boxShadow: '0 10px 30px rgba(10, 25, 47, 0.2)',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Ready to Kickstart Your Professional Journey?
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: '1.02rem', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
                  Click below to log in or create your candidate account on the official Government MCA PM Internship portal.
                </p>
                <a
                  href="https://pminternship.mca.gov.in/login/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 2.2rem',
                    backgroundColor: '#c5a059',
                    color: '#0a192f',
                    fontWeight: '900',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontSize: '1.08rem',
                    boxShadow: '0 4px 18px rgba(197, 160, 89, 0.45)',
                  }}
                >
                  🚀 Go to Official PMIS Candidate Login Portal (mca.gov.in) ↗
                </a>
              </div>

            </main>
          </div>
        </div>
      </section>

      {/* FULL POSTER MODAL LIGHTBOX */}
      {isPosterModalOpen && (
        <div
          onClick={() => setIsPosterModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <button
              onClick={() => setIsPosterModalOpen(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#0a192f',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                zIndex: 10,
              }}
              aria-label="Close poster view"
            >
              ✕
            </button>
            <img
              src="/pmis.jpeg"
              alt="PM Internship Scheme Full Poster"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PMIS;
