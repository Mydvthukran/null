import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

const SettingsManager = ({ token }) => {
  const [settings, setSettings] = useState({
    welcome_title: '',
    welcome_subtitle: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    facebook_link: '',
    twitter_link: '',
    instagram_link: '',
    linkedin_link: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data && !data.error) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage('An error occurred.');
    }
    setSaving(false);
  };

  if (loading) {
    return <div style={{ color: 'var(--ink-500)' }}>Loading settings...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="admin-section-title" style={{ margin: 0 }}>System Settings & Branding</h2>
      </div>

      {message && (
        <div style={{ 
          background: message.includes('success') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
          color: message.includes('success') ? '#22c55e' : '#ef4444',
          border: `1px solid ${message.includes('success') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' 
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="admin-activity-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--ink-900)', marginBottom: '1rem', fontSize: '1.2rem' }}>Homepage Configuration</h3>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Welcome Title</label>
            <input 
              type="text" 
              name="welcome_title" 
              value={settings.welcome_title || ''} 
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
            />
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Welcome Subtitle / Tagline</label>
            <textarea 
              name="welcome_subtitle" 
              value={settings.welcome_subtitle || ''} 
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none', resize: 'vertical' }} 
            />
          </div>
        </div>

        <div className="admin-activity-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--ink-900)', marginBottom: '1rem', fontSize: '1.2rem' }}>Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Primary Email</label>
              <input 
                type="email" 
                name="contact_email" 
                value={settings.contact_email || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Primary Phone</label>
              <input 
                type="text" 
                name="contact_phone" 
                value={settings.contact_phone || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Campus Address</label>
            <textarea 
              name="address" 
              value={settings.address || ''} 
              onChange={handleChange}
              rows={2}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none', resize: 'vertical' }} 
            />
          </div>
        </div>

        <div className="admin-activity-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--ink-900)', marginBottom: '1rem', fontSize: '1.2rem' }}>Social Media Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Facebook</label>
              <input 
                type="url" 
                name="facebook_link" 
                value={settings.facebook_link || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Twitter / X</label>
              <input 
                type="url" 
                name="twitter_link" 
                value={settings.twitter_link || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>Instagram</label>
              <input 
                type="url" 
                name="instagram_link" 
                value={settings.instagram_link || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--ink-500)', marginBottom: '0.5rem' }}>LinkedIn</label>
              <input 
                type="url" 
                name="linkedin_link" 
                value={settings.linkedin_link || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--ink-900)', outline: 'none' }} 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            disabled={saving}
            style={{ 
              background: saving ? '#64748b' : '#38bdf8', color: 'var(--ink-900)', padding: '0.75rem 2rem', 
              borderRadius: '0.5rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: 600, fontSize: '1rem'
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
