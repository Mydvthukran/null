import React, { useState, useEffect } from 'react';
import '../css/adminDashboard.css';

const API_BASE = import.meta.env.VITE_API_URL;

const ApplicationManager = ({ token }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const apiCall = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return null;
    }
  };

  const fetchApplications = async () => {
    const data = await apiCall('/applications');
    if (data) setApplications(data.applications || []);
  };

  const handleStatusChange = async (id, status) => {
    await apiCall(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    fetchApplications();
  };

  return (
    <div className="admin-activity-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: 'var(--ink-900)' }}>Admission Applications</h2>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td>{app.course}</td>
                <td>{app.date}</td>
                <td>
                  <span className={`status-badge ${app.status === 'Accepted' ? 'status-active' : app.status === 'Rejected' ? 'status-expired' : 'status-pending'}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    style={{
                      background: 'var(--surface)', color: 'var(--brand-amber)',
                      border: '1px solid var(--border-strong)', borderRadius: '0.25rem',
                      padding: '0.25rem 0.5rem', cursor: 'pointer', outline: 'none'
                    }}
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Missing Docs">Missing Docs</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No applications found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationManager;
