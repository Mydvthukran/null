import React from 'react';

const SECTION_HEADINGS = new Set(['Vision', 'Mission']);

const SubmenuBodyProse = ({ body = [], resources = [], points = [] }) => (
  <>
    {body.length > 0 ? (
      <div className="submenu-body">
        {body.map((para) =>
          SECTION_HEADINGS.has(para) ? (
            <h3 key={para} className="submenu-subsection-title">
              {para}
            </h3>
          ) : (
            <p key={para} className="submenu-paragraph">
              {para}
            </p>
          )
        )}
      </div>
    ) : null}

    {resources.length > 0 ? (
      <div className="submenu-resources">
        <h3 className="submenu-subsection-title">Resources</h3>
        <ul className="submenu-resource-list">
          {resources.map((item, index) => (
            <li key={`${item.label}-${item.href}-${index}`}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="submenu-resource-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ) : null}

    {points.length > 0 ? (
      <ul className="submenu-point-list">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    ) : null}
  </>
);

export default SubmenuBodyProse;
