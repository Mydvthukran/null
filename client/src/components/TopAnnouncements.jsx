import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { topAnnouncementsData } from '../data/noticesData';

const hardcodedAnnouncements = topAnnouncementsData.map((item) => ({
  id: item.id,
  text: item.text,
  href: item.href || '/all-notices',
  isExternal: Boolean(item.href && (!item.href.startsWith('/') || item.href.toLowerCase().endsWith('.pdf') || item.href.toLowerCase().endsWith('.jpeg') || item.href.toLowerCase().endsWith('.png'))),
}));

const TopAnnouncements = () => {
  const announcements = hardcodedAnnouncements;

  const renderAnnouncement = (item) => (
    <>
      <span className="announcement-dot" aria-hidden="true"></span>
      <p>
        {item.text}{' '}
        {item.isExternal ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="announcement-inline-link">
            View Document
          </a>
        ) : (
          <Link to={item.href} className="announcement-inline-link">
            View Details
          </Link>
        )}
      </p>
    </>
  );

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
                <div className="announcements-placeholder">{renderAnnouncement(announcements[0])}</div>
              ) : (
                <div className="announcements-marquee">
                  {[...announcements, ...announcements].map((item, index) => (
                    <div key={`${item.id}-${index}`} className="announcement-item">
                      {renderAnnouncement(item)}
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
