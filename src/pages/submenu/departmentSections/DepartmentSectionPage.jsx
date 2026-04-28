import React, { useMemo, useEffect } from 'react';
import { Link, Navigate, useParams, useLocation } from 'react-router-dom';
import { departmentSectionCatalog, departmentSectionTitles } from '../departmentSectionCatalog';
import computerScienceSections from './content/computerScience';
import aiMlSections from './content/aiMl';
import cyberSecuritySections from './content/cyberSecurity';
import roboticsSections from './content/robotics';
import electricalEngineeringSections from './content/electricalEngineering';
import electronicsVlsiSections from './content/electronicsVlsi';
import { getFacultyByDepartment } from '../../../data/facultyProfiles';

const departmentSectionContent = {
  cse: computerScienceSections,
  'ai-ml': aiMlSections,
  'cyber-security': cyberSecuritySections,
  robotics: roboticsSections,
  'electrical-engineering': electricalEngineeringSections,
  'electronics-vlsi': electronicsVlsiSections
};

const departmentDescriptions = {
  cse: 'Build a strong foundation in computing with focus on algorithms, software development, and system design. The program equips students with problem-solving skills and industry-relevant knowledge to excel in diverse technology domains.',
  'ai-ml': 'Specialize in cutting-edge technologies like artificial intelligence, machine learning, and data science. Students gain hands-on experience in building intelligent systems and solving real-world problems using modern AI tools.',
  'cyber-security': 'Focused on securing digital systems, this program covers network security, ethical hacking, and data protection. Students are trained to identify vulnerabilities and build robust defense mechanisms against cyber threats.',
  robotics: 'Explore the integration of mechanical systems, electronics, and intelligent control. This program prepares students to design and develop automated systems, robotics solutions, and smart technologies for industrial and real-world applications.',
  'electrical-engineering': 'Gain in-depth knowledge of electrical systems, power generation, and control engineering. The program emphasizes practical learning and prepares students for careers in energy, infrastructure, and advanced electrical technologies.',
  'electronics-vlsi': 'Dive into semiconductor technology and chip design with a focus on VLSI systems. Students learn to design, simulate, and optimize integrated circuits used in modern electronic devices.'
};

const DepartmentSectionPage = () => {
  const { deptSlug } = useParams();
  const { hash } = useLocation();
  const config = departmentSectionCatalog[deptSlug];

  const sections = useMemo(() => {
    const baseSections = departmentSectionContent[deptSlug] || [];
    const facultyMembers = getFacultyByDepartment(deptSlug);

    return baseSections.map((section) => {
      if (section.id !== 'faculty') {
        return section;
      }

      return {
        ...section,
        body: ['Click a faculty card to view full teacher details.'],
        table: undefined,
        facultyMembers
      };
    });
  }, [deptSlug]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly for content rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
       window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [hash, deptSlug]);

  if (!config) {
    return <Navigate to="/departments/cse" replace />;
  }

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="section-header">
                  <h1 className="section-title">{config.title}</h1>
                  <div className="title-underline"></div>
                </div>
                <p className="submenu-paragraph" style={{ marginBottom: '1.5rem' }}>
                  {departmentDescriptions[deptSlug]}
                </p>
                <div className="submenu-uniscroll-stack" style={{ display: 'grid', gap: '3rem' }}>
                  {sections.map((section) => (
                    <div key={section.id} id={section.id} className="submenu-uniscroll-section" style={{ scrollMarginTop: '100px' }}>
                      <h2 className="submenu-section-title">{departmentSectionTitles[section.id]}</h2>
                      <div className="submenu-prose">
                        {section.body?.length > 0 ? (
                          <div className="submenu-body">
                            {section.body.map((line) => {
                              const isHeading = line === 'Vision' || line === 'Mission' || line === 'Program Educational Objectives (PEOs)' || line === 'Program Outcomes (POs)';
                              return isHeading ? (
                                <h3 key={`${section.id}-${line}`} className="submenu-subsection-title" style={{ marginTop: '1.5rem' }}>{line}</h3>
                              ) : (
                                <p key={`${section.id}-${line}`} className="submenu-paragraph">{line}</p>
                              );
                            })}
                          </div>
                        ) : null}

                        {section.points?.length > 0 ? (
                          <ul className="submenu-point-list">
                            {section.points.map((point) => (
                              <li key={point} className="submenu-paragraph" style={{ marginBottom: '0.4rem' }}>{point}</li>
                            ))}
                          </ul>
                        ) : null}

                        {section.table?.length > 0 ? (
                          <div className="submenu-demo-table" role="table" aria-label={`${departmentSectionTitles[section.id]} data table`} style={{ marginTop: '1rem' }}>
                            <div className="submenu-demo-table-row submenu-demo-table-head" role="row">
                              {section.table[0].map((cell) => (
                                <div key={cell} role="columnheader" className="submenu-demo-table-cell">{cell}</div>
                              ))}
                            </div>
                            {section.table.slice(1).map((row) => (
                              <div key={row.join('-')} role="row" className="submenu-demo-table-row">
                                {row.map((cell) => (
                                  <div key={cell} role="cell" className="submenu-demo-table-cell">{cell}</div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : null}

                        {section.facultyMembers?.length > 0 ? (
                          <div className="faculty-card-grid" style={{ marginTop: '1rem' }}>
                            {section.facultyMembers.map((faculty) => {
                              const interests = faculty.areaOfInterest
                                .split(',')
                                .map((item) => item.trim())
                                .filter(Boolean)
                                .slice(0, 3);
                              const initials = faculty.name
                                .split(' ')
                                .map((word) => word.trim())
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((word) => word.charAt(0).toUpperCase())
                                .join('');

                              return (
                                <Link
                                  key={faculty.slug}
                                  to={`/departments/${deptSlug}/faculty/${faculty.slug}`}
                                  className="faculty-profile-card"
                                  aria-label={`Open profile of ${faculty.name}`}
                                >
                                  <div className="faculty-profile-head">
                                    <div className="faculty-profile-avatar" aria-hidden="true">{initials}</div>
                                    <span className="faculty-profile-cta">View Full Profile</span>
                                  </div>
                                  <div className="faculty-profile-body">
                                    <h3>{faculty.name}</h3>
                                    <p className="faculty-profile-designation">{faculty.designation}</p>
                                    <p className="faculty-profile-qualification">{faculty.qualification}</p>
                                    <div className="faculty-interest-tags">
                                      {interests.map((interest) => (
                                        <span key={`${faculty.slug}-${interest}`} className="faculty-interest-chip">
                                          {interest}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : null}

                        {section.schedule?.length > 0 ? (
                          <div className="submenu-schedule-grid" style={{ marginTop: '1rem' }}>
                            {section.schedule.map((item) => (
                              <div key={`${item.day}-${item.slot}`} className="submenu-schedule-card">
                                <strong>{item.day}</strong>
                                <span>{item.slot}</span>
                                <p>{item.subject}</p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      {/* Divider between sections except last */}
                      {section.id !== sections[sections.length - 1].id && (
                        <hr style={{ marginTop: '3rem', border: 'none', borderBottom: '1px solid rgba(10,25,47,0.08)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentSectionPage;
