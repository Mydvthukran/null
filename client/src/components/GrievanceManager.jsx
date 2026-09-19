import React, { useState, useEffect, useCallback } from 'react';
import '../css/adminDashboard.css';
import { getFileUrl } from '../utils/fileUrlHelper';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const STATUS_OPTIONS = ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed', 'Rejected'];

const GrievanceManager = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Selected Modal State
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [remarksUpdate, setRemarksUpdate] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchGrievances = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/grievances`, { credentials: 'include', cache: 'no-store' });
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        setError('Cannot connect to backend server. Make sure the Node.js backend (server.js) is running.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to fetch grievances.');
        setLoading(false);
        return;
      }
      setGrievances(data.grievances || []);
    } catch (err) {
      console.error('Fetch grievances error:', err);
      setError('Cannot connect to backend server. Make sure the Node.js backend (server.js) is running on port 5000.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGrievances();
  }, [fetchGrievances]);

  const handleOpenModal = (g) => {
    setSelectedGrievance(g);
    setStatusUpdate(g.status || 'Submitted');
    setRemarksUpdate(g.resolution_remarks || '');
    setActionSuccess('');
  };

  const handleCloseModal = () => {
    setSelectedGrievance(null);
    setStatusUpdate('');
    setRemarksUpdate('');
    setActionSuccess('');
  };

  const handleUpdateGrievance = async (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    setSavingStatus(true);
    setActionSuccess('');

    try {
      const res = await fetch(`${API_BASE}/grievances/${selectedGrievance.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusUpdate,
          resolution_remarks: remarksUpdate
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update grievance status.');
        setSavingStatus(false);
        return;
      }

      setActionSuccess('Status and resolution remarks updated successfully!');
      fetchGrievances();
      setTimeout(() => {
        handleCloseModal();
      }, 1200);
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating grievance status.');
    }
    setSavingStatus(false);
  };

  const handleDeleteGrievance = async (id, ticket_id) => {
    if (!window.confirm(`Are you sure you want to delete grievance ticket ${ticket_id}?`)) return;

    try {
      const res = await fetch(`${API_BASE}/grievances/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        fetchGrievances();
      } else {
        alert('Failed to delete grievance record.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting grievance.');
    }
  };

  // Filtered grievances list
  const filteredGrievances = grievances.filter(g => {
    const matchesSearch = 
      (g.ticket_id && g.ticket_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.name && g.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.subject && g.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.roll_number && g.roll_number.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || g.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Submitted': return { bg: '#e0f2fe', color: '#0369a1' };
      case 'Under Review': return { bg: '#fef3c7', color: '#b45309' };
      case 'In Progress': return { bg: '#dbeafe', color: '#1d4ed8' };
      case 'Resolved': return { bg: '#dcfce7', color: '#15803d' };
      case 'Closed': return { bg: '#f3f4f6', color: '#4b5563' };
      case 'Rejected': return { bg: '#fee2e2', color: '#b91c1c' };
      default: return { bg: '#f3f4f6', color: '#4b5563' };
    }
  };

  // Stats calculation
  const totalCount = grievances.length;
  const pendingCount = grievances.filter(g => g.status === 'Submitted' || g.status === 'Under Review' || g.status === 'In Progress').length;
  const resolvedCount = grievances.filter(g => g.status === 'Resolved' || g.status === 'Closed').length;

  return (
    <div>
      {/* Overview Stat Cards */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '2rem' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-card-header">
            <span>Total Grievances</span>
            <div className="admin-stat-icon">📋</div>
          </div>
          <div className="admin-stat-value">{totalCount}</div>
          <div className="admin-stat-trend">Logged in system</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-header">
            <span>Pending / Active</span>
            <div className="admin-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>⏳</div>
          </div>
          <div className="admin-stat-value" style={{ color: '#d97706' }}>{pendingCount}</div>
          <div className="admin-stat-trend" style={{ color: '#d97706' }}>Requires action</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card-header">
            <span>Resolved / Closed</span>
            <div className="admin-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>✅</div>
          </div>
          <div className="admin-stat-value" style={{ color: '#22c55e' }}>{resolvedCount}</div>
          <div className="admin-stat-trend" style={{ color: '#22c55e' }}>Cases completed</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="admin-activity-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Ticket ID, Student, or Subject..."
            style={{
              width: '100%', padding: '0.65rem 1rem', borderRadius: '6px',
              border: '1px solid var(--border-strong)', background: '#fff', fontSize: '0.9rem'
            }}
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid var(--border-strong)', background: '#fff', fontSize: '0.9rem' }}
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((st, i) => (
              <option key={i} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Grievances Data Table */}
      <div className="admin-activity-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Complainant</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading grievances...</td></tr>
            ) : filteredGrievances.length > 0 ? (
              filteredGrievances.map((g) => {
                const style = getStatusStyle(g.status);
                return (
                  <tr key={g.id}>
                    <td>
                      <strong style={{ letterSpacing: '0.04em', color: 'var(--brand-teal)' }}>{g.ticket_id}</strong>
                    </td>
                    <td>
                      {g.is_anonymous ? (
                        <span style={{ fontStyle: 'italic', color: 'var(--ink-500)' }}>🔒 Anonymous</span>
                      ) : (
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--ink-900)' }}>{g.name}</div>
                          {g.roll_number && <div style={{ fontSize: '0.78rem', color: 'var(--ink-500)' }}>ID: {g.roll_number}</div>}
                        </div>
                      )}
                    </td>
                    <td>{g.category}</td>
                    <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {g.subject}
                    </td>
                    <td>
                      {new Date(g.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', background: style.bg, color: style.color, fontWeight: '700', fontSize: '0.78rem' }}>
                        {g.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleOpenModal(g)}
                          style={{
                            padding: '0.35rem 0.75rem', background: 'var(--brand-teal)', color: '#fff',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600'
                          }}
                        >
                          Review & Action
                        </button>
                        <button
                          onClick={() => handleDeleteGrievance(g.id, g.ticket_id)}
                          style={{
                            padding: '0.35rem 0.6rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--ink-500)', padding: '2rem' }}>No grievances found matching criteria.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Review & Action Modal */}
      {selectedGrievance && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '650px',
            maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink-500)', textTransform: 'uppercase', fontWeight: '700' }}>Grievance Ticket</span>
                <h3 style={{ margin: '0.2rem 0 0 0', color: 'var(--ink-900)' }}>{selectedGrievance.ticket_id}</h3>
              </div>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--ink-500)' }}>×</button>
            </div>

            {actionSuccess && (
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem', textAlign: 'center', fontWeight: '600' }}>
                ✅ {actionSuccess}
              </div>
            )}

            {/* Complainant Details */}
            <div style={{ background: 'var(--surface-muted)', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.88rem' }}>
                <div><strong>Category:</strong> {selectedGrievance.category}</div>
                <div><strong>Department:</strong> {selectedGrievance.department || 'N/A'}</div>
                <div>
                  <strong>Complainant:</strong> {selectedGrievance.is_anonymous ? '🔒 Anonymous' : selectedGrievance.name}
                </div>
                {!selectedGrievance.is_anonymous && (
                  <>
                    <div><strong>Roll No:</strong> {selectedGrievance.roll_number || 'N/A'}</div>
                    <div><strong>Email:</strong> {selectedGrievance.email || 'N/A'}</div>
                    <div><strong>Phone:</strong> {selectedGrievance.phone || 'N/A'}</div>
                  </>
                )}
              </div>
            </div>

            {/* Statement */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--ink-900)' }}>Subject: {selectedGrievance.subject}</h4>
              <p style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', color: 'var(--ink-800)', fontSize: '0.92rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {selectedGrievance.description}
              </p>
            </div>

            {/* Attachment Link */}
            {selectedGrievance.attachment_path && (
              <div style={{ marginBottom: '1.5rem' }}>
                <a
                  href={getFileUrl(selectedGrievance.attachment_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.5rem 1rem', background: '#0f172a', color: '#fff',
                    borderRadius: '6px', fontSize: '0.85rem', textDecoration: 'none', fontWeight: '600'
                  }}
                >
                  📎 View Supporting Proof Attachment ↗
                </a>
              </div>
            )}

            {/* Action Form */}
            <form onSubmit={handleUpdateGrievance} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.88rem', color: 'var(--ink-800)', marginBottom: '0.4rem' }}>
                  Update Grievance Status
                </label>
                <select
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid var(--border-strong)', fontSize: '0.92rem' }}
                >
                  {STATUS_OPTIONS.map((st, i) => (
                    <option key={i} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.88rem', color: 'var(--ink-800)', marginBottom: '0.4rem' }}>
                  Official Resolution Remarks & Action Taken
                </label>
                <textarea
                  value={remarksUpdate}
                  onChange={(e) => setRemarksUpdate(e.target.value)}
                  rows="4"
                  placeholder="Enter official committee decision, resolution findings, or instructions for the student..."
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid var(--border-strong)', fontSize: '0.92rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '0.65rem 1.25rem', background: 'var(--surface-muted)', border: '1px solid var(--border-subtle)', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStatus}
                  style={{ padding: '0.65rem 1.5rem', background: 'var(--brand-teal)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {savingStatus ? 'Saving...' : 'Save Resolution & Update Status'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceManager;
