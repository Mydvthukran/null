import React, { useState, useRef, useEffect } from 'react';
import '../css/adminDashboard.css';

const API_BASE = 'https://null-e3uj.onrender.com/api';

const EventManager = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', status: 'Upcoming', category: 'Event' });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [eventRegistrations, setEventRegistrations] = useState([]);

  useEffect(() => {
    fetchEvents();
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

  const fetchEvents = async () => {
    const data = await apiCall('/events');
    if (data) setEvents(data);
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingId(event.id);
      setFormData({ title: event.title, date: event.date, status: event.status, category: event.category });
    } else {
      setEditingId(null);
      setFormData({ title: '', date: '', status: 'Upcoming', category: 'Event' });
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
    if (file) data.append('file', file);

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/events/${editingId}` : '/events';

    await apiCall(endpoint, { method, body: data });
    setShowModal(false);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await apiCall(`/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    }
  };

  const handleViewRegistrations = async (event) => {
    setSelectedEventForReg(event);
    const data = await apiCall(`/events/registrations/${event.id}`);
    if (data) setEventRegistrations(data.registrations || []);
    setShowRegModal(true);
  };

  return (
    <div className="admin-activity-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#f8fafc' }}>Manage Announcements</h2>
        <button className="admin-btn primary" onClick={() => handleOpenModal()}>+ Add Announcement</button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.title}</td>
                <td>{e.category}</td>
                <td>{e.date}</td>
                <td><span className={`status-badge ${e.status === 'Upcoming' ? 'status-pending' : 'status-active'}`}>{e.status}</span></td>
                <td>
                  {e.file_path ? <a href={`https://null-e3uj.onrender.com${e.file_path}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>View File</a> : '-'}
                </td>
                <td>
                  <button onClick={() => handleViewRegistrations(e)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem', color: '#10b981', borderColor: '#10b981' }}>Registrations</button>
                  <button onClick={() => handleOpenModal(e)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(e.id)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', borderColor: '#ef4444', color: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No announcements found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.5rem', width: '400px', maxWidth: '90%' }}>
            <h3 style={{ color: '#fff', marginTop: 0 }}>{editingId ? 'Edit Announcement' : 'Add Announcement'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" required />
              <input type="text" placeholder="Date (e.g. 10 Aug 2025)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="admin-input" />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="admin-input">
                <option value="Event">Event</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
              </select>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="admin-input">
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
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

      {showRegModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.5rem', width: '600px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#fff', margin: 0 }}>Registrations for "{selectedEventForReg?.title}"</h3>
              <button onClick={() => setShowRegModal(false)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem' }}>Close</button>
            </div>
            
            {eventRegistrations.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>No registrations yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Student ID</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {eventRegistrations.map((reg) => (
                    <tr key={reg.id}>
                      <td>{reg.name}</td>
                      <td>{reg.email}</td>
                      <td>{reg.phone || '-'}</td>
                      <td>{reg.student_id || '-'}</td>
                      <td>{reg.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManager;
