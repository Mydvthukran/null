import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { topAnnouncementsData } from '../data/noticesData';

const TopAnnouncements = () => {
  // Parse markdown-style links in title: [text](href)
  const renderTitle = (title) => {
    if (!title) return '';
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const match = title.match(linkRegex);
    if (match) {
      const before = title.substring(0, match.index);
      const linkText = match[1];
      const linkHref = match[2];
      const after = title.substring(match.index + match[0].length);
      return (
        <>
          {before}
          <Link 
            to={linkHref}
            style={{ 
              color: '#c5a059', 
              textDecoration: 'underline', 
              fontWeight: 'bold',
              marginLeft: '0.3rem'
            }}
          >
            {linkText}
          </Link>
          {after}
        </>
      );
    }
    return title;
  };

  // Convert fetched static data into announcement content
  const announcements = topAnnouncementsData.map(e => ({
    id: e.id,
    content: (
      <>
        <span className="announcement-dot" aria-hidden="true"></span>
        <p>
          {renderTitle(e.text)}
          {e.href && (
            e.href.startsWith('/') && !e.href.endsWith('.pdf') && !e.href.endsWith('.jpeg') ? (
              <Link 
                to={e.href}
                style={{ color: '#c5a059', textDecoration: 'underline', fontWeight: 'bold', marginLeft: '0.5rem' }}
              >
                Read More
              </Link>
            ) : (
              <a 
                href={e.href} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#c5a059', textDecoration: 'underline', fontWeight: 'bold', marginLeft: '0.5rem' }}
              >
                View Document
              </a>
            )
          )}
        </p>
      </>
    )
  }));

  // Fallback if there are no announcements
  if (announcements.length === 0) {
    announcements.push({
      id: 'default',
      content: (
        <>
          <span className="announcement-dot" aria-hidden="true"></span>
          <p>Welcome to SIET Panchkula. Check back later for latest announcements!</p>
        </>
      )
    });
  }

  return (
    <ScrollReveal>
      <section className="top-announcements" aria-label="Top announcements">
        <div className="container">
          <div className="top-announcements-wrap">
            <div className="announcements-title-box">
              <span className="announcements-chip">Latest</span>
              <h2>Top Announcements</h2>
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

            <Link to="/all-notices" className="announcements-link">View All Notices</Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default TopAnnouncements;
