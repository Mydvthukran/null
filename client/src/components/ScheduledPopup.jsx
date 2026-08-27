import React, { useMemo, useState, useEffect } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const imagesList = activePopup ? (activePopup.images || (activePopup.image ? [activePopup.image] : [])) : [];

  useEffect(() => {
    if (!activePopup || dismissed || wasDismissed || imagesList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagesList.length);
    }, 10000); // 10 seconds auto-slide

    return () => clearInterval(timer);
  }, [activePopup, dismissed, wasDismissed, imagesList.length]);

  if (!activePopup || dismissed || wasDismissed) {
    return null;
  }

  const handleClose = () => {
    const storageKey = `popup-dismissed-${activePopup.id}`;
    window.localStorage.setItem(storageKey, 'true');
    window.sessionStorage.setItem('hasSeenPopup', 'true');
    setDismissed(true);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % imagesList.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  return (
    <div 
      className="site-popup-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-label={activePopup.title || 'Announcement'}
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div 
        className="site-popup-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          padding: '1.2rem', 
          width: 'min(880px, 95vw)',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          backgroundColor: '#fff',
          borderRadius: '12px'
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
              flexShrink: 0,
              zIndex: 10
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c5a059'; e.currentTarget.style.color = '#0a192f'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0a192f'; e.currentTarget.style.color = '#ffffff'; }}
          >
            ✕
          </button>
        </div>

        {imagesList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: '100%', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(197, 160, 89, 0.4)', boxShadow: '0 6px 18px rgba(10, 25, 47, 0.12)', backgroundColor: '#fff', position: 'relative' }}>
                  
                  <div style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden' }}>
                    {imagesList.map((src, idx) => {
                      const isPdf = src.toLowerCase().includes('.pdf');
                      return (
                        <div
                          key={idx}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: idx === currentSlide ? 1 : 0,
                            visibility: idx === currentSlide ? 'visible' : 'hidden',
                            transition: 'opacity 0.6s ease-in-out, visibility 0.6s',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff'
                          }}
                        >
                          {isPdf ? (
                            <iframe 
                              src={src} 
                              title={`Announcement Document ${idx + 1}`}
                              style={{ width: '100%', height: '100%', border: 'none' }}
                            />
                          ) : (
                            <img 
                              src={src} 
                              alt={activePopup.title || `Announcement Image ${idx + 1}`} 
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {imagesList.length > 1 && (
                    <>
                      <button 
                        onClick={prevSlide}
                        style={{
                          position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)',
                          background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%',
                          width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        &#10094;
                      </button>
                      <button 
                        onClick={nextSlide}
                        style={{
                          position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)',
                          background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%',
                          width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        &#10095;
                      </button>
                      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                        {imagesList.map((_, idx) => (
                          <div 
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                            style={{
                              width: '10px', height: '10px', borderRadius: '50%', cursor: 'pointer',
                              backgroundColor: idx === currentSlide ? '#c5a059' : 'rgba(255,255,255,0.7)',
                              border: '1px solid rgba(0,0,0,0.3)'
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {(activePopup.ctaLink || activePopup.externalLink) && (
              <div className="site-popup-actions" style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                {activePopup.ctaLink && (
                  <Link to={activePopup.ctaLink} className="site-popup-btn" onClick={handleClose} style={{
                    background: '#0a192f', color: '#c5a059', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold'
                  }}>
                    {activePopup.ctaLabel || 'View Details'}
                  </Link>
                )}
                {activePopup.externalLink && (
                  <a href={activePopup.externalLink} target="_blank" rel="noopener noreferrer" className="site-popup-btn" onClick={handleClose} style={{
                    background: '#16a34a', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold'
                  }}>
                    {activePopup.externalLabel || 'Open Link'}
                  </a>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <p className="site-popup-tag" style={{ color: '#c5a059', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>{activePopup.type === 'admission' ? 'Admission Alert' : 'Event Alert'}</p>
            {activePopup.title && <h2 className="site-popup-title" style={{ color: '#0a192f', margin: '0.5rem 0' }}>{activePopup.title}</h2>}
            <p className="site-popup-message" style={{ color: '#444' }}>{activePopup.message}</p>

            {activePopup.ctaLabel && activePopup.ctaLink && (
              <div className="site-popup-actions" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <Link to={activePopup.ctaLink} className="site-popup-btn" onClick={handleClose} style={{
                  background: '#0a192f', color: '#c5a059', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold'
                }}>
                  {activePopup.ctaLabel}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduledPopup;
