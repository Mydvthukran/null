import React from 'react';
import { Link } from 'react-router-dom';
import { getSectionHome } from './submenuTemplateShared';
import SubmenuBodyProse from './SubmenuBodyProse';
import { useDocuments } from '../../context/DocumentContext';

const SubmenuWithPDF = ({
  sectionLabel,
  title,
  subtitle,
  pdfUrl,
  pdfKey,
  points = [],
  body = [],
  resources = [],
  hideHero = false,
}) => {
  const sectionHome = getSectionHome(sectionLabel);
  const { getDocUrl } = useDocuments();
  const actualPdfUrl = pdfUrl || (pdfKey ? getDocUrl(pdfKey) : null);

  const handleDownload = () => {
    if (!actualPdfUrl) return;
    const link = document.createElement('a');
    link.href = actualPdfUrl;
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <div className="submenu-content-card">
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

                <div className="submenu-prose">
                  <SubmenuBodyProse body={body} resources={resources} points={points} />
                </div>

                <div className="coc-panel" style={{ marginTop: '2.5rem', boxShadow: 'var(--shadow-mid)' }}>
                  <div className="coc-preview-head">
                    {actualPdfUrl && (
                      <button
                        onClick={handleDownload}
                        className="gradient-button"
                      >
                        Download PDF
                      </button>
                    )}
                  </div>
                  
                  <div className="coc-preview-frame-wrap">
                    {actualPdfUrl ? (
                      <iframe
                        title={`${title} PDF preview`}
                        src={actualPdfUrl}
                        className="coc-preview-frame"
                        loading="lazy"
                      />
                    ) : (
                      <div className="submenu-pdf-empty" style={{ color: '#0a192f', minHeight: '300px' }}>
                        PDF is not available for this section yet.
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

export default SubmenuWithPDF;
