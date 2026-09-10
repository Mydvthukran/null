import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSessions, setExpandedSessions] = useState({});

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/logs`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = (sessionId) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionId]: !prev[sessionId]
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const d = new Date(dateString);
    return isNaN(d) ? dateString : d.toLocaleString();
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}><div className="admin-spinner"></div> Loading session logs...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'var(--danger)' }}>Error: {error}</div>;
  }

  return (
    <div className="admin-activity-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: 'var(--ink-900)', fontSize: '1.25rem' }}>Login & Session Logs</h2>
        <button 
          onClick={fetchLogs} 
          style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          Refresh Logs
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {logs.map(log => (
          <div key={log.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <div 
              style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'var(--surface-muted)' }}
              onClick={() => toggleSession(log.session_id)}
            >
              <div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--brand-teal)' }}>{log.admin_name}</strong>
                <span style={{ marginLeft: '1rem', fontSize: '0.875rem', color: 'var(--ink-500)' }}>{formatDate(log.login_time)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', background: 'rgba(100, 116, 139, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', color: 'var(--ink-700)' }}>{log.location}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: expandedSessions[log.session_id] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            {expandedSessions[log.session_id] && (
              <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--ink-700)' }}>
                  <div><strong>IP:</strong> {log.ip_address}</div>
                  <div><strong>Device:</strong> {log.device}</div>
                  <div><strong>OS:</strong> {log.os}</div>
                  <div><strong>Browser:</strong> {log.browser}</div>
                </div>
                
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ink-900)' }}>Session Activity</h4>
                {log.actions && log.actions.length > 0 ? (
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--ink-700)', fontSize: '0.875rem' }}>
                    {log.actions.map((action, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600 }}>{action.module} ({action.action}):</span> {action.description} 
                        <span style={{ color: 'var(--ink-500)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{formatDate(action.timestamp)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ink-500)' }}>No activity recorded during this session.</p>
                )}
              </div>
            )}
          </div>
        ))}
        {logs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-500)' }}>No logs found.</div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
