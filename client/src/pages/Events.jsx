import React from 'react';
import { Link } from 'react-router-dom';
import { noticesBoardData, campusUpdatesData } from '../data/noticesData';

const Events = () => {
  const eventNotices = noticesBoardData.filter((item) => item.category === 'Event');

  return (
    <section className="section" aria-label="Events section page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Events</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Institute events and major campus activity announcements.</p>
        </div>

        <div className="all-notices-grid">
          {eventNotices.map((event) => (
            <article key={event.id} className="all-notice-card">
              <div className="all-notice-meta">
                <span className="all-notice-category">Event</span>
                <span className={`all-notice-priority ${event.priority.toLowerCase()}`}>{event.priority}</span>
              </div>
              <h3>{event.title}</h3>
              <p className="all-notice-date">Posted: {event.date}</p>
              <p className="all-notice-details">{event.details}</p>
              <div className="all-notice-actions">
                <a href={event.downloadUrl} target="_blank" rel="noopener noreferrer" className="notice-btn secondary">Download</a>
                <a href={event.readMoreUrl} target="_blank" rel="noopener noreferrer" className="notice-btn primary">Read More</a>
              </div>
            </article>
          ))}
        </div>

        <div className="submenu-content-card" style={{ marginTop: '1.5rem' }}>
          <h2 className="submenu-section-title">Recent Event Updates</h2>
          <ul className="submenu-point-list">
            {campusUpdatesData.slice(0, 6).map((item) => (
              <li key={item.id}>{item.title} ({item.date})</li>
            ))}
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
