import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const TopAnnouncements = () => {
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
              <div className="announcements-placeholder">
                <span className="announcement-dot" aria-hidden="true"></span>
                <p>The institute will remain open on 27.06.2026 (Saturday) and 29.06.2026 (Monday) for the smooth conduct of admissions for the academic session 2026-27.</p>
              </div>
            </div>

            <Link to="/events" className="announcements-link">View Events</Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default TopAnnouncements;
