import React from 'react';
import { Link } from 'react-router-dom';

const topLevelSections = [
  { title: 'Students', desc: 'Student-focused utilities, notices, and support pages.' },
  { title: 'Faculty', desc: 'Faculty links and institutional academic resources.' },
  { title: 'Media', desc: 'Events, updates, and campus media coverage pages.' },
  { title: 'Jobs', desc: 'Recruitment and institute job postings.' },
  { title: 'TPC', desc: 'Training and Placement Cell related information.' },
  { title: 'Results and Projects', desc: 'Academic outcomes, projects, and entrepreneurship content.' }
];

const TopLevelSections = () => {
  return (
    <section className="section" aria-label="Top-level sections page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Top-Level Sections</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">All Sections are top level at SIET, but here are a few most visited ones</p>
        </div>

        <div className="all-notices-grid">
          {topLevelSections.map((item) => (
            <article key={item.title} className="all-notice-card">
              <h3>{item.title}</h3>
              <p className="all-notice-details">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="submenu-hero-actions" style={{ marginTop: '1.5rem' }}>
          <Link to="/staff" className="submenu-action-btn secondary">Open Staff Page</Link>
          <Link to="/events" className="submenu-action-btn primary">Open Events Page</Link>
        </div>
      </div>
    </section>
  );
};

export default TopLevelSections;
