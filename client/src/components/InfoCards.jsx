import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ADMISSIONS_CONFIG } from '../config/admissions';

const LOOP_DUPLICATE_COUNT = 3;

const useAutoScroll = (scrollRef, contentRef, pauseRef) => {
  useEffect(() => {
    const container = scrollRef.current;
    const content = contentRef.current;
    if (!container || !content) {
      return undefined;
    }

    let animationId;
    const speed = 0.6;
    container.scrollTop = 0;

    const smoothScroll = () => {
      if (!pauseRef.current) {
        container.scrollTop += speed;

        if (container.scrollTop >= content.scrollHeight / LOOP_DUPLICATE_COUNT) {
          container.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(smoothScroll);
    };

    animationId = requestAnimationFrame(smoothScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scrollRef, contentRef, pauseRef]);
};

const ScrollableCardBody = ({ items, scrollRef, contentRef, pauseRef }) => (
  <div
    className="card-body"
    ref={scrollRef}
    onMouseEnter={() => {
      pauseRef.current = true;
    }}
    onMouseLeave={() => {
      pauseRef.current = false;
    }}
  >
    {(!items || items.length === 0) ? (
      <div className="card-empty">
        <p className="card-empty-title">No updates available</p>
        <p className="card-empty-subtitle">This section will appear once official updates are added.</p>
      </div>
    ) : (
    <ul className="card-list scroll-list" ref={contentRef}>
      {(items.length > 3 ? Array.from({ length: LOOP_DUPLICATE_COUNT }, () => items).flat() : items).map((item, index) => (
        <li key={`${item.id || item.title}-${index}`} className="card-list-item">
          {item.href ? (
            <a
              className="list-item-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open: ${item.title}`}
            >
              <div className="list-item-content">
                <span className="item-title">{item.title}</span>
                <span className="item-date">{item.date}</span>
              </div>
              {item.isNew && <span className="badge-new">NEW</span>}
            </a>
          ) : (
            <>
              <div className="list-item-content">
                <span className="item-title">{item.title}</span>
                <span className="item-date">{item.date}</span>
              </div>
              {item.isNew && <span className="badge-new">NEW</span>}
            </>
          )}
        </li>
      ))}
    </ul>
    )}
  </div>
);

/**
 * InfoCards Component
 * Three auto-scrolling information cards
 */
const InfoCards = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/notices')
      .then(res => res.json())
      .then(data => {
        const activeData = data.filter(n => n.status !== 'Archived');
        
        // Map database row to component format
        const mapItem = (n) => ({
          id: n.id,
          title: n.title,
          date: n.date,
          href: n.file_path ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${n.file_path}` : null,
          isNew: n.status === 'Active' // or based on date if you prefer
        });

        const notes = activeData
          .filter(n => ['Notice', 'Event'].includes(n.category))
          .map(mapItem);
          
        setNotices(notes);
      })
      .catch(err => console.error('Error fetching notices:', err));
  }, []);

  const noticesScrollRef = useRef(null);
  const noticesContentRef = useRef(null);
  const noticesPauseRef = useRef(false);

  useAutoScroll(noticesScrollRef, noticesContentRef, noticesPauseRef);

  return (
    <section className="info-cards section" id="updates">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Campus Updates</h2>
          <div className="title-underline"></div>
        </div>

        <div className="cards-grid">
          <div className="info-card card-peach">
            <div className="card-header">
              <div className="card-icon" aria-hidden="true">NOTE</div>
              <h3 className="card-title">Notices</h3>
            </div>
            <ScrollableCardBody
              items={notices}
              scrollRef={noticesScrollRef}
              contentRef={noticesContentRef}
              pauseRef={noticesPauseRef}
            />
            <div className="card-footer">
              <Link to="/all-notices" className="card-link">
                View all notices {'->'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
