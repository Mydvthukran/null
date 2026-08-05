import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSectionHome } from './submenuTemplateShared';
import SubmenuBodyProse from './SubmenuBodyProse';

const SubmenuWithPdfDropdown = ({
  sectionLabel,
  title,
  subtitle,
  pdfOptions = [],
  points = [],
  body = [],
  resources = [],
}) => {
  const sectionHome = getSectionHome(sectionLabel);
  const normalizedOptions = useMemo(
    () =>
      (pdfOptions || [])
        .filter((opt) => opt && opt.label)
        .map((opt) => ({ label: opt.label, pdfUrl: opt.pdfUrl || '' })),
    [pdfOptions]
  );

  const [selectedLabel, setSelectedLabel] = useState(normalizedOptions[0]?.label || '');
  const selected = normalizedOptions.find((opt) => opt.label === selectedLabel) || normalizedOptions[0];
  const pdfUrl = selected?.pdfUrl || '';

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${selectedLabel.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="submenu-page">
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

      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="submenu-prose">
                  <SubmenuBodyProse body={body} resources={resources} points={points} />
                </div>

                <div className="coc-panel" style={{ marginTop: '2.5rem', boxShadow: 'var(--shadow-mid)' }}>
                   <div className="submenu-pdf-toolbar" style={{ background: 'transparent', borderBottom: '1px solid rgba(10,25,47,0.1)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <label className="submenu-pdf-label" htmlFor="submenu-pdf-select" style={{ color: '#0a192f' }}>
                      Select Option
                    </label>
                    <select
                      id="submenu-pdf-select"
                      className="submenu-pdf-select"
                      value={selectedLabel}
                      onChange={(e) => setSelectedLabel(e.target.value)}
                      disabled={normalizedOptions.length === 0}
                      style={{ background: '#f8fafc', color: '#0a192f', borderColor: 'rgba(10,25,47,0.1)' }}
                    >
                      {normalizedOptions.length === 0 ? (
                        <option value="">No options available</option>
                      ) : (
                        normalizedOptions.map((opt) => (
                          <option key={opt.label} value={opt.label}>
                            {opt.label}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="coc-preview-head">
                    {pdfUrl && (
                      <button
                        onClick={handleDownload}
                        className="gradient-button"
                      >
                        Download Selected PDF
                      </button>
                    )}
                  </div>
                  
                  <div className="coc-preview-frame-wrap">
                    {pdfUrl ? (
                      <iframe
                        key={pdfUrl}
                        title={`${title} PDF preview`}
                        src={pdfUrl}
                        className="coc-preview-frame"
                        loading="lazy"
                      />
                    ) : (
                      <div className="submenu-pdf-empty" style={{ color: '#0a192f', minHeight: '300px' }}>
                        PDF is not available for this selection yet.
                      </div>
                    )}
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

export default SubmenuWithPdfDropdown;
