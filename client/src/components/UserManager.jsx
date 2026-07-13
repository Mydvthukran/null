import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const ALL_PERMISSIONS = [
  { key: 'overview', label: 'Dashboard Overview' },
  { key: 'applications', label: 'Applications' },
  { key: 'notices', label: 'Notice Board' },
  { key: 'documents', label: 'Document Manager' },
  { key: 'events', label: 'Announcements' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'faculty', label: 'Faculty Manager' },
  { key: 'forms', label: 'Public Queries' },
  { key: 'settings', label: 'System Settings' },
  { key: 'menus', label: 'Navigation Menus' },
];

const UserManager = ({ token, currentAdminId }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '', password: '', name: '', role: 'editor', permissions: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleOpenModal = (user = null) => {
    setError('');
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        password: '',
        name: user.name,
        role: user.role,
        permissions: user.permissions || []
      });
    } else {
      setEditingUser(null);
      setFormData({ username: '', password: '', name: '', role: 'editor', permissions: [] });
    }
    setShowModal(true);
  };

  const togglePermission = (key) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(key)
        ? prev.permissions.filter(p => p !== key)
        : [...prev.permissions, key]
    }));
  };

  const selectAllPermissions = () => {
    setFormData(prev => ({ ...prev, permissions: ALL_PERMISSIONS.map(p => p.key) }));
  };

  const clearAllPermissions = () => {
    setFormData(prev => ({ ...prev, permissions: [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: formData.name,
      role: formData.role,
      permissions: formData.role === 'super_admin' ? ALL_PERMISSIONS.map(p => p.key) : formData.permissions
    };

    if (editingUser) {
      // Update
      if (formData.password) payload.password = formData.password;
      try {
        const res = await fetch(`${API_BASE}/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error); return; }
        setShowModal(false);
        fetchUsers();
      } catch (err) { setError('Network error.'); }
    } else {
      // Create
      if (!formData.username || !formData.password) {
        setError('Username and password are required for new users.');
        return;
      }
      payload.username = formData.username;
      payload.password = formData.password;
      try {
        const res = await fetch(`${API_BASE}/users`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error); return; }
        setShowModal(false);
        fetchUsers();
      } catch (err) { setError('Network error.'); }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) fetchUsers();
      else alert(data.error);
    } catch (err) { alert('Error deleting user.'); }
  };

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.75rem', borderRadius: '0.375rem',
    background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', outline: 'none', fontSize: '0.9rem'
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>User Management</h2>
        <button onClick={() => handleOpenModal()} className="admin-btn primary">+ Add User</button>
      </div>

      <div className="admin-activity-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td style={{ fontWeight: 500 }}>{user.username}</td>
                <td>{user.name}</td>
                <td>
                  <span style={{
                    background: user.role === 'super_admin' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(56, 189, 248, 0.1)',
                    color: user.role === 'super_admin' ? '#f97316' : '#38bdf8',
                    padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600
                  }}>
                    {user.role === 'super_admin' ? 'Super Admin' : user.role === 'editor' ? 'Editor' : 'Viewer'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: '300px' }}>
                    {user.role === 'super_admin' ? (
                      <span style={{ fontSize: '0.75rem', color: '#f97316' }}>All Access</span>
                    ) : (
                      (user.permissions || []).map(p => (
                        <span key={p} style={{
                          background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                          padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontSize: '0.7rem'
                        }}>{p}</span>
                      ))
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenModal(user)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Edit</button>
                    {user.id !== currentAdminId && (
                      <button onClick={() => handleDelete(user.id)} className="admin-btn outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>Delete</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.75rem', width: '500px', maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#f8fafc', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}>
              {editingUser ? `Edit User: ${editingUser.username}` : 'Create New User'}
            </h3>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!editingUser && (
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.375rem', fontSize: '0.875rem' }}>Username</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} style={inputStyle} required />
                </div>
              )}

              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.375rem', fontSize: '0.875rem' }}>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} required />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                  {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                </label>
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} style={inputStyle} {...(!editingUser ? { required: true } : {})} />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.375rem', fontSize: '0.875rem' }}>Role</label>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={inputStyle}>
                  <option value="super_admin">Super Admin (Full Access)</option>
                  <option value="editor">Editor (Custom Access)</option>
                  <option value="viewer">Viewer (Read Only)</option>
                </select>
              </div>

              {formData.role !== 'super_admin' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Dashboard Permissions</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={selectAllPermissions} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.75rem' }}>Select All</button>
                      <button type="button" onClick={clearAllPermissions} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}>Clear All</button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(15,23,42,0.4)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {ALL_PERMISSIONS.map(perm => (
                      <label key={perm.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: formData.permissions.includes(perm.key) ? '#f8fafc' : '#64748b', fontSize: '0.85rem', padding: '0.25rem 0' }}>
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(perm.key)}
                          onChange={() => togglePermission(perm.key)}
                          style={{ accentColor: '#38bdf8' }}
                        />
                        {perm.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="admin-btn primary" style={{ flex: 1 }}>
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
