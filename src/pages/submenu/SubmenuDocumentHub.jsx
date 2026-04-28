import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSectionHome } from './submenuTemplateShared';
import SubmenuBodyProse from './SubmenuBodyProse';

const normalize = (value) => String(value || '').toLowerCase().trim();

const SubmenuDocumentHub = ({
  sectionLabel,
  title,
  subtitle,
  documents = [],
  body = [],
  points = [],
  resources = [],
  hideHero = false,
}) => {
  const sectionHome = getSectionHome(sectionLabel);
  const [query, setQuery] = useState('');
  const [activeKey, setActiveKey] = useState(documents[0]?.key || documents[0]?.label || '');

  const normalizedDocs = useMemo(
    () =>
      (documents || [])
        .filter((d) => d && (d.key || d.label))
        .map((d) => ({
          key: d.key || d.label,
          label: d.label || d.key,
          pdfUrl: d.pdfUrl || '',
        })),
    [documents]
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return normalizedDocs;
    return normalizedDocs.filter((d) => normalize(d.label).includes(q));
  }, [query, normalizedDocs]);

  const active = normalizedDocs.find((d) => d.key === activeKey) || filtered[0] || normalizedDocs[0];

  return (
    <div className="submenu-page">
      {!hideHero ? (
        <section className="section submenu-hero">
          <div className="container">
            <div className="submenu-hero-surface">
              <div className="submenu-hero-grid doc-hero doc-reader-hero no-visual">
                <div className="submenu-hero-copy">
                  <p className="submenu-kicker">{sectionLabel}</p>
                  <h1 className="submenu-title">{title}</h1>
                  <div className="title-underline" style={{ marginTop: '0.6rem' }}></div>
                  {subtitle ? <p className="submenu-subtitle">{subtitle}</p> : null}
                  <div className="submenu-hero-actions">
                    <Link to={sectionHome.to} className="submenu-action-btn secondary">Back</Link>
                    {active?.pdfUrl ? (
                      <a href={active.pdfUrl} target="_blank" rel="noopener noreferrer" className="submenu-action-btn primary">
                        Download
                      </a>
                    ) : null}
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
              <div className="submenu-content-card">
                {hideHero ? (
                  <>
                    <div className="section-header" style={{ marginBottom: '1rem' }}>
                      <h1 className="section-title">{title}</h1>
                      <div className="title-underline"></div>
                      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
                    </div>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                      <Link to={sectionHome.to} className="submenu-inline-back">Back</Link>
                      {active?.pdfUrl ? (
                        <a href={active.pdfUrl} target="_blank" rel="noopener noreferrer" className="submenu-inline-back primary">
                          Download
                        </a>
                      ) : null}
                    </div>
                  </>
                ) : null}

                <div className="doc-body-grid">
                  <section className="doc-body-copy">
                    <h2 className="submenu-section-title">About this document</h2>
                     <div className="submenu-prose">
                       <SubmenuBodyProse body={body} resources={resources} points={points} />
                     </div>
                  </section>

                  <aside className="doc-body-panel">
                    <div className="doc-panel-card">
                      <h3 className="doc-panel-title">Documents</h3>
                      <input
                        className="doc-panel-search"
                        type="search"
                        value={query}
                        placeholder="Search…"
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search documents"
                      />
                      <div className="doc-panel-list" role="list">
                        {filtered.map((d) => {
                          const isActive = d.key === active?.key;
                          return (
                            <button
                              key={d.key}
                              type="button"
                              className={`doc-panel-item ${isActive ? 'active' : ''}`}
                              onClick={() => setActiveKey(d.key)}
                            >
                              <span className="doc-panel-item-title">{d.label}</span>
                              <span className="doc-panel-item-meta">{d.pdfUrl ? 'PDF' : 'Pending'}</span>
                            </button>
                          );
                        })}
                        {filtered.length === 0 ? (
                          <div className="submenu-syllabus-empty">
                            No documents match your search.
                          </div>
                        ) : null}
                      </div>

                      {active?.pdfUrl ? (
                        <a href={active.pdfUrl} target="_blank" rel="noopener noreferrer" className="doc-panel-download">
                          Download selected PDF
                        </a>
                      ) : null}
                    </div>

                    <div className="coc-panel doc-preview-panel">
                      <div className="coc-preview-head">
                        {active?.pdfUrl && (
                          <a
                            href={active.pdfUrl}
                            download
                            className="gradient-button"
                          >
                            Download Document
                          </a>
                        )}
                      </div>
                      
                      <div className="coc-preview-frame-wrap">
                        {active?.pdfUrl ? (
                          <iframe
                            key={active.pdfUrl}
                            title={`${active.label} PDF preview`}
                            src={active.pdfUrl}
                            className="coc-preview-frame"
                            loading="lazy"
                          />
                        ) : (
                          <div className="submenu-pdf-empty" style={{ color: '#0a192f', minHeight: '300px' }}>
                            PDF not available for this selection.
                          </div>
                        )}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </main>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmenuDocumentHub;
