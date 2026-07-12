import React from 'react';
import SubmenuBodyProse from './SubmenuBodyProse';

const SubmenuNoImage = ({
  title,
  points = [],
  body = [],
  resources = [],
}) => {
  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container">
          <div className="submenu-layout">
            <main className="submenu-main">
              <div className="submenu-content-card">
                <div className="section-header">
                  <h1 className="section-title">{title}</h1>
                  <div className="title-underline"></div>
                </div>
                <div className="submenu-prose">
                  <SubmenuBodyProse body={body} resources={resources} points={points} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmenuNoImage;
