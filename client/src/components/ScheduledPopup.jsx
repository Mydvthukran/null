import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { popupSchedule } from '../data/popupSchedule';

const isDateInRange = (dateString, startDateString, endDateString) => {
  const current = new Date(dateString);
  const start = new Date(`${startDateString}T00:00:00`);
  const end = new Date(`${endDateString}T23:59:59`);
  return current >= start && current <= end;
};

const ScheduledPopup = () => {
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

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
    return window.sessionStorage.getItem(storageKey) === 'true';
  }, [activePopup]);

  if (!activePopup || dismissed || wasDismissed || location.pathname !== '/') {
    return null;
  }

  const handleClose = () => {
    const storageKey = `popup-dismissed-${activePopup.id}`;
    window.sessionStorage.setItem(storageKey, 'true');
    setDismissed(true);
  };

  const imagesList = activePopup.images || (activePopup.image ? [activePopup.image] : []);

  return (
    <div className="site-popup-overlay" role="dialog" aria-modal="true" aria-label={activePopup.title || 'Announcement'}>
      <div 
        className="site-popup-card" 
        style={{ 
          padding: '1.5rem', 
          width: imagesList.length > 1 ? 'min(820px, 94vw)' : 'min(480px, 94vw)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button 
          className="site-popup-close" 
          aria-label="Close popup" 
          onClick={handleClose}
          style={{ zIndex: 10, right: '0.8rem', top: '0.8rem', cursor: 'pointer', fontSize: '1.2rem' }}
        >
          ✕
        </button>

        {imagesList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {activePopup.title && (
              <h2 className="site-popup-title" style={{ marginTop: 0, marginBottom: '1.2rem', textAlign: 'center', color: '#0a192f', fontSize: '1.35rem', fontWeight: 'bold' }}>
                {activePopup.title}
              </h2>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: imagesList.length > 1 ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
              gap: '1rem',
              width: '100%',
              alignItems: 'center'
            }}>
              {imagesList.map((imgSrc, idx) => (
                <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(197, 160, 89, 0.4)', boxShadow: '0 6px 18px rgba(10, 25, 47, 0.12)', backgroundColor: '#fff' }}>
                  <img 
                    src={imgSrc} 
                    alt={activePopup.title || `Announcement Image ${idx + 1}`} 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      maxHeight: '70vh', 
                      objectFit: 'contain', 
                      display: 'block' 
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="site-popup-tag">{activePopup.type === 'admission' ? 'Admission Alert' : 'Event Alert'}</p>
            <h2 className="site-popup-title">{activePopup.title}</h2>
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
