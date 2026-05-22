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

    return popupSchedule.find((item) => {
      if (!item.enabled) {
        return false;
      }

      return isDateInRange(now, item.startDate, item.endDate);
    });
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
      <div className="site-popup-card">
        <button className="site-popup-close" aria-label="Close popup" onClick={handleClose}>
          x
        </button>

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
      </div>
    </div>
  );
};

export default ScheduledPopup;
