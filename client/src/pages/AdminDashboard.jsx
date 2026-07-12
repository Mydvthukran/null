import React, { useEffect, useState } from 'react';
import '../css/adminDashboard.css';

/**
 * Premium Admin Dashboard Component for College Website
 * Includes a Login screen and specific features like Applications and Total Visitors.
 */
const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Update document title
  useEffect(() => {
    document.title = isLoggedIn ? "College Admin Portal | SIET" : "Admin Login | SIET";
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic: accept any non-empty credentials for demo
    if (username && password) {
      setIsLoggedIn(true);
    }
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
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                color: '#fff', border: 'none', padding: '0.875rem',
                borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600,
                cursor: 'pointer', marginTop: '0.5rem', transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Sign In
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
          <div 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard Overview
          </div>
          <div 
            className={`admin-nav-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Applications
          </div>
          <div 
            className={`admin-nav-item ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Notice Board
          </div>
          <div 
            className={`admin-nav-item ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Document Manager
          </div>
          <div 
            className={`admin-nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Events & Seminars
          </div>
          
          <div 
            className="admin-nav-item"
            style={{ marginTop: 'auto', color: '#ef4444' }}
            onClick={() => setIsLoggedIn(false)}
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
            {activeTab === 'notices' && 'Notice Board Editor'}
            {activeTab === 'documents' && 'Document Manager'}
            {activeTab === 'events' && 'Events & Seminars'}
          </h1>
          <div className="admin-user-profile">
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Admin</span>
            <div className="admin-avatar">
              AD
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Total Visitors</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                </div>
                <div className="admin-stat-value">124,563</div>
                <div className="admin-stat-trend trend-up">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  +14.5% from last month
                </div>
              </div>



              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Active Notices</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                  </div>
                </div>
                <div className="admin-stat-value">12</div>
                <div className="admin-stat-trend trend-up">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  3 new this week
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <span>Upcoming Events</span>
                  <div className="admin-stat-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>
                <div className="admin-stat-value">4</div>
                <div className="admin-stat-trend">
                  Next: Tech Symposium
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
                      <th>Activity Description</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Admissions</td>
                      <td>New B.Tech CSE Application (#APP-4029)</td>
                      <td>Today, 10:42 AM</td>
                      <td><span className="status-badge status-pending">Pending Review</span></td>
                    </tr>
                    <tr>
                      <td>Notices</td>
                      <td>Mid-Semester Exam Datesheet Published</td>
                      <td>Yesterday, 03:00 PM</td>
                      <td><span className="status-badge status-active">Published</span></td>
                    </tr>
                    <tr>
                      <td>Events</td>
                      <td>Guest Lecture by Industry Expert added</td>
                      <td>Yesterday, 11:15 AM</td>
                      <td><span className="status-badge status-active">Scheduled</span></td>
                    </tr>
                    <tr>
                      <td>Academics</td>
                      <td>CSE Department Lesson Plans Updated</td>
                      <td>Oct 12, 09:30 AM</td>
                      <td><span className="status-badge status-active">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="admin-section-title" style={{ margin: 0 }}>Recent Applications</h2>
              <button style={{
                background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid #38bdf8',
                padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500
              }}>
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
                  <tr>
                    <td>#APP-4029</td>
                    <td>Rahul Sharma</td>
                    <td>B.Tech Computer Science</td>
                    <td>Oct 24, 2026</td>
                    <td><span className="status-badge status-pending">Under Review</span></td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#APP-4028</td>
                    <td>Priya Patel</td>
                    <td>B.Tech Electronics</td>
                    <td>Oct 23, 2026</td>
                    <td><span className="status-badge status-active">Approved</span></td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#APP-4027</td>
                    <td>Amit Kumar</td>
                    <td>B.Tech Mechanical</td>
                    <td>Oct 21, 2026</td>
                    <td><span className="status-badge status-pending">Missing Docs</span></td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#APP-4026</td>
                    <td>Neha Singh</td>
                    <td>B.Tech Civil</td>
                    <td>Oct 20, 2026</td>
                    <td><span className="status-badge status-active">Approved</span></td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#APP-4025</td>
                    <td>Vikram Verma</td>
                    <td>B.Tech Computer Science</td>
                    <td>Oct 18, 2026</td>
                    <td><span className="status-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Rejected</span></td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}>View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Document Manager Tab */}
        {activeTab === 'documents' && (
          <div>
            <div className="document-upload-area">
              <svg className="document-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Click or drag to upload new document</h3>
              <p style={{ color: '#94a3b8', margin: 0 }}>Support for PDF, DOCX, XLSX (Max 10MB)</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="admin-section-title" style={{ margin: 0 }}>Website Documents</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Search..." style={{
                  padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(15, 23, 42, 0.6)', color: '#fff', outline: 'none'
                }} />
              </div>
            </div>

            <div className="admin-activity-panel">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      Academic_Calendar_2026.pdf
                    </div></td>
                    <td>Academics</td>
                    <td>245 KB</td>
                    <td>Oct 15, 2026</td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', marginRight: '0.5rem' }}>Replace</button>
                      <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      Admission_Brochure_2026.pdf
                    </div></td>
                    <td>Admissions</td>
                    <td>4.2 MB</td>
                    <td>Sep 20, 2026</td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', marginRight: '0.5rem' }}>Replace</button>
                      <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      Fee_Structure_BTech.xlsx
                    </div></td>
                    <td>Finance</td>
                    <td>128 KB</td>
                    <td>Aug 10, 2026</td>
                    <td>
                      <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', marginRight: '0.5rem' }}>Replace</button>
                      <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Temporary placeholders for other tabs */}
        {(activeTab === 'notices' || activeTab === 'events') && (
          <div className="admin-activity-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ marginBottom: '1.5rem', color: '#38bdf8' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <h2 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Module Under Construction</h2>
            <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '0 auto' }}>
              The {activeTab} management interface is currently being integrated with the college backend systems.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
