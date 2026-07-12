import React from 'react';

const SubmenuNestedSection = ({ section }) => {
  return (
    <article id={section.id} className="submenu-extra-card submenu-nested-card">
      <div className="submenu-nested-card-head">
        <h3>{section.title}</h3>
      </div>

      {section.body?.length > 0 ? (
        <div className="submenu-body">
          {section.body.map((line) => {
            const isHeading = line === 'Vision' || line === 'Mission';
            return isHeading ? (
              <h4 key={`${section.id}-${line}`} className="submenu-subsection-title">
                {line}
              </h4>
            ) : (
              <p key={`${section.id}-${line}`} className="submenu-paragraph">
                {line}
              </p>
            );
          })}
        </div>
      ) : null}

      {section.points?.length > 0 ? (
        <ul className="submenu-point-list">
          {section.points.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {section.table?.length > 0 ? (
        <div className="submenu-demo-table" role="table" aria-label={`${section.title} table`}>
          <div className="submenu-demo-table-row submenu-demo-table-head" role="row">
            {section.table[0].map((cell) => (
              <div key={cell} role="columnheader" className="submenu-demo-table-cell">
                {cell}
              </div>
            ))}
          </div>
          {section.table.slice(1).map((row) => (
            <div key={row.join('-')} role="row" className="submenu-demo-table-row">
              {row.map((cell) => (
                <div key={cell} role="cell" className="submenu-demo-table-cell">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {section.schedule?.length > 0 ? (
        <div className="submenu-schedule-grid">
          {section.schedule.map((item) => (
            <div key={`${item.day}-${item.slot}`} className="submenu-schedule-card">
              <strong>{item.day}</strong>
              <span>{item.slot}</span>
              <p>{item.subject}</p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
};

export default SubmenuNestedSection;
