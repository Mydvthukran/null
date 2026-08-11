import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { popupSchedule } from '../data/popupSchedule';

const isDateInRange = (dateString, startDateString, endDateString) => {
  const current = new Date(dateString);
  const start = new Date(`${startDateString}T00:00:00`);
  const end = new Date(`${endDateString}T23:59:59`);
  return current >= start && current <= end;
};

const ScheduledPopup = () => {
  const [dismissed, setDismissed] = useState(false);

  const activePopup = useMemo(() => {
    const now = new Date().toISOString();

    const popup = popupSchedule.find((item) => {
      if (!item.enabled) {
        return false;
      }

      return isDateInRange(now, item.startDate, item.endDate);
    });

    return popup;
  }, []);

  const wasDismissed = useMemo(() => {
    if (!activePopup) return true;
    const storageKey = `popup-dismissed-${activePopup.id}`;
    return window.localStorage.getItem(storageKey) === 'true'
      || window.sessionStorage.getItem('hasSeenPopup') === 'true';
  }, [activePopup]);

  if (!activePopup || dismissed || wasDismissed) {
    return null;
  }

  const handleClose = () => {
    const storageKey = `popup-dismissed-${activePopup.id}`;
    window.localStorage.setItem(storageKey, 'true');
    window.sessionStorage.setItem('hasSeenPopup', 'true');
    setDismissed(true);
  };

  const imagesList = activePopup.images || (activePopup.image ? [activePopup.image] : []);

  return (
    <div 
      className="site-popup-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-label={activePopup.title || 'Announcement'}
      onClick={handleClose}
    >
      <div 
        className="site-popup-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          padding: '1.2rem', 
          width: imagesList.length > 1 ? 'min(880px, 95vw)' : 'min(680px, 95vw)',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        {/* Dedicated top bar for close button to prevent image overlap */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '0.75rem' }}>
          <button 
            aria-label="Close popup" 
            onClick={handleClose}
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              backgroundColor: '#0a192f', 
              color: '#ffffff', 
              border: '2px solid #c5a059', 
              cursor: 'pointer', 
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(10, 25, 47, 0.25)',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c5a059'; e.currentTarget.style.color = '#0a192f'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0a192f'; e.currentTarget.style.color = '#ffffff'; }}
          >
            ✕
          </button>
        </div>

        {imagesList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: imagesList.length > 1 ? '1rem' : 0 }}>
                <div style={{ width: 'min(100%, 640px)', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(197, 160, 89, 0.4)', boxShadow: '0 6px 18px rgba(10, 25, 47, 0.12)', backgroundColor: '#fff' }}>
                  <img 
                    src={imagesList[0]} 
                    alt={activePopup.title || "Announcement Image 1"} 
                    style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', display: 'block' }} 
                  />
                </div>
              </div>
              {imagesList.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', width: '100%', alignItems: 'center' }}>
                  {imagesList.slice(1).map((imgSrc, idx) => (
                    <div key={imgSrc} style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(197, 160, 89, 0.4)', boxShadow: '0 6px 18px rgba(10, 25, 47, 0.12)', backgroundColor: '#fff' }}>
                      <img src={imgSrc} alt={`Announcement Image ${idx + 2}`} style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', display: 'block' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(activePopup.ctaLink || activePopup.externalLink) && (
              <div className="site-popup-actions" style={{ marginTop: '1.2rem', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                {activePopup.ctaLink && (
                  <Link to={activePopup.ctaLink} className="site-popup-btn" onClick={handleClose}>
                    {activePopup.ctaLabel || 'View Details'}
                  </Link>
                )}
                {activePopup.externalLink && (
                  <a href={activePopup.externalLink} target="_blank" rel="noopener noreferrer" className="site-popup-btn" onClick={handleClose} style={{ background: '#16a34a', borderColor: '#16a34a' }}>
                    {activePopup.externalLabel || 'Open Link'}
                  </a>
                )}
                <button className="site-popup-btn site-popup-btn-ghost" onClick={handleClose}>
                  Close
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <p className="site-popup-tag">{activePopup.type === 'admission' ? 'Admission Alert' : 'Event Alert'}</p>
            {activePopup.title && <h2 className="site-popup-title">{activePopup.title}</h2>}
            <p className="site-popup-message">{activePopup.message}</p>

            {activePopup.ctaLabel && activePopup.ctaLink && (
              <div className="site-popup-actions">
                <Link to={activePopup.ctaLink} className="site-popup-btn" onClick={handleClose}>
                  {activePopup.ctaLabel}
                </Link>
                <button className="site-popup-btn site-popup-btn-ghost" onClick={handleClose}>
                  Dismiss
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduledPopup;
