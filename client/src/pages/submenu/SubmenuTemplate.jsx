import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SubmenuBodyProse from './SubmenuBodyProse';
import SubmenuNestedSection from './SubmenuNestedSection';

const SubmenuTemplate = ({
  title,
  points = [],
  body = [],
  resources = [],
  nestedSections = [],
  image,
  imageMode,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;

    const targetId = location.hash.replace('#', '');
    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const frame = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, title]);

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="section-header">
                  <h1 className="section-title">{title}</h1>
                  <div className="title-underline"></div>
                </div>
                <div className="submenu-prose">
                  {imageMode === 'portrait' ? (
                    <div className="about-bottom-row" style={{ borderTop: 'none', paddingTop: 0 }}>
                      <div className="about-leader-card about-principal-card" style={{ margin: 0, padding: '1rem 0' }}>
                        <div className="about-leader-photo-wrap">
                          <div className="about-leader-photo about-principal-photo">
                            <img src={image} alt={points[0] || title} loading="lazy" />
                          </div>
                          <div className="about-leader-ring"></div>
                        </div>
                        <h3 className="about-leader-name">{points[0]}</h3>
                        <p className="about-leader-designation">{points[1]}</p>
                        <p className="about-leader-org">{points[2]}</p>
                      </div>

                      <div className="about-mission-block">
                        <div className="about-mission-quote-icon">❝</div>
                        {body.map((para, idx) => (
                          <p key={idx} className="submenu-paragraph" style={{ marginBottom: '1rem' }}>
                            {para}
                          </p>
                        ))}
                        {resources.length > 0 && (
                          <div className="submenu-resources" style={{ marginTop: '1.5rem' }}>
                            <h3 className="submenu-subsection-title">Resources</h3>
                            <ul className="submenu-resource-list">
                              {resources.map((item, index) => (
                                <li key={`${item.label}-${item.href}-${index}`}>
                                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="submenu-resource-link">
                                    {item.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {image && (
                        <div className="submenu-feature-image-wrap">
                          <img 
                            src={image} 
                            alt={title} 
                            className={`submenu-feature-image ${imageMode || ''}`} 
                            loading="lazy"
                          />
                        </div>
                      )}
                      <SubmenuBodyProse body={body} resources={resources} points={points} />
                    </>
                  )}

                  {nestedSections.length > 0 ? (
                    <>
                      <div className="submenu-nested-links" aria-label="Department sub sections">
                        {nestedSections.map((section) => (
                          <Link key={section.id} to={section.route || `#${section.id}`} className="submenu-inline-link">
                            {section.title}
                          </Link>
                        ))}
                      </div>

                      <div className="submenu-nested-grid">
                        {nestedSections.map((section) => (
                          <SubmenuNestedSection key={section.id} section={section} />
                        ))}
                      </div>
                    </>
                  ) : null}

                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmenuTemplate;
