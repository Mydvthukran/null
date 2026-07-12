import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { popupSchedule } from '../data/popupSchedule';
import { ADMISSIONS_CONFIG } from '../config/admissions';

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

    /* if (popup && popup.type === 'admission' && !ADMISSIONS_CONFIG.hstesOpen) {
      return {
        ...popup,
        ctaLink: ADMISSIONS_CONFIG.COUNSELLING_GOOGLE_FORM_URL,
        ctaLabel: 'Offline Counselling'
      };
    } */

    return popup;
  }, []);

  const wasDismissed = useMemo(() => {
    if (!activePopup) return true;
    const storageKey = `popup-dismissed-${activePopup.id}`;
    return window.sessionStorage.getItem(storageKey) === 'true';
  }, [activePopup]);

  if (!activePopup || dismissed || wasDismissed) {
    return null;
  }

  const handleClose = () => {
    const storageKey = `popup-dismissed-${activePopup.id}`;
    window.sessionStorage.setItem(storageKey, 'true');
    setDismissed(true);
  };

  return (
    <div className="site-popup-overlay" role="dialog" aria-modal="true" aria-label={activePopup.title}>
      <div 
        className="site-popup-card" 
        style={activePopup.image ? { padding: '1.5rem', width: 'min(440px, 100%)' } : {}}
      >
        <button 
          className="site-popup-close" 
          aria-label="Close popup" 
          onClick={handleClose}
          style={{ zIndex: 10, right: '0.5rem', top: '0.5rem' }}
        >
          x
        </button>

        {activePopup.image ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="site-popup-title" style={{ marginTop: 0, marginBottom: '1rem', textAlign: 'center' }}>
              {activePopup.title}
            </h2>
            <Link to={activePopup.ctaLink} onClick={handleClose} style={{ display: 'block', width: '100%' }}>
              <img 
                src={activePopup.image} 
                alt={activePopup.title} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '65vh', 
                  objectFit: 'contain', 
                  borderRadius: '8px',
                  border: '2px solid rgba(197, 160, 89, 0.4)',
                  boxShadow: '0 8px 24px rgba(10, 25, 47, 0.15)'
                }} 
              />
            </Link>
            <div className="site-popup-actions" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Link to={activePopup.ctaLink} className="site-popup-btn" onClick={handleClose} style={{ width: '100%', maxWidth: '300px', fontSize: '1rem', padding: '0.8rem' }}>
                {activePopup.ctaLabel}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="site-popup-tag">{activePopup.type === 'admission' ? 'Admission Alert' : 'Event Alert'}</p>
            <h2 className="site-popup-title">{activePopup.title}</h2>
            <p className="site-popup-message">{activePopup.message}</p>

            <div className="site-popup-actions">
              <Link to={activePopup.ctaLink} className="site-popup-btn" onClick={handleClose}>
                {activePopup.ctaLabel}
              </Link>
              <button className="site-popup-btn site-popup-btn-ghost" onClick={handleClose}>
                Dismiss
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduledPopup;
