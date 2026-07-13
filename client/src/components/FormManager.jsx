import React, { useState, useEffect } from 'react';
import '../css/adminDashboard.css';

const API_BASE = 'http://localhost:5000/api';

const FormManager = ({ token }) => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
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

  const fetchInquiries = async () => {
    const data = await apiCall('/contact');
    if (data) setInquiries(data.inquiries || []);
  };

  const handleStatusChange = async (id, status) => {
    await apiCall(`/contact/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    fetchInquiries();
  };

  return (
    <div className="admin-activity-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#f8fafc' }}>Form Submissions (Contact Us)</h2>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id}>
                <td>{inq.id}</td>
                <td>{inq.name}</td>
                <td>{inq.email}</td>
                <td>{inq.phone}</td>
                <td>{inq.subject}</td>
                <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={inq.message}>
                  {inq.message}
                </td>
                <td>{inq.date}</td>
                <td>
                  <span className={`status-badge ${inq.status === 'Resolved' ? 'status-active' : 'status-pending'}`}>
                    {inq.status}
                  </span>
                </td>
                <td>
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)', color: '#38bdf8',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.25rem',
                      padding: '0.25rem 0.5rem', cursor: 'pointer', outline: 'none'
                    }}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>No submissions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormManager;
