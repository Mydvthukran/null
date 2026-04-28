import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSectionHome } from './submenuTemplateShared';
import SubmenuBodyProse from './SubmenuBodyProse';

const normalize = (value) => String(value || '').toLowerCase().trim();

const SyllabusHubTemplate = ({
  sectionLabel,
  title,
  subtitle,
  courses = [],
  body = [],
  points = [],
  resources = [],
  hideHero = false,
  finderLabel = 'Find Program',
  selectLabel = 'Select Syllabus',
  searchPlaceholder = 'Search program...',
}) => {
  const sectionHome = getSectionHome(sectionLabel);
  const [query, setQuery] = useState('');
  const [activeKey, setActiveKey] = useState(courses[0]?.key || courses[0]?.label || '');

  const normalizedCourses = useMemo(
    () =>
      (courses || [])
        .filter((c) => c && (c.key || c.label))
        .map((c) => ({
          key: c.key || c.label,
          label: c.label || c.key,
          pdfUrl: c.pdfUrl || '',
        })),
    [courses]
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return normalizedCourses;
    return normalizedCourses.filter((c) => normalize(c.label).includes(q));
  }, [query, normalizedCourses]);

  const active = normalizedCourses.find((c) => c.key === activeKey) || filtered[0] || normalizedCourses[0];

  return (
    <div className="submenu-page">
      {!hideHero ? (
        <section className="section submenu-hero">
          <div className="container">
            <div className="submenu-hero-surface">
              <div className="submenu-hero-grid no-visual">
                <div className="submenu-hero-copy">
                  <p className="submenu-kicker">{sectionLabel}</p>
                  <h1 className="submenu-title">{title}</h1>
                  <div className="title-underline" style={{ marginTop: '0.6rem' }}></div>
                  {subtitle ? <p className="submenu-subtitle">{subtitle}</p> : null}
                  <div className="submenu-hero-actions">
                    <Link to={sectionHome.to} className="submenu-action-btn secondary">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={`section submenu-content-section ${hideHero ? 'no-hero-offset' : ''}`}>
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card syllabus-hub-shell">
                {hideHero ? (
                  <>
                    <div className="section-header" style={{ marginBottom: '1rem' }}>
                      <h1 className="section-title">{title}</h1>
                      <div className="title-underline"></div>
                      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <Link to={sectionHome.to} className="submenu-inline-back">Back</Link>
                    </div>
                  </>
                ) : null}

                <div className="syllabus-finder-bar">
                  <div className="submenu-syllabus-finder-row">
                    <div className="syllabus-finder-field">
                      <label className="syllabus-field-label">{finderLabel}</label>
                      <input
                        className="submenu-syllabus-search"
                        type="search"
                        value={query}
                        placeholder={searchPlaceholder}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search syllabus programs"
                      />
                    </div>
                    <div className="syllabus-finder-field">
                      <label className="syllabus-field-label">{selectLabel}</label>
                      <select
                        className="submenu-pdf-select syllabus-hub-select-light"
                        value={active?.key || ''}
                        onChange={(e) => setActiveKey(e.target.value)}
                        aria-label="Select syllabus"
                      >
                        {filtered.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                        {filtered.length === 0 && <option value="">No programs match search</option>}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="coc-panel syllabus-preview-panel">
                  <div className="coc-preview-head syllabus-preview-head">
                    <h3 className="submenu-subsection-title syllabus-preview-title">{active?.label || 'Curriculum Preview'}</h3>
                    {active?.pdfUrl && (
                      <a href={active.pdfUrl} target="_blank" rel="noopener noreferrer" className="doc-panel-download">
                        Download PDF
                      </a>
                    )}
                  </div>

                  <div className="coc-preview-frame-wrap syllabus-preview-frame-wrap">
                    {active?.pdfUrl ? (
                      <iframe
                        key={active.pdfUrl}
                        title={`${title} PDF preview`}
                        src={active.pdfUrl}
                        className="coc-preview-frame"
                        loading="lazy"
                      />
                    ) : (
                      <div className="submenu-pdf-empty syllabus-empty-state">
                        <p className="submenu-paragraph">Select a program from the finder above to view the syllabus.</p>
                      </div>
                    )}
                  </div>
                </div>

                {body.length > 0 && (
                  <div className="submenu-prose syllabus-body-prose">
                    <SubmenuBodyProse body={body} resources={resources} points={points} />
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SyllabusHubTemplate;
