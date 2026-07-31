import React from 'react';
import { Link } from 'react-router-dom';
import haryanaEmblem from '../assets/new-assets/navbar/logos/haryana-sarkar.png';
import sietLogo from '../assets/new-assets/navbar/logos/newlogo.jpg';

/**
 * Header Component
 * Displays institute identity and key highlights
 */
const Header = React.memo(() => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content tpo-header-content">
          <div className="tpo-header-emblem header-emblem-left">
            <img
              className="tpo-gov-emblem"
              src={sietLogo}
              alt="SIET Panchkula Logo"
              loading="eager"
              fetchpriority="high"
            />
          </div>

          <div className="header-info tpo-header-info">
            <p className="tpo-header-hindi" lang="hi">राज्य अभियांत्रिकी एवं प्रौद्योगिकी संस्थान, पंचकुला</p>
            <h1 className="college-name tpo-college-name">STATE INSTITUTE OF ENGINEERING &amp; TECHNOLOGY, PANCHKULA</h1>
            <p className="college-subtitle tpo-college-subtitle">
              APPROVED BY AICTE, NEW DELHI AND AFFILIATED TO KURUKSHETRA UNIVERSITY, KURUKSHETRA
            </p>
            
            
          </div>
          <Link to="/" className="tpo-header-emblem header-logo tpo-header-logo" aria-label="SIET Panchkula Home">
            <img src={haryanaEmblem} alt="Haryana Government Emblem" loading="eager" fetchpriority="high" />
          </Link>
          
        </div>
      </div>
    </header>
  );
});

export default Header;
