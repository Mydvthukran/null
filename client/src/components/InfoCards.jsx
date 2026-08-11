import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { notificationsListData, noticesListData } from '../data/noticesData';
import { getFileUrl } from '../utils/fileUrlHelper';

const LOOP_DUPLICATE_COUNT = 3;

const useAutoScroll = (scrollRef, contentRef, pauseRef, itemCount) => {
  useEffect(() => {
    const container = scrollRef.current;
    const content = contentRef.current;
    if (!container || !content || !itemCount || itemCount <= 5) return undefined;

    let animationId;
    const smoothScroll = () => {
      if (!pauseRef.current && content.scrollHeight > container.clientHeight) {
        container.scrollTop += 0.5;
        const singleSetHeight = content.scrollHeight / LOOP_DUPLICATE_COUNT;
        if (container.scrollTop >= singleSetHeight) container.scrollTop -= singleSetHeight;
      }
      animationId = requestAnimationFrame(smoothScroll);
    };

    animationId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationId);
  }, [scrollRef, contentRef, pauseRef, itemCount]);
};

const mapItem = (item) => ({
  id: item.id,
  title: item.title,
  date: item.date,
  href: item.file_path ? getFileUrl(item.file_path) : '/all-notices',
  isNew: item.status === 'Active' || item.status === 'Upcoming',
});

const ScrollableCardBody = ({ items, scrollRef, contentRef, pauseRef }) => {
  const shouldLoop = items && items.length > 5;
  const displayItems = shouldLoop ? Array.from({ length: LOOP_DUPLICATE_COUNT }, () => items).flat() : items;

  return (
    <div
      className={`card-body ${shouldLoop ? 'has-auto-scroll' : ''}`}
      ref={scrollRef}
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
    >
      {(!items || items.length === 0) ? (
        <div className="card-empty">
          <p className="card-empty-title">No updates available</p>
          <p className="card-empty-subtitle">This section will appear once official updates are added.</p>
        </div>
      ) : (
        <ul className="card-list scroll-list" ref={contentRef}>
          {displayItems.map((item, index) => (
            <li key={`${item.id || item.title}-${index}`} className="card-list-item">
              <a className="list-item-link" href={item.href} target={item.href.startsWith('/') ? undefined : '_blank'} rel={item.href.startsWith('/') ? undefined : 'noopener noreferrer'}>
                <div className="list-item-content">
                  <span className="item-title">{item.title}</span>
                  <span className="item-date">{item.date}</span>
                </div>
                {item.isNew && <span className="badge-new">NEW</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const InfoCards = () => {
  const [news, setNews] = useState([]);
  const [notifications, setNotifications] = useState(notificationsListData);
  const [notices, setNotices] = useState(noticesListData);

  const loadUpdates = useCallback(async () => {
    const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
    try {
      const [noticesResponse, eventsResponse] = await Promise.all([
        fetch(`${apiBase}/notices`, { cache: 'no-store' }),
        fetch(`${apiBase}/events`, { cache: 'no-store' }),
      ]);
      const apiNotices = noticesResponse.ok ? await noticesResponse.json() : [];
      const apiEvents = eventsResponse.ok ? await eventsResponse.json() : [];
      const activeNotices = Array.isArray(apiNotices) ? apiNotices.filter((item) => item.status !== 'Archived') : [];
      const activeEvents = Array.isArray(apiEvents) ? apiEvents.filter((item) => item.status !== 'Archived') : [];

      setNews(activeEvents.length > 0 ? activeEvents.slice(0, 8).map(mapItem) : []);
      const nonEventNotices = activeNotices.filter((item) => !['Notice', 'Event'].includes(item.category));
      setNotifications(nonEventNotices.length > 0 ? nonEventNotices.slice(0, 12).map(mapItem) : notificationsListData);
      const noticeItems = activeNotices.filter((item) => ['Notice', 'Event'].includes(item.category));
      setNotices((noticeItems.length > 0 ? noticeItems : activeNotices).slice(0, 12).map(mapItem));
    } catch (error) {
      console.error('Failed to fetch campus updates:', error);
    }
  }, []);

  useEffect(() => {
    loadUpdates();
    window.addEventListener('siet:notices-updated', loadUpdates);
    window.addEventListener('siet:events-updated', loadUpdates);
    return () => {
      window.removeEventListener('siet:notices-updated', loadUpdates);
      window.removeEventListener('siet:events-updated', loadUpdates);
    };
  }, [loadUpdates]);

  const newsScrollRef = useRef(null);
  const newsContentRef = useRef(null);
  const newsPauseRef = useRef(false);
  const notifScrollRef = useRef(null);
  const notifContentRef = useRef(null);
  const notifPauseRef = useRef(false);
  const noticesScrollRef = useRef(null);
  const noticesContentRef = useRef(null);
  const noticesPauseRef = useRef(false);

  useAutoScroll(newsScrollRef, newsContentRef, newsPauseRef, news.length);
  useAutoScroll(notifScrollRef, notifContentRef, notifPauseRef, notifications.length);
  useAutoScroll(noticesScrollRef, noticesContentRef, noticesPauseRef, notices.length);

  const card = (className, icon, title, items, scrollRef, contentRef, pauseRef, footer) => (
    <div className={`info-card ${className}`}>
      <div className="card-header">
        <div className="card-icon" aria-hidden="true">{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <ScrollableCardBody items={items} scrollRef={scrollRef} contentRef={contentRef} pauseRef={pauseRef} />
      <div className="card-footer"><Link to="/all-notices" className="card-link">{footer} {'->'}</Link></div>
    </div>
  );

  return (
    <section className="info-cards section" id="updates">
      <div className="container">
        <div className="section-header"><h2 className="section-title">Campus Updates</h2><div className="title-underline"></div></div>
        <div className="cards-grid">
          {card('card-blue', 'NEWS', 'News and Events', news, newsScrollRef, newsContentRef, newsPauseRef, 'View all news')}
          {card('card-green', 'ALRT', 'Notifications', notifications, notifScrollRef, notifContentRef, notifPauseRef, 'View all notifications')}
          {card('card-peach', 'NOTE', 'Notices', notices, noticesScrollRef, noticesContentRef, noticesPauseRef, 'View all notices')}
          <div className="info-card card-peach" id="placements">
            <div className="card-header"><div className="card-icon" aria-hidden="true">PLAC</div><h3 className="card-title">Placement Updates</h3></div>
            <div className="card-body"><div className="card-empty"><p className="card-empty-title">No updates available</p><p className="card-empty-subtitle">This section will appear once official updates are added.</p></div></div>
            <div className="card-footer"><a href="https://tpo.sietpanchkula.ac.in/" target="_blank" rel="noopener noreferrer" className="card-link">View all placements {'->'}</a></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
