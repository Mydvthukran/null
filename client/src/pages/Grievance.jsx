import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../css/submenu.css';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const CATEGORIES = [
  'Academic & Teaching',
  'Anti-Ragging & Harassment',
  'Hostel & Mess',
  'Examination & Evaluation',
  'Infrastructure & Labs',
  'Administrative Services',
  'Fees & Financial Assistance',
  'General / Others'
];

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'CSE (AI & Machine Learning)',
  'CSE (Cyber Security)',
  'Robotics & Automation',
  'Electrical Engineering',
  'Electronics Engineering (VLSI)',
  'Applied Sciences / General'
];

const Grievance = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'track'

  // Submit Form State
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    email: '',
    phone: '',
    department: DEPARTMENTS[0],
    category: CATEGORIES[0],
    subject: '',
    description: '',
    is_anonymous: false
  });
  const [attachment, setAttachment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null); // { ticket_id }
  const [submitError, setSubmitError] = useState('');

  // Track State
  const [trackId, setTrackId] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedGrievance, setTrackedGrievance] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Auto populate tracking ID if query param exists
  useEffect(() => {
    const idFromQuery = searchParams.get('ticket');
    if (idFromQuery) {
      setTrackId(idFromQuery);
      setActiveTab('track');
      fetchTrackStatus(idFromQuery);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(null);
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (attachment) {
        data.append('attachment', attachment);
      }

      const res = await fetch(`${API_BASE}/grievances/submit`, {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      if (!res.ok) {
        setSubmitError(result.error || 'Failed to submit grievance.');
        setSubmitting(false);
        return;
      }

      setSubmitSuccess(result);
      setFormData({
        name: '',
        roll_number: '',
        email: '',
        phone: '',
        department: DEPARTMENTS[0],
        category: CATEGORIES[0],
        subject: '',
        description: '',
        is_anonymous: false
      });
      setAttachment(null);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Cannot connect to server. Please try again.');
    }
    setSubmitting(false);
  };

  const fetchTrackStatus = async (ticketToSearch) => {
    const query = ticketToSearch || trackId;
    if (!query.trim()) {
      setTrackError('Please enter a valid Reference Ticket ID.');
      return;
    }
    setTrackError('');
    setTrackedGrievance(null);
    setTrackingLoading(true);

    try {
      const res = await fetch(`${API_BASE}/grievances/track/${encodeURIComponent(query.trim())}`);
      const result = await res.json();
      if (!res.ok) {
        setTrackError(result.error || 'Ticket not found.');
        setTrackingLoading(false);
        return;
      }
      setTrackedGrievance(result.grievance);
    } catch (err) {
      console.error('Track error:', err);
      setTrackError('Could not reach server to verify ticket.');
    }
    setTrackingLoading(false);
  };

  const getStatusBadgeColor = (status) => {
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

  return (
    <div className="submenu-page">
      <section className="section submenu-content-section">
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Hero Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--brand-teal)',
              background: 'rgba(15, 118, 110, 0.1)',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}>
              SIET Student Welfare & Redressal Cell
            </span>
            <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
              Grievance Portal
            </h1>
            <p style={{ color: 'var(--ink-600)', maxWidth: '680px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
              State Institute of Engineering & Technology, Panchkula maintains a zero-tolerance policy against unfairness, ragging, and negligence. Submit concerns directly or track your resolution status.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1rem'
          }}>
            <button
              onClick={() => setActiveTab('submit')}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: activeTab === 'submit' ? 'var(--brand-teal)' : 'var(--surface-muted)',
                color: activeTab === 'submit' ? '#fff' : 'var(--ink-700)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📝 Submit Grievance
            </button>
            <button
              onClick={() => setActiveTab('track')}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: activeTab === 'track' ? 'var(--brand-teal)' : 'var(--surface-muted)',
                color: activeTab === 'track' ? '#fff' : 'var(--ink-700)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🔍 Track Ticket Status
            </button>
          </div>

          {/* TAB 1: SUBMIT GRIEVANCE */}
          {activeTab === 'submit' && (
            <div className="submenu-content-card" style={{ padding: '2.5rem' }}>
              
              {submitSuccess && (
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid #22c55e',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                  <h3 style={{ color: '#15803d', margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>
                    Grievance Submitted Successfully!
                  </h3>
                  <p style={{ color: 'var(--ink-700)', margin: '0 0 1.25rem 0', fontSize: '0.95rem' }}>
                    Your ticket reference ID is:
                  </p>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.75rem',
                    background: '#ffffff',
                    border: '2px dashed #22c55e',
                    borderRadius: '8px',
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    color: '#15803d',
                    letterSpacing: '0.08em',
                    marginBottom: '1.25rem'
                  }}>
                    {submitSuccess.ticket_id}
                  </div>
                  <p style={{ color: 'var(--ink-600)', fontSize: '0.88rem', margin: '0 0 1.5rem 0' }}>
                    Please save this ID to track your resolution status.
                  </p>
                  <button
                    onClick={() => {
                      setTrackId(submitSuccess.ticket_id);
                      setActiveTab('track');
                      fetchTrackStatus(submitSuccess.ticket_id);
                    }}
                    style={{
                      background: 'var(--brand-teal)',
                      color: '#fff',
                      border: 'none',
                      padding: '0.65rem 1.4rem',
                      borderRadius: '6px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Track Status Now →
                  </button>
                </div>
              )}

              {submitError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  color: '#b91c1c',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  ⚠️ {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Grievance Category */}
                <div>
                  <label style={{ display: 'block', fontWeight: '700', color: 'var(--ink-800)', marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                    Grievance Category <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '8px',
                      border: '1px solid var(--border-strong)', background: '#fff',
                      fontSize: '0.95rem', color: 'var(--ink-900)'
                    }}
                    required
                  >
                    {CATEGORIES.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Anonymous Checkbox Toggle */}
                <div style={{
                  background: 'var(--surface-muted)',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <input
                    type="checkbox"
                    id="is_anonymous"
                    name="is_anonymous"
                    checked={formData.is_anonymous}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="is_anonymous" style={{ cursor: 'pointer', fontSize: '0.92rem', color: 'var(--ink-800)', fontWeight: '600' }}>
                    🔒 Submit Anonymously (Hide your name and personal contact details from committee records)
                  </label>
                </div>

                {/* Contact Fields (Hidden if Anonymous is checked) */}
                {!formData.is_anonymous && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                        Student / Complainant Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                          border: '1px solid var(--border-strong)', background: '#fff'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                        Roll Number / Student ID
                      </label>
                      <input
                        type="text"
                        name="roll_number"
                        value={formData.roll_number}
                        onChange={handleChange}
                        placeholder="e.g. 2610940"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                          border: '1px solid var(--border-strong)', background: '#fff'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                          border: '1px solid var(--border-strong)', background: '#fff'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        style={{
                          width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                          border: '1px solid var(--border-strong)', background: '#fff'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Department Selection */}
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    style={{
                      width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                      border: '1px solid var(--border-strong)', background: '#fff'
                    }}
                  >
                    {DEPARTMENTS.map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label style={{ display: 'block', fontWeight: '700', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    Grievance Subject <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief title summarizing your complaint"
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '8px',
                      border: '1px solid var(--border-strong)', background: '#fff',
                      fontSize: '0.95rem'
                    }}
                    required
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label style={{ display: 'block', fontWeight: '700', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    Detailed Statement & Particulars <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Provide full details, dates, incidents, or background information relevant to this grievance..."
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '8px',
                      border: '1px solid var(--border-strong)', background: '#fff',
                      fontSize: '0.95rem', lineHeight: '1.5'
                    }}
                    required
                  />
                </div>

                {/* Attachment Upload */}
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: 'var(--ink-800)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    Supporting Document / Proof (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    style={{
                      padding: '0.6rem 0.8rem',
                      background: 'var(--surface-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      width: '100%'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-500)', marginTop: '0.3rem', display: 'block' }}>
                    Allowed formats: PDF, PNG, JPG, DOCX (Max size: 5MB)
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting ? 'var(--ink-500)' : 'var(--brand-teal)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.9rem',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    marginTop: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {submitting ? 'Submitting Grievance...' : 'Submit Grievance Complaint'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: TRACK TICKET STATUS */}
          {activeTab === 'track' && (
            <div className="submenu-content-card" style={{ padding: '2.5rem' }}>
              
              <h2 style={{ fontSize: '1.4rem', color: 'var(--ink-900)', marginTop: 0, marginBottom: '0.5rem' }}>
                Track Your Grievance Progress
              </h2>
              <p style={{ color: 'var(--ink-600)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                Enter the unique Ticket ID (e.g., <code>GRV-2026-9812</code>) provided when your complaint was submitted.
              </p>

              {/* Search Bar */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                <input
                  type="text"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder="e.g. GRV-2026-9812"
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em'
                  }}
                />
                <button
                  onClick={() => fetchTrackStatus()}
                  disabled={trackingLoading}
                  style={{
                    padding: '0.85rem 1.75rem',
                    background: 'var(--brand-teal)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: trackingLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {trackingLoading ? 'Searching...' : 'Track Ticket'}
                </button>
              </div>

              {trackError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  color: '#b91c1c',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  ⚠️ {trackError}
                </div>
              )}

              {trackedGrievance && (
                <div style={{
                  border: '1px solid var(--border-strong)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-soft)'
                }}>
                  
                  {/* Status Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                        Ticket Reference
                      </span>
                      <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.4rem', color: 'var(--ink-900)' }}>
                        {trackedGrievance.ticket_id}
                      </h3>
                    </div>
                    <div>
                      {(() => {
                        const style = getStatusBadgeColor(trackedGrievance.status);
                        return (
                          <span style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '999px',
                            background: style.bg,
                            color: style.color,
                            fontWeight: '800',
                            fontSize: '0.88rem'
                          }}>
                            ● {trackedGrievance.status}
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Grievance Summary Box */}
                  <div style={{ background: 'var(--surface-muted)', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--ink-500)', fontWeight: '600' }}>Category:</span>
                        <div style={{ fontWeight: '700', color: 'var(--ink-800)', fontSize: '0.92rem' }}>{trackedGrievance.category}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--ink-500)', fontWeight: '600' }}>Date Submitted:</span>
                        <div style={{ fontWeight: '600', color: 'var(--ink-800)', fontSize: '0.92rem' }}>
                          {new Date(trackedGrievance.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--ink-500)', fontWeight: '600' }}>Subject:</span>
                      <div style={{ fontWeight: '700', color: 'var(--ink-900)', fontSize: '1rem' }}>{trackedGrievance.subject}</div>
                    </div>
                  </div>

                  {/* Resolution Remarks from Committee / Admin */}
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ink-800)', fontSize: '1rem' }}>
                      Committee Resolution & Official Remarks
                    </h4>
                    {trackedGrievance.resolution_remarks ? (
                      <div style={{
                        background: '#f0fdf4',
                        border: '1px solid #86efac',
                        padding: '1.25rem',
                        borderRadius: '8px',
                        color: '#166534',
                        fontSize: '0.95rem',
                        lineHeight: '1.5'
                      }}>
                        {trackedGrievance.resolution_remarks}
                      </div>
                    ) : (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px dashed #cbd5e1',
                        padding: '1.25rem',
                        borderRadius: '8px',
                        color: 'var(--ink-500)',
                        fontSize: '0.9rem',
                        fontStyle: 'italic'
                      }}>
                        Your complaint has been logged and is currently under review by the SIET Grievance Redressal Committee. Official resolution notes will appear here once updated.
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Grievance;
