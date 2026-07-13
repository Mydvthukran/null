import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);

  useEffect(() => {
    // Fetch live events
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));

    // Fetch notices for recent updates sidebar
    fetch('http://localhost:5000/api/notices')
      .then(res => res.json())
      .then(data => setRecentUpdates(data.filter(n => n.status !== 'Archived').slice(0, 6)))
      .catch(err => console.error('Error fetching notices:', err));
  }, []);

  return (
    <section className="section" aria-label="Events section page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Events & Seminars</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Institute events, seminars, and major campus activity announcements.</p>
        </div>

        <div className="all-notices-grid">
          {events.map((event) => (
            <article key={event.id} className="all-notice-card">
              <div className="all-notice-meta">
                <span className="all-notice-category">{event.category || 'Event'}</span>
              </div>
              <h3>{event.title}</h3>
              <p className="all-notice-date">Date: {event.date}</p>
              <div className="all-notice-actions">
                {event.file_path ? (
                  <a href={`http://localhost:5000${event.file_path}`} target="_blank" rel="noopener noreferrer" className="notice-btn primary">
                    View Flyer / Document
                  </a>
                ) : (
                  <span className="notice-btn secondary" style={{ opacity: 0.5 }}>No Attachment</span>
                )}
              </div>
            </article>
          ))}
          {events.length === 0 && (
            <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>No upcoming events found.</p>
          )}
        </div>

        <div className="submenu-content-card" style={{ marginTop: '1.5rem' }}>
          <h2 className="submenu-section-title">Recent Campus Updates</h2>
          <ul className="submenu-point-list">
            {recentUpdates.map((item) => (
              <li key={item.id}>{item.title} ({item.date})</li>
            ))}
            {recentUpdates.length === 0 && <li>No recent updates.</li>}
          </ul>
          <div className="submenu-hero-actions">
            <Link to="/all-notices" className="submenu-action-btn primary">Open Full Notices Board</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
