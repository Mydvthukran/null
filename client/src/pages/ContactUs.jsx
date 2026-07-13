import React, { useState } from 'react';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const res = await fetch('https://null-e3uj.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsSubmitted(true);
        setFormData(initialFormData);
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error while submitting inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" aria-label="Contact us page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Contact Us</h1>
          <div className="title-underline"></div>
          <p className="section-subtitle">Get in touch with SIET for any general inquiries.</p>
        </div>

        <div className="submenu-layout">
          <main className="submenu-main">
            <div className="submenu-content-card">
              <h2 className="submenu-section-title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="admission-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="admin-input" style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="admin-input" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="admin-input" style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="admin-input" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="admin-input" style={{ width: '100%', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="admin-btn primary" disabled={loading} style={{ marginTop: '1rem' }}>
                  {loading ? 'Submitting...' : 'Send Message'}
                </button>
                {isSubmitted && <p style={{ color: '#22c55e', marginTop: '1rem' }}>Your message has been sent successfully. We will get back to you soon.</p>}
                {errorMsg && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{errorMsg}</p>}
              </form>
            </div>
          </main>

          <aside className="submenu-aside">
            <div className="submenu-aside-card">
              <h3>Contact Information</h3>
              <p><strong>Address:</strong> State Institute of Engineering and Technology, Nilokheri, Karnal (Haryana)</p>
              <p><strong>Email:</strong> <a href="mailto:sietpkl@gmail.com">sietpkl@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:01722979887">0172-2979887</a></p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
