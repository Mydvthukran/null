import React, { useState, useRef, useEffect } from 'react';
import '../css/adminDashboard.css';
import { getFileUrl } from '../utils/fileUrlHelper';

const API_BASE = import.meta.env.VITE_API_URL;

const ALL_DEPARTMENTS = [
  { id: 'cse', name: 'Computer Science' },
  { id: 'ai-ml', name: 'AI & ML' },
  { id: 'cyber-security', name: 'Cyber Security' },
  { id: 'robotics', name: 'Robotics' },
  { id: 'electrical-engineering', name: 'Electrical Engineering' },
  { id: 'electronics-vlsi', name: 'Electronics & VLSI' }
];

const FacultyManager = ({ token }) => {
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', designation: '', qualification: '', email: '',
    area_of_interest: '', vidwan_link: '', departments: []
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFaculty();
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

  const fetchFaculty = async () => {
    const data = await apiCall('/faculty');
    if (data) setFaculty(data);
  };

  const handleOpenModal = (fac = null) => {
    if (fac) {
      setEditingId(fac.id);
      setFormData({
        name: fac.name, slug: fac.slug, designation: fac.designation,
        qualification: fac.qualification, email: fac.email,
        area_of_interest: fac.area_of_interest, vidwan_link: fac.vidwan_link,
        departments: fac.departments || []
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', slug: '', designation: '', qualification: '', email: '',
        area_of_interest: '', vidwan_link: '', departments: []
      });
    }
    setFile(null);
    setShowModal(true);
  };

  const handleDeptToggle = (deptId) => {
    setFormData(prev => {
      const isSelected = prev.departments.includes(deptId);
      if (isSelected) return { ...prev, departments: prev.departments.filter(d => d !== deptId) };
      return { ...prev, departments: [...prev.departments, deptId] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    data.append('designation', formData.designation);
    data.append('qualification', formData.qualification);
    data.append('email', formData.email);
    data.append('area_of_interest', formData.area_of_interest);
    data.append('vidwan_link', formData.vidwan_link);
    data.append('departments', JSON.stringify(formData.departments));
    
    if (file) data.append('image', file);

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/faculty/${editingId}` : '/faculty';

    await apiCall(endpoint, { method, body: data });
    setShowModal(false);
    fetchFaculty();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      await apiCall(`/faculty/${id}`, { method: 'DELETE' });
      fetchFaculty();
    }
  };

  return (
    <div className="admin-activity-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: 'var(--ink-900)' }}>Manage Faculty</h2>
        <button className="admin-btn primary" onClick={() => handleOpenModal()}>+ Add Faculty</button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Departments</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((f) => (
              <tr key={f.id}>
                <td>
                  {f.image_path ? (
                    <img src={getFileUrl(f.image_path)} alt={f.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.name.charAt(0)}</div>
                  )}
                </td>
                <td>{f.name}</td>
                <td>{f.designation}</td>
                <td>
                  {f.departments?.map(d => <span key={d} className="status-badge status-active" style={{ marginRight: '4px', fontSize: '10px' }}>{d}</span>)}
                </td>
                <td>{f.email}</td>
                <td>
                  <button onClick={() => handleOpenModal(f)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(f.id)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', bordercolor: 'var(--danger)', color: 'var(--danger)' }}>Delete</button>
                </td>
              </tr>
            ))}
            {faculty.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No faculty found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10, 25, 47, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '0.5rem', width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: 'var(--ink-900)', marginTop: 0 }}>{editingId ? 'Edit Faculty' : 'Add Faculty'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="admin-input" required />
              <input type="text" placeholder="Slug (e.g. dr-john-doe)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="admin-input" />
              <input type="text" placeholder="Designation" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="admin-input" required />
              <input type="text" placeholder="Qualification" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="admin-input" />
              <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="admin-input" />
              
              <textarea placeholder="Area of Interest (Comma separated)" value={formData.area_of_interest} onChange={e => setFormData({...formData, area_of_interest: e.target.value})} className="admin-input" rows="3"></textarea>
              <input type="text" placeholder="Vidwan Link" value={formData.vidwan_link} onChange={e => setFormData({...formData, vidwan_link: e.target.value})} className="admin-input" />
              
              <div>
                <label style={{ display: 'block', color: 'var(--ink-500)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Departments (Select all that apply)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {ALL_DEPARTMENTS.map(d => (
                    <label key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--ink-700)', fontSize: '0.85rem' }}>
                      <input type="checkbox" checked={formData.departments.includes(d.id)} onChange={() => handleDeptToggle(d.id)} />
                      {d.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--ink-500)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Profile Image</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} ref={fileInputRef} className="admin-input" style={{ padding: '0.5rem' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn primary" style={{ flex: 1 }}>Save Faculty</button>
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManager;
