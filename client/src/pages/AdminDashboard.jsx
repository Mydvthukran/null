import React, { useEffect, useState, useRef } from 'react';
import NoticeManager from '../components/NoticeManager';
import EventManager from '../components/EventManager';
import GalleryManager from '../components/GalleryManager';
import FormManager from '../components/FormManager';
import FacultyManager from '../components/FacultyManager';
import DocumentManager from '../components/DocumentManager';
import SettingsManager from '../components/SettingsManager';
import MenuManager from '../components/MenuManager';
import UserManager from '../components/UserManager';
import '../css/adminDashboard.css';

const API_BASE = 'http://localhost:5000/api';

/**
 * Premium Admin Dashboard Component for College Website
 * Connected to the Express.js backend via REST API.
 */
const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [adminPermissions, setAdminPermissions] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Data from API
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState([]);

  // File upload ref
  const fileInputRef = useRef(null);
  const [uploadingDocKey, setUploadingDocKey] = useState(null);

  // Application view state
  const [viewingApp, setViewingApp] = useState(null);

  // Update document title
  useEffect(() => {
    document.title = isLoggedIn ? "College Admin Portal | SIET" : "Admin Login | SIET";
  }, [isLoggedIn]);

  // Check for saved token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedName = localStorage.getItem('adminName');
    const savedRole = localStorage.getItem('adminRole');
    const savedPerms = localStorage.getItem('adminPermissions');
    const savedId = localStorage.getItem('adminId');
    if (savedToken) {
      setToken(savedToken);
      setAdminName(savedName || 'Admin');
      setAdminRole(savedRole || 'editor');
      if (savedId) setAdminId(parseInt(savedId));
      try { setAdminPermissions(JSON.parse(savedPerms || '[]')); } catch { setAdminPermissions([]); }
      setIsLoggedIn(true);
    }
  }, []);

  // Helper: check if user has a specific permission
  const hasPermission = (tab) => {
    if (adminRole === 'super_admin') return true;
    return adminPermissions.includes(tab);
  };

  // Fetch data when logged in or tab changes
  useEffect(() => {
    if (!isLoggedIn || !token) return;

    if (activeTab === 'overview') {
      fetchDashboardData();
    } else if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [isLoggedIn, token, activeTab]);

  // --- API HELPER ---
  const apiCall = async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return null;
      }
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return null;
    }
  };

  // --- LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      setToken(data.token);
      setAdminName(data.admin.name);
      setAdminRole(data.admin.role || 'editor');
      setAdminPermissions(data.admin.permissions || []);
      setAdminId(data.admin.id);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminName', data.admin.name);
      localStorage.setItem('adminRole', data.admin.role || 'editor');
      localStorage.setItem('adminPermissions', JSON.stringify(data.admin.permissions || []));
      localStorage.setItem('adminId', data.admin.id);
      setIsLoggedIn(true);
    } catch (err) {
      setLoginError('Cannot connect to server. Make sure the backend is running.');
    }
    setLoading(false);
  };

  // --- LOGOUT ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setAdminName('');
    setAdminRole('');
    setAdminPermissions([]);
    setAdminId(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminPermissions');
    localStorage.removeItem('adminId');
    setUsername('');
    setPassword('');
  };

  // --- FETCH DASHBOARD ---
  const fetchDashboardData = async () => {
    const data = await apiCall('/dashboard');
    if (data) {
      setDashboardStats(data.stats);
      setRecentActivity(data.recentActivity || []);
    }
  };

  // --- FETCH APPLICATIONS ---
  const fetchApplications = async () => {
    const data = await apiCall('/applications');
    if (data) setApplications(data.applications || []);
  };

  // --- EXPORT APPLICATIONS ---
  const exportApplicationsToCSV = () => {
    if (applications.length === 0) return;
    const headers = ['App ID', 'Applicant Name', 'Course Applied', 'Date Submitted', 'Status'];
    const csvContent = [
      headers.join(','),
      ...applications.map(app => [
        app.id,
        `"${app.name}"`,
        `"${app.course}"`,
        `"${app.date}"`,
        app.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SIET_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- UPDATE APPLICATION STATUS ---
  const updateAppStatus = async (id, newStatus) => {
    const data = await apiCall(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    });
    if (data) fetchApplications();
  };

  // --- STATUS BADGE HELPER ---
  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (['approved', 'published', 'completed', 'scheduled', 'success', 'verified'].includes(s)) return 'status-active';
    if (['rejected'].includes(s)) return '';
    return 'status-pending';
  };

  const getStatusStyle = (status) => {
    if (status?.toLowerCase() === 'rejected') {
      return { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
    }
    return {};
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="admin-dashboard-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="admin-stat-card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '60px', height: '60px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.5rem' }}>Admin Portal Login</h2>
            <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>Enter your credentials to access the dashboard</p>
          </div>

          {loginError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', outline: 'none'
                }}
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', outline: 'none'
                }}
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#64748b' : 'linear-gradient(90deg, #38bdf8, #818cf8)',
                color: '#fff', border: 'none', padding: '0.875rem',
                borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.opacity = '0.9')}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          SIET Portal
        </div>
        
        <nav className="admin-nav">
          {hasPermission('overview') && (
          <div 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard Overview
          </div>
          )}
          {hasPermission('applications') && (
          <div 
            className={`admin-nav-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Applications
          </div>
          )}
          {hasPermission('notices') && (
          <div 
            className={`admin-nav-item ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Notice Board
          </div>
          )}
          {hasPermission('documents') && (
          <div 
            className={`admin-nav-item ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Document Manager
          </div>
          )}
          {hasPermission('events') && (
          <div 
            className={`admin-nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Announcements
          </div>
          )}
          {hasPermission('gallery') && (
          <div 
            className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Gallery
          </div>
          )}
          {hasPermission('faculty') && (
          <div 
            className={`admin-nav-item ${activeTab === 'faculty' ? 'active' : ''}`}
            onClick={() => setActiveTab('faculty')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Faculty Manager
          </div>
          )}
          {hasPermission('forms') && (
          <div 
            className={`admin-nav-item ${activeTab === 'forms' ? 'active' : ''}`}
            onClick={() => setActiveTab('forms')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Public Queries
          </div>
          )}
          {hasPermission('settings') && (
          <div 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            System Settings
          </div>
          )}
          {hasPermission('menus') && (
          <div 
            className={`admin-nav-item ${activeTab === 'menus' ? 'active' : ''}`}
            onClick={() => setActiveTab('menus')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            Navigation Menus
          </div>
          )}
          {adminRole === 'super_admin' && (
          <div 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            User Management
          </div>
          )}
          
          <div 
            className="admin-nav-item"
            style={{ marginTop: 'auto', color: '#ef4444' }}
            onClick={handleLogout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <header className="admin-header">
          <h1>
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'applications' && 'Student Applications'}
            {activeTab === 'notices' && 'Manage Notices'}
            {activeTab === 'documents' && 'Document Manager'}
            {activeTab === 'events' && 'Announcements'}
            {activeTab === 'gallery' && 'Gallery Manager'}
            {activeTab === 'faculty' && 'Faculty Manager'}
            {activeTab === 'forms' && 'Public Queries'}
            {activeTab === 'settings' && 'System Settings & Branding'}
            {activeTab === 'menus' && 'Navigation Menus Management'}
            {activeTab === 'users' && 'User Management'}
          </h1>
          <div className="admin-user-profile">
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{adminName}</span>
            <div className="admin-avatar">
              {adminName ? adminName.split(' ').map(w => w[0]).join('').substring(0, 2) : 'AD'}
            </div>
          </div>
        </header>

        {/* === OVERVIEW TAB === */}
        {activeTab === 'overview' && (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Total Visitors</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                </div>
                <div className="admin-stat-value">
                  {dashboardStats ? dashboardStats.totalVisitors.toLocaleString() : '—'}
                </div>
                <div className="admin-stat-trend trend-up">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  Live from server
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Pending Applications</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                </div>
                <div className="admin-stat-value">
                  {dashboardStats ? dashboardStats.pendingApplications : '—'}
                </div>
                <div className="admin-stat-trend trend-up">
                  Requires review
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Active Notices</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                  </div>
                </div>
                <div className="admin-stat-value">
                  {dashboardStats ? dashboardStats.activeNotices : '—'}
                </div>
                <div className="admin-stat-trend trend-up">
                  From server
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Upcoming Events</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>
                <div className="admin-stat-value">
                  {dashboardStats ? dashboardStats.upcomingEvents : '—'}
                </div>
                <div className="admin-stat-trend">
                  From server
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div>
              <h2 className="admin-section-title">Recent College Activity</h2>
              <div className="admin-activity-panel">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Action</th>
                      <th>Description</th>
                      <th>User</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.length > 0 ? recentActivity.map((item, i) => (
                      <tr key={i}>
                        <td>{item.module}</td>
                        <td>
                          <span className={`status-badge`} style={{
                            background: item.action === 'Create' ? 'rgba(34, 197, 94, 0.1)' : item.action === 'Delete' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(56, 189, 248, 0.1)',
                            color: item.action === 'Create' ? '#22c55e' : item.action === 'Delete' ? '#ef4444' : '#38bdf8'
                          }}>
                            {item.action}
                          </span>
                        </td>
                        <td>{item.description}</td>
                        <td>{item.user}</td>
                        <td>{new Date(item.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8', padding: '1rem' }}>No recent activity.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* === APPLICATIONS TAB === */}
        {activeTab === 'applications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="admin-section-title" style={{ margin: 0 }}>Recent Applications</h2>
              <button 
                onClick={exportApplicationsToCSV}
                style={{
                  background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid #38bdf8',
                  padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500
                }}
              >
                Export to CSV
              </button>
            </div>
            
            <div className="admin-activity-panel">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>App ID</th>
                    <th>Applicant Name</th>
                    <th>Course Applied</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? applications.map((app) => (
                    <tr key={app.id}>
                      <td>#{app.id}</td>
                      <td>{app.name}</td>
                      <td>{app.course}</td>
                      <td>{app.date}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(app.status)}`} style={getStatusStyle(app.status)}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button
                            onClick={() => setViewingApp(app)}
                            className="admin-btn outline"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                          >
                            View
                          </button>
                          <select
                            value={app.status}
                            onChange={(e) => updateAppStatus(app.id, e.target.value)}
                            style={{
                              background: 'rgba(15, 23, 42, 0.6)', color: '#38bdf8',
                              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.25rem',
                              padding: '0.25rem 0.5rem', cursor: 'pointer', outline: 'none'
                            }}
                          >
                            <option value="Under Review">Under Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Missing Docs">Missing Docs</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8' }}>Loading applications...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Application Modal */}
        {viewingApp && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.75rem', width: '500px', maxWidth: '95%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f8fafc', margin: 0, fontSize: '1.25rem' }}>Application Details</h3>
                <button onClick={() => setViewingApp(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', color: '#cbd5e1' }}>
                <div style={{ fontWeight: 600, color: '#94a3b8' }}>App ID:</div>
                <div>#{viewingApp.id}</div>
                
                <div style={{ fontWeight: 600, color: '#94a3b8' }}>Applicant Name:</div>
                <div>{viewingApp.name}</div>
                
                <div style={{ fontWeight: 600, color: '#94a3b8' }}>Course Applied:</div>
                <div>{viewingApp.course}</div>
                
                <div style={{ fontWeight: 600, color: '#94a3b8' }}>Date Submitted:</div>
                <div>{viewingApp.date}</div>
                
                <div style={{ fontWeight: 600, color: '#94a3b8' }}>Current Status:</div>
                <div>
                  <span className={`status-badge ${getStatusClass(viewingApp.status)}`} style={getStatusStyle(viewingApp.status)}>
                    {viewingApp.status}
                  </span>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setViewingApp(null)} className="admin-btn">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* === DOCUMENTS TAB === */}
        {activeTab === 'documents' && (
          <DocumentManager token={token} />
        )}

        {/* Notice Board */}
        {activeTab === 'notices' && (
          <NoticeManager token={token} />
        )}

        {/* Events & Seminars */}
        {activeTab === 'events' && (
          <EventManager token={token} />
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && (
          <GalleryManager token={token} />
        )}

        {/* Faculty */}
        {activeTab === 'faculty' && (
          <FacultyManager token={token} />
        )}

        {/* Forms */}
        {activeTab === 'forms' && (
          <FormManager token={token} />
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <SettingsManager token={token} />
        )}

        {/* Menus */}
        {activeTab === 'menus' && (
          <MenuManager token={token} />
        )}

        {/* User Management (Super Admin only) */}
        {activeTab === 'users' && adminRole === 'super_admin' && (
          <UserManager token={token} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
