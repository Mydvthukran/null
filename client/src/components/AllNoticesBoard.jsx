import React from 'react';
import ScrollReveal from './ScrollReveal';
import { noticesBoardData } from '../data/noticesData';

const AllNoticesBoard = () => {
  return (
    <ScrollReveal>
      <section className="all-notices section" id="all-notices" aria-label="All notices board">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">All Notices</h2>
            <div className="title-underline"></div>
          </div>

          <div className="all-notices-grid">
            {noticesBoardData.map((notice) => (
              <article key={notice.id} className="all-notice-card">
                <div className="all-notice-meta">
                  <span className="all-notice-category">{notice.category}</span>
                  <span className={`all-notice-priority ${notice.priority.toLowerCase()}`}>{notice.priority}</span>
                </div>
                <h3>{notice.title}</h3>
                <p className="all-notice-date">Posted: {notice.date}</p>
                <p className="all-notice-details">{notice.details}</p>
                <div className="all-notice-actions">
                  <a href={notice.downloadUrl} target="_blank" rel="noopener noreferrer" className="notice-btn secondary">Download</a>
                  <a href={notice.readMoreUrl} target="_blank" rel="noopener noreferrer" className="notice-btn primary">Read More</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default AllNoticesBoard;
