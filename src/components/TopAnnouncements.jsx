import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { ADMISSIONS_CONFIG } from '../config/admissions';

const TopAnnouncements = () => {
  const announcements = [
    {
      id: 'open-days',
      content: (
        <>
          <span className="announcement-dot" aria-hidden="true"></span>
          <p>The institute will remain open on 27.06.2026 (Saturday) and 29.06.2026 (Monday) for the smooth conduct of admissions for the academic session 2026-27.</p>
        </>
      )
    }
  ];

  if (!ADMISSIONS_CONFIG.hstesOpen) {
    announcements.push({
      id: 'counselling-soon',
      content: (
        <>
          <span className="announcement-dot" aria-hidden="true"></span>
          <p>
            Offline campus counselling will start soon.{" "}
            <a 
              href={ADMISSIONS_CONFIG.COUNSELLING_GOOGLE_FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: '#c5a059', 
                textDecoration: 'underline', 
                fontWeight: 'bold',
                marginLeft: '0.3rem'
              }}
            >
              Book Now
            </a>
          </p>
        </>
      )
    });
  }

  return (
    <ScrollReveal>
      <section className="top-announcements" aria-label="Upcoming events">
        <div className="container">
          <div className="top-announcements-wrap">
            <div className="announcements-title-box">
              <span className="announcements-chip">Upcoming</span>
              <h2>Upcoming Events</h2>
            </div>

            <div className="announcements-track">
              {announcements.length === 1 ? (
                <div className="announcements-placeholder">
                  {announcements[0].content}
                </div>
              ) : (
                <div className="announcements-marquee">
                  {[...announcements, ...announcements].map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="announcement-item">
                      {item.content}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/events" className="announcements-link">View Events</Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default TopAnnouncements;
