import React from 'react';
import { Link } from 'react-router-dom';

const staffQuickLinks = [
  { label: 'All Notices', to: '/all-notices' },
  { label: 'Academic Calendar', to: '/academics/academic-calendar' },
  { label: 'Query Form', to: '/admission-form' },
  { label: 'Student Helpline', to: '/student-helpline' },
  { label: 'Content Differences Tracker', to: '/content-differences' }
];

const Staff = () => {
  return (
    <section className="section" aria-label="Staff and utilities page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Staff and Utility Routes</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Quick utility access as dedicated pages for staff-facing workflows.</p>
        </div>

        <div className="submenu-content-card">
          <h2 className="submenu-section-title">Quick Access</h2>
          <div className="submenu-link-list">
            {staffQuickLinks.map((item) => (
              <Link key={item.label} to={item.to} className="submenu-inline-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Staff;
