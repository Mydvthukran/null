import React from 'react';

const contentDiffItems = [
  'Long-form section content needs progressive enrichment from official institute material.',
  'Some utility pages still use concise placeholders and should be expanded with approved text.',
  'Downloadable notices are integrated, but archival categorization can be deepened.',
  'Page-level metadata and SEO copy should be aligned page-by-page.'
];

const ContentDifferences = () => {
  return (
    <section className="section" aria-label="Content differences tracker page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Content-Level Differences</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Track and close remaining page-content deltas versus the live site.</p>
        </div>

        <div className="submenu-content-card">
          <h2 className="submenu-section-title">Current Gap Tracker</h2>
          <ul className="submenu-point-list">
            {contentDiffItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContentDifferences;
