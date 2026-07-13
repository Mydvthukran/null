import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { ADMISSIONS_CONFIG } from '../config/admissions';

const TopAnnouncements = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch live events for the scrolling marquee
    fetch('https://null-e3uj.onrender.com/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  // Convert fetched events into announcement content
  const announcements = events.map(e => ({
    id: e.id,
    content: (
      <>
        <span className="announcement-dot" aria-hidden="true"></span>
        <p>
          {e.title} {e.date && `(${e.date})`}
          {e.file_path && (
            <a 
              href={`https://null-e3uj.onrender.com${e.file_path}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#c5a059', textDecoration: 'underline', fontWeight: 'bold', marginLeft: '0.5rem' }}
            >
              View Document
            </a>
          )}
        </p>
      </>
    )
  }));

  // Fallback if there are no events in the database
  if (announcements.length === 0) {
    announcements.push({
      id: 'default',
      content: (
        <>
          <span className="announcement-dot" aria-hidden="true"></span>
          <p>Welcome to SIET Panchkula. Check back later for upcoming events!</p>
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
