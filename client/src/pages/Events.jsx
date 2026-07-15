import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', student_id: '' });
  const [regStatus, setRegStatus] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));

    fetch(import.meta.env.VITE_API_URL + '/notices')
      .then(res => res.json())
      .then(data => setRecentUpdates(data.filter(n => n.status !== 'Archived').slice(0, 6)))
      .catch(err => console.error('Error fetching notices:', err));
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...regData, event_id: registeringEvent.id })
      });
      if (res.ok) {
        setRegStatus('Successfully registered!');
        setTimeout(() => {
          setRegisteringEvent(null);
          setRegStatus('');
          setRegData({ name: '', email: '', phone: '', student_id: '' });
        }, 3000);
      } else {
        setRegStatus('Error registering. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setRegStatus('Network error.');
    }
  };

  return (
    <section className="section" aria-label="Events section page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Events & Seminars</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Institute events, seminars, and major campus activity announcements.</p>
        </div>

        <div className="all-notices-grid">
          {events.map((event) => (
            <article key={event.id} className="all-notice-card">
              <div className="all-notice-meta">
                <span className="all-notice-category">{event.category || 'Event'}</span>
              </div>
              <h3>{event.title}</h3>
              <p className="all-notice-date">Date: {event.date}</p>
              
              <div className="all-notice-actions">
                <button 
                  className="notice-btn primary" 
                  onClick={() => { setRegisteringEvent(event); setRegStatus(''); }}
                >
                  Register Now
                </button>
                {event.file_path && (
                  <a href={`${import.meta.env.VITE_API_URL.replace("/api", "")}${event.file_path}`} target="_blank" rel="noopener noreferrer" className="notice-btn secondary" style={{marginLeft: '0.5rem'}}>
                    View Flyer
                  </a>
                )}
              </div>

              {registeringEvent && registeringEvent.id === event.id && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#0f172a' }}>Register for {event.title}</h4>
                  <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input type="text" placeholder="Full Name *" required value={regData.name} onChange={(e) => setRegData({...regData, name: e.target.value})} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }} />
                    <input type="email" placeholder="Email Address *" required value={regData.email} onChange={(e) => setRegData({...regData, email: e.target.value})} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }} />
                    <input type="tel" placeholder="Phone Number" value={regData.phone} onChange={(e) => setRegData({...regData, phone: e.target.value})} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }} />
                    <input type="text" placeholder="Student ID (if applicable)" value={regData.student_id} onChange={(e) => setRegData({...regData, student_id: e.target.value})} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" className="admin-btn primary" style={{ flex: 1 }}>Submit Registration</button>
                      <button type="button" className="admin-btn secondary" onClick={() => setRegisteringEvent(null)}>Cancel</button>
                    </div>
                    {regStatus && <p style={{ color: regStatus.includes('Success') ? 'green' : 'red', fontSize: '0.9rem' }}>{regStatus}</p>}
                  </form>
                </div>
              )}
            </article>
          ))}
          {events.length === 0 && (
            <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>No upcoming events found.</p>
          )}
        </div>

        <div className="submenu-content-card" style={{ marginTop: '1.5rem' }}>
          <h2 className="submenu-section-title">Recent Campus Updates</h2>
          <ul className="submenu-point-list">
            {recentUpdates.map((item) => (
              <li key={item.id}>{item.title} ({item.date})</li>
            ))}
            {recentUpdates.length === 0 && <li>No recent updates.</li>}
          </ul>
          <div className="submenu-hero-actions">
            <Link to="/all-notices" className="submenu-action-btn primary">Open Full Notices Board</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
