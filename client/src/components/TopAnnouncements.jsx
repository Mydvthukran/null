import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { topAnnouncementsData } from '../data/noticesData';
import { getFileUrl } from '../utils/fileUrlHelper';

const fallbackAnnouncements = topAnnouncementsData.map((item) => ({
  id: item.id,
  text: item.text,
  href: item.href || '/all-notices',
  isExternal: Boolean(item.href && !item.href.startsWith('/')),
}));

const TopAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(fallbackAnnouncements);

  const loadAnnouncements = useCallback(async () => {
    const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
    try {
      const response = await fetch(`${apiBase}/notices`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok || !Array.isArray(data)) return;

      const nextAnnouncements = data
        .filter((notice) => notice.status !== 'Archived')
        .slice(0, 8)
        .map((notice) => ({
          id: notice.id,
          text: notice.title,
          href: notice.file_path ? getFileUrl(notice.file_path) : '/all-notices',
          isExternal: Boolean(notice.file_path),
        }));

      setAnnouncements(nextAnnouncements.length > 0 ? nextAnnouncements : fallbackAnnouncements);
    } catch (error) {
      console.error('Failed to fetch top announcements:', error);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
    window.addEventListener('siet:notices-updated', loadAnnouncements);
    return () => window.removeEventListener('siet:notices-updated', loadAnnouncements);
  }, [loadAnnouncements]);

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
