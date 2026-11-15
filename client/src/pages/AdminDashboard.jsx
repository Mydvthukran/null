import React, { useCallback, useEffect, useState, useRef } from 'react';
import NoticeManager from '../components/NoticeManager';
import EventManager from '../components/EventManager';
import GalleryManager from '../components/GalleryManager';
import FormManager from '../components/FormManager';
import ApplicationManager from '../components/ApplicationManager';
import FacultyManager from '../components/FacultyManager';
import DocumentManager from '../components/DocumentManager';
import SettingsManager from '../components/SettingsManager';
import MenuManager from '../components/MenuManager';
import UserManager from '../components/UserManager';
import GrievanceManager from '../components/GrievanceManager';
import { 
  auth as firebaseAuth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  firebaseSignOut 
} from '../firebase';
import '../css/adminDashboard.css';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

/**
 * Premium Admin Dashboard Component for College Website
 * Connected to the Express.js backend via REST API.
 */
const AdminDashboard = () => {
  // Authentication is maintained by an HttpOnly cookie; never keep the JWT in JS storage.
  // All API calls use credentials: 'include' to send the cookie automatically.
  const [adminName, setAdminName] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [adminPermissions, setAdminPermissions] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  // Data from API
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [documents, setDocuments] = useState([]);

  // File upload ref
  const fileInputRef = useRef(null);
  const [uploadingDocKey, setUploadingDocKey] = useState(null);

  // Update document title
  useEffect(() => {
    document.title = isLoggedIn ? "College Admin Portal | SIET" : "Admin Login | SIET";
  }, [isLoggedIn]);

  useEffect(() => {
    // Remove credentials written by older builds.
    try { window.localStorage.removeItem('adminToken'); } catch {};
    try { window.sessionStorage.removeItem('adminToken'); } catch {};
  }, []);

  // Verify existing session with the server on mount. Do not trust client storage.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
        if (!mounted) return;
        if (!res.ok) {
          setIsLoggedIn(false);
          return;
        }
        const data = await res.json();
        if (data && data.admin) {
          setAdminName(data.admin.name || '');
          setAdminRole(data.admin.role || '');
          setAdminPermissions(data.admin.permissions || []);
          setAdminId(data.admin.id || null);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Session check failed:', err);
        setIsLoggedIn(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  // Helper: check if user has a specific permission
  const hasPermission = (tab) => {
    if (adminRole === 'super_admin') return true;
    try { return Array.isArray(adminPermissions) && adminPermissions.includes(tab); } catch { return false; }
  };

  // --- LOGOUT ---
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setAdminName('');
    setAdminRole('');
    setAdminPermissions([]);
    setAdminId(null);
    try { window.sessionStorage.removeItem('adminToken'); } catch {}
    firebaseSignOut(firebaseAuth).catch(() => {});
    // Tell server to clear the cookie/session
    fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
  }, []);

  // --- API HELPER ---
  // Generic API helper that relies on HttpOnly cookies (credentials: 'include').
  const apiCall = useCallback(async (endpoint, options = {}) => {
    const headers = { ...options.headers };
    // Only set content-type for JSON bodies. If body is FormData, let fetch set appropriate headers.
    if (options.body && !(options.body instanceof FormData) && typeof options.body === 'object') {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers, credentials: 'include' });
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return null;
      }
      // Protect against non-JSON responses
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        return null;
      }
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return null;
    }
  }, [handleLogout]);

  // --- FETCH DASHBOARD ---
  const fetchDashboardData = useCallback(async () => {
    const data = await apiCall('/dashboard');
    if (data) {
      setDashboardStats(data.stats);
      setRecentActivity(data.recentActivity || []);
    }
  }, [apiCall]);

  // Fetch data when logged in or tab changes
  useEffect(() => {
    if (!isLoggedIn) return;

    const timeoutId = window.setTimeout(() => {
      if (activeTab === 'overview') {
        fetchDashboardData();
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isLoggedIn, activeTab, fetchDashboardData]);

  // --- FIREBASE GOOGLE AUTH HANDLER ---
  const handleFirebaseTokenExchange = async (idToken) => {
    try {
      const res = await fetch(`${API_BASE}/auth/firebase-login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Server rejected credentials.');
        setLoading(false);
        return;
      }

      setAdminName(data.admin.name);
      setAdminRole(data.admin.role || 'editor');
      setAdminPermissions(data.admin.permissions || []);
      setAdminId(data.admin.id);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Server connection error:', err);
      setLoginError('Cannot connect to backend server. Ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const idToken = await result.user.getIdToken();
      await handleFirebaseTokenExchange(idToken);
    } catch (err) {
      console.error('Firebase Google login error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setLoginError('Sign-in cancelled. Please click the button to try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setLoginError('');
      } else {
        setLoginError(err.message || 'Google sign-in failed.');
      }
      setLoading(false);
    }
  };

  // --- LOGIN SCREEN (Google Authentication Only) ---
  if (!isLoggedIn) {
    return (
      <div className="admin-dashboard-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1.5rem', background: 'var(--surface-sunken, #f8fafc)' }}>
        <div className="admin-stat-card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', boxShadow: '0 16px 40px rgba(0,0,0,0.06)', borderRadius: '1rem', border: '1px solid var(--border-subtle, #e2e8f0)', background: 'var(--surface, #ffffff)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--brand-teal, #0d9488), #0284c7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(13, 148, 136, 0.25)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke='currentColor' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h2 style={{ margin: 0, color: 'var(--ink-900, #0f172a)', fontSize: '1.625rem', fontWeight: 700, letterSpacing: '-0.02em' }}>SIET Admin Portal</h2>
            <p style={{ color: 'var(--ink-500, #64748b)', margin: '0.625rem 0 0 0', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Sign in with your authorized administrator Google Account
            </p>
          </div>

          {loginError && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.08)', 
              border: '1px solid var(--danger, #ef4444)', 
              color: 'var(--danger, #dc2626)', 
              padding: '0.875rem 1rem', 
              borderRadius: '0.625rem', 
              marginBottom: '1.5rem', 
              fontSize: '0.875rem', 
              textAlign: 'center', 
              lineHeight: 1.5 
            }}>
              {loginError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.875rem',
                padding: '0.9375rem 1.25rem',
                borderRadius: '0.625rem',
                border: '1px solid var(--border-strong, #cbd5e1)',
                background: loading ? '#f1f5f9' : '#ffffff',
                color: '#1e293b',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.borderColor = '#0d9488', e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.borderColor = '#cbd5e1', e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              {loading ? 'Authenticating with Google...' : 'Sign in with Google'}
            </button>
          </div>

          <div style={{ marginTop: '1.75rem', padding: '0.875rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Authorized Administrator:</span>
            <code style={{ fontSize: '0.8125rem', color: '#0f766e', fontWeight: 600 }}>my3596418@gmail.com</code>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <div className="admin-dashboard-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            SIET Portal
          </div>
          <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
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
            Admission
          </div>
          )}
          {hasPermission('forms') && (
          <div 
            className={`admin-nav-item ${activeTab === 'forms' ? 'active' : ''}`}
            onClick={() => setActiveTab('forms')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Contact Forms
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
          {hasPermission('grievances') && (
          <div 
            className={`admin-nav-item ${activeTab === 'grievances' ? 'active' : ''}`}
            onClick={() => setActiveTab('grievances')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Grievance Redressal
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
            style={{ marginTop: 'auto', color: 'var(--danger)' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1>
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'applications' && 'Admission'}
            {activeTab === 'forms' && 'Contact Forms'}
            {activeTab === 'notices' && 'Manage Notices'}
            {activeTab === 'documents' && 'Document Manager'}
            {activeTab === 'events' && 'Announcements'}
            {activeTab === 'gallery' && 'Gallery Manager'}
            {activeTab === 'faculty' && 'Faculty Manager'}
            {activeTab === 'grievances' && 'Grievance Redressal Cell'}
            {activeTab === 'settings' && 'System Settings & Branding'}
            {activeTab === 'menus' && 'Navigation Menus Management'}
            {activeTab === 'users' && 'User Management'}
          </h1>
          </div>
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
                      <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--ink-500)', padding: '1rem' }}>No recent activity.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* === APPLICATIONS TAB === */}
        {activeTab === 'applications' && (
          <ApplicationManager />
        )}

        {/* === FORMS TAB === */}
        {activeTab === 'forms' && (
          <FormManager title="Contact Us Inquiries" />
        )}

        {/* === DOCUMENTS TAB === */}
        {activeTab === 'documents' && (
          <DocumentManager />
        )}

        {/* Notice Board */}
        {activeTab === 'notices' && (
          <NoticeManager />
        )}

        {/* Events & Seminars */}
        {activeTab === 'events' && (
          <EventManager />
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && (
          <GalleryManager />
        )}

        {/* Faculty */}
        {activeTab === 'faculty' && (
          <FacultyManager />
        )}

        {/* Grievances */}
        {activeTab === 'grievances' && (
          <GrievanceManager />
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <SettingsManager />
        )}

        {/* Menus */}
        {activeTab === 'menus' && (
          <MenuManager />
        )}

        {/* User Management (Super Admin only) */}
        {activeTab === 'users' && adminRole === 'super_admin' && (
          <UserManager currentAdminId={adminId} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
