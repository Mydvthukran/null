import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { getFileUrl } from '../utils/fileUrlHelper';
import { noticesBoardData } from '../data/noticesData';

const initialNotices = noticesBoardData.map((n) => ({
  id: n.id,
  title: n.title,
  category: n.category || 'Notice',
  date: n.date,
  file_path: n.downloadUrl || n.readMoreUrl,
  status: 'Active',
}));

const AllNoticesBoard = () => {
  const [notices, setNotices] = useState(initialNotices);

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
    fetch(`${apiBase}/notices`)
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter out any that are 'Archived' and dummy test records
          const filtered = data.filter((n) => n.status !== 'Archived' && n.title !== 'New Notice');
          if (filtered.length > 0) {
            setNotices(filtered);
          }
        }
      })
      .catch((err) => console.log('Using static notices fallback:', err.message));
  }, []);

  return (
    <ScrollReveal>
      <section className="all-notices section" id="all-notices" aria-label="All notices board">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">All Notices</h2>
            <div className="title-underline"></div>
          </div>

          <div className="all-notices-grid">
            {notices.map((notice) => (
              <article key={notice.id} className="all-notice-card">
                <div className="all-notice-meta">
                  <span className="all-notice-category">{notice.category || 'Notice'}</span>
                </div>
                <h3>{notice.title}</h3>
                <p className="all-notice-date">Posted: {notice.date}</p>
                <div className="all-notice-actions">
                  {notice.file_path ? (
                    <a href={getFileUrl(notice.file_path)} target="_blank" rel="noopener noreferrer" className="notice-btn primary">
                      View Document
                    </a>
                  ) : (
                    <span className="notice-btn secondary" style={{ opacity: 0.5 }}>No Attachment</span>
                  )}
                </div>
              </article>
            ))}
            {notices.length === 0 && (
              <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>No active notices found.</p>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default AllNoticesBoard;
