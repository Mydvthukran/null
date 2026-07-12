import React, { useMemo, useState } from 'react';
import SubmenuBodyProse from './SubmenuBodyProse';

const SubmenuWithTabs = ({
  title,
  tabs = [],
  body = [],
  points = [],
  resources = [],
}) => {
  const resolvedTabs = useMemo(() => (tabs.length > 0 ? tabs : []), [tabs]);
  const [activeKey, setActiveKey] = useState(resolvedTabs[0]?.key || '');

  const activeTab = resolvedTabs.find((tab) => tab.key === activeKey) || resolvedTabs[0];

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
                {resolvedTabs.length > 0 ? (
                  <>
                    <div className="submenu-tabs" role="tablist" aria-label={`${title} content tabs`}>
                      {resolvedTabs.map((tab) => {
                        const selected = tab.key === activeTab?.key;
                        return (
                          <button
                            key={tab.key}
                            type="button"
                            className={`submenu-tab-btn ${selected ? 'active' : ''}`}
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setActiveKey(tab.key)}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="submenu-prose" role="tabpanel">
                      <SubmenuBodyProse
                        body={activeTab?.body || []}
                        resources={activeTab?.resources || []}
                        points={activeTab?.points || []}
                      />
                    </div>
                  </>
                ) : (
                  <div className="submenu-prose">
                    <SubmenuBodyProse body={body} resources={resources} points={points} />
                  </div>
                )}
              </div>
            </main>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmenuWithTabs;
