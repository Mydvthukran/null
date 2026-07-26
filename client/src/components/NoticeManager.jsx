import React, { useState, useRef, useEffect } from 'react';
import '../css/adminDashboard.css';
import { getFileUrl } from '../utils/fileUrlHelper';

const API_BASE = import.meta.env.VITE_API_URL;

const NoticeManager = ({ token }) => {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', status: 'Active', category: 'Notice', publish_date: '' });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchNotices();
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

  const fetchNotices = async () => {
    const data = await apiCall('/notices/admin');
    if (data) setNotices(data);
  };

  const handleOpenModal = (notice = null) => {
    if (notice) {
      setEditingId(notice.id);
      // Ensure publish_date is formatted properly for datetime-local input if it exists
      const pDate = notice.publish_date ? new Date(notice.publish_date).toISOString().slice(0, 16) : '';
      setFormData({ title: notice.title, date: notice.date, status: notice.status, category: notice.category, publish_date: pDate });
    } else {
      setEditingId(null);
      setFormData({ title: '', date: '', status: 'Active', category: 'Notice', publish_date: '' });
    }
    setFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('status', formData.status);
    data.append('category', formData.category);
    data.append('publish_date', formData.publish_date);
    if (file) data.append('file', file);

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/notices/${editingId}` : '/notices';

    await apiCall(endpoint, { method, body: data });
    setShowModal(false);
    fetchNotices();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await apiCall(`/notices/${id}`, { method: 'DELETE' });
      fetchNotices();
    }
  };

  return (
    <div className="admin-activity-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: 'var(--ink-900)' }}>Manage Notices</h2>
        <button className="admin-btn primary" onClick={() => handleOpenModal()}>+ Add Notice</button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Publish Date</th>
              <th>Status</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.title}</td>
                <td>{n.category}</td>
                <td>{n.date}</td>
                <td>{n.publish_date ? new Date(n.publish_date).toLocaleString() : 'Immediate'}</td>
                <td><span className={`status-badge ${n.status === 'Active' ? 'status-active' : 'status-pending'}`}>{n.status}</span></td>
                <td>
                  {n.file_path ? <a href={getFileUrl(n.file_path)} target="_blank" rel="noreferrer" style={{ color: 'var(--brand-amber)' }}>View File</a> : '-'}
                </td>
                <td>
                  <button onClick={() => handleOpenModal(n)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(n.id)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', bordercolor: 'var(--danger)', color: 'var(--danger)' }}>Delete</button>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No notices found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10, 25, 47, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', width: '400px', maxWidth: '90%' }}>
            <h3 style={{ color: 'var(--ink-900)', marginTop: 0 }}>{editingId ? 'Edit Notice' : 'Add Notice'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" required />
              <input type="text" placeholder="Date (e.g. 10 Aug 2025)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="admin-input" />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="admin-input">
                <option value="Notice">Notice</option>
                <option value="Admission">Admission</option>
                <option value="Academic">Academic</option>
                <option value="Fee">Fee</option>
              </select>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--ink-500)' }}>Scheduled Publish Date (Optional)</label>
                <input type="datetime-local" value={formData.publish_date} onChange={e => setFormData({...formData, publish_date: e.target.value})} className="admin-input" style={{ width: '100%' }} />
              </div>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="admin-input">
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
              <input type="file" onChange={e => setFile(e.target.files[0])} ref={fileInputRef} className="admin-input" style={{ padding: '0.5rem' }} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn primary" style={{ flex: 1 }}>Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManager;
