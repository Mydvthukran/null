import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Footer Component
 * Institute info, links, and contact details with social media integration
 */
const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about/about-institute' },
    { label: 'Academics', to: '/academics/academic-calendar' },
    { label: 'Departments', to: '/departments/cse' },
    { label: 'Query Form', to: '/admission-form' },
    { label: 'All Notices', to: '/all-notices' },
    { label: 'Events', to: '/events' },
    { label: 'Student Helpline', to: '/student-helpline' },
    { label: 'Staff Utilities', to: '/staff' },
    { label: 'Top-Level Sections', to: '/top-level-sections' },
  ];

  const importantLinks = [
    { label: 'Tech Admissions Haryana', href: 'https://techadmissionshry.gov.in/' },
    { label: 'Tech Education Haryana', href: 'https://www.techeduhry.gov.in/' },
    { label: 'HSTES', href: 'https://www.hstes.org.in/' },
    { label: 'Higher Education Haryana', href: 'https://highereduhry.ac.in/' },
    { label: 'AICTE', href: 'https://www.aicte.gov.in/' },
    { label: 'JEE Main', href: 'https://jeemain.nta.nic.in/' },
    { label: 'KUK Date Sheet', href: 'https://kuk.ac.in/date-sheet/' },
    { label: 'Panchkula NIC', href: 'https://panchkula.nic.in/' },
    { label: 'Nichar Haryana', href: 'https://nicharyana.nic.in/' },
    { label: 'Haryana Government', href: 'https://www.haryana.gov.in/' },
    { label: 'DIPR Haryana Twitter', href: 'https://x.com/DiprHaryana' },
    { label: 'NITTTR Chandigarh', href: 'https://www.nitttrchd.ac.in/' },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">STATE INSTITUTE OF ENGINEERING &amp; TECHNOLOGY, PANCHKULA</h3>
              <p className="footer-text">Government Institute, Haryana</p>
              <p className="footer-text footer-text-gap">
                Empowering students through quality technical education, practical learning, and strong industry readiness.
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">QUICK LINKS</h3>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">IMPORTANT LINKS</h3>
              <ul className="footer-links">
                {importantLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">CONTACT US</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div>
                    <p><a href="mailto:sietpkl@gmail.com">sietpkl@gmail.com</a></p>
                    <p style={{ marginTop: '0.2rem' }}><a href="mailto:admissions@sietpanchkula.ac.in">admissions@sietpanchkula.ac.in</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <div>
                    <p><a href="tel:01722979887">0172-2979887</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <div>
                    <h4 className="footer-find-title">FIND US</h4>
                    <p>Sector 26, Panchkula, Haryana, India</p>
                    <div className="footer-map-wrap">
                      <iframe
                        className="footer-map"
                        title="SIET Panchkula Location Map"
                        src="https://www.google.com/maps?q=State%20Institute%20of%20Engineering%20and%20Technology%2C%20Sector%2026%2C%20Panchkula%2C%20Haryana&output=embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        sandbox="allow-scripts allow-same-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="copyright">
              &copy; {currentYear} State Institute of Engineering &amp; Technology, Panchkula. All rights reserved.
            </p>
            <p className="made-by" style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              Made by lot of love ❤️ and by <Link to="/developers" style={{ color: '#fff', textDecoration: 'underline' }}>Students</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;