import React from 'react';
import '../../css/submenu.css';

const Clubs = () => {
  const clubsData = [
    {
      initials: 'AN',
      name: 'AUTONEX',
      tagline: "SIET's Robotics & Automation Club",
      description: 'Driving hands-on innovation through workshops, design challenges, and hackathons like the NeXus Design Challenge.',
      tags: ['Robotics', 'Automation', 'Hackathons'],
      color: '#0a192f',
      bgColor: 'rgba(10, 25, 47, 0.08)',
      website: 'https://autonex.sietpanchkula.ac.in'
    },
    {
      initials: 'SA',
      name: 'Scikit-Learn Alchemists',
      tagline: 'Applied Machine Learning Club',
      description: 'A hands-on community exploring machine learning through Scikit-learn, building practical models and data-driven projects.',
      tags: ['Machine Learning', 'Scikit-learn', 'Data Science'],
      color: '#c5a059',
      bgColor: 'rgba(197, 160, 89, 0.12)'
    },
    {
      initials: 'MX',
      name: 'Mantrix',
      tagline: 'AI/ML Club',
      description: 'Focused on deep dives into artificial intelligence and machine learning through projects, discussions, and applied learning.',
      tags: ['Artificial Intelligence', 'Machine Learning', 'Research'],
      color: '#1f8d63',
      bgColor: 'rgba(31, 141, 99, 0.1)'
    },
    {
      initials: 'KK',
      name: 'Kala Klique',
      tagline: 'Creative & Cultural Space',
      description: "SIET's heritage and culture club, celebrating art, tradition, and creative expression through events and performances.",
      tags: ['Culture', 'Art', 'Performance'],
      color: '#e76f51',
      bgColor: 'rgba(231, 111, 81, 0.1)'
    },
    {
      initials: 'BH',
      name: 'BuildHub',
      tagline: 'Hackathons & Technical Competitions',
      description: 'Prepares students for hackathons and technical competitions, fostering rapid prototyping and problem-solving skills.',
      tags: ['Hackathons', 'Competitive Coding', 'Prototyping'],
      color: '#2563eb',
      bgColor: 'rgba(37, 99, 235, 0.08)'
    },
    {
      initials: 'SW',
      name: 'SIET Warriors',
      tagline: 'Sports Club',
      description: 'Promotes fitness, teamwork, and sportsmanship through athletic events and inter-college competitions.',
      tags: ['Sports', 'Fitness', 'Teamwork'],
      color: '#7c3aed',
      bgColor: 'rgba(124, 58, 237, 0.08)'
    },
    {
      initials: 'CG',
      name: 'Cyber Guardians',
      tagline: 'Cyber Security Club',
      description: 'Explores ethical hacking, network security, and cyber defense through hands-on labs and awareness drives.',
      tags: ['Cyber Security', 'Ethical Hacking', 'Awareness'],
      color: '#db2777',
      bgColor: 'rgba(219, 39, 119, 0.08)'
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
                  <h1 className="section-title">Clubs</h1>
                  <div className="title-underline"></div>
                </div>

                <p style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  color: 'var(--ink-700)',
                  maxWidth: '780px',
                  margin: '0 auto 2.5rem',
                  lineHeight: '1.7'
                }}>
                  SIET encourages students to explore beyond the classroom through student-led clubs focused on innovation, skill-building, culture, and sportsmanship.
                </p>

                {/* Responsive 3-column grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '3.5rem'
                }}>
                  {clubsData.map((club, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderRadius: '16px',
                        background: '#fff',
                        border: '1px solid rgba(16, 35, 63, 0.1)',
                        borderTop: `4px solid ${club.color}`,
                        padding: '2.2rem 1.8rem',
                        boxShadow: 'var(--shadow-soft)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      className="hostel-card"
                    >
                      {/* Monogram Badge */}
                      <div style={{
                        width: '3.2rem',
                        height: '3.2rem',
                        borderRadius: '50%',
                        background: club.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: club.color,
                        fontWeight: '800',
                        fontSize: '1.1rem',
                        letterSpacing: '0.05em',
                        flexShrink: 0
                      }}>
                        {club.initials}
                      </div>

                      {/* Club Name */}
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--ink-900)',
                        marginTop: '0.4rem',
                        marginBottom: '0'
                      }}>
                        {club.name}
                      </h3>

                      {/* Tagline */}
                      <p style={{
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        color: 'var(--ink-500)',
                        margin: '0'
                      }}>
                        {club.tagline}
                      </p>

                      {/* Description */}
                      <p style={{
                        fontSize: '0.92rem',
                        color: 'var(--ink-700)',
                        lineHeight: '1.55',
                        margin: '0.2rem 0 0.8rem'
                      }}>
                        {club.description}
                      </p>

                      {/* Tags */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginTop: 'auto'
                      }}>
                        {club.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            style={{
                              padding: '0.22rem 0.62rem',
                              background: 'var(--surface-muted)',
                              border: '1px solid rgba(16, 35, 63, 0.08)',
                              color: 'var(--ink-700)',
                              fontSize: '0.74rem',
                              fontWeight: '600',
                              borderRadius: '999px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {club.website && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <a
                            href={club.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.45rem 1rem',
                              background: '#0a192f',
                              color: '#ffffff',
                              fontSize: '0.82rem',
                              fontWeight: '700',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              transition: 'opacity 0.2s ease'
                            }}
                          >
                            Visit Website ↗
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Closing Line */}
                <p style={{
                  textAlign: 'center',
                  fontSize: '1.05rem',
                  color: 'var(--ink-500)',
                  fontStyle: 'italic',
                  marginTop: '2rem'
                }}>
                  More clubs launching soon — stay tuned!
                </p>

              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clubs;
