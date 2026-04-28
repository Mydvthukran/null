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
                  <SubmenuBodyProse body={body} resources={resources} points={points} />

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
