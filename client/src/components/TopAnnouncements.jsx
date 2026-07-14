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

  // Add static announcements for counselling
  const staticAnnouncements = [
    {
      id: 'open-days',
      content: (
        <>
          <span className="announcement-dot" aria-hidden="true"></span>
          <p>2nd Counselling Reporting: 09/07/2026 to 11/07/2026 & 13/07/2026. | Timings: 10:00 AM to 05:00 PM | The institute will remain closed on Sunday.</p>
        </>
      )
    },
    {
      id: 'counselling-soon',
      content: (
        <>
          <span className="announcement-dot" aria-hidden="true"></span>
          <p>
            Physical counselling has started.{" "}
            <Link 
              to="/physical-counselling"
              style={{ 
                color: '#c5a059', 
                textDecoration: 'underline', 
                fontWeight: 'bold',
                marginLeft: '0.3rem'
              }}
            >
              Apply Now
            </Link>
          </p>
        </>
      )
    }
  ];

  // Convert fetched events into announcement content
  const dynamicAnnouncements = events.map(e => ({
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

  const announcements = [...staticAnnouncements, ...dynamicAnnouncements];

  // Fallback if there are no events in the database (this will rarely run now due to static announcements)
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
