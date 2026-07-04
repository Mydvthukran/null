import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroBg1 from '../assets/new-assets/home/hero-home/siet1.jpg';
import heroBg2 from '../assets/new-assets/home/hero-home/siet2.jpg';
import heroBg3 from '../assets/new-assets/home/hero-home/siet3.jpeg';
import heroBg4 from '../assets/new-assets/home/hero-home/siet2.webp';
import { ADMISSIONS_CONFIG } from '../config/admissions';
/**
 * Hero Component
 * Hero banner with rotating backgrounds and quick actions
 */
const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [heroBg1, heroBg2, heroBg3, heroBg4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <img
          src={heroImages[currentImageIndex]}
          alt="College Campus"
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <p className="hero-eyebrow">Admissions Open for 2026-27 Session</p>
            <h1 className="hero-title">
              Engineering Education Built for Real-World Impact
            </h1>
            <p className="hero-subtitle">
              Learn from faculty mentors, build in modern labs, and graduate with the confidence to lead in AI, Cyber Security, Robotics, Computer Science (Core), Electrical Engineering, and Electronics Engineering (VLSI Design).
            </p>
            <div className="hero-buttons">
              <a href="https://techadmissionshry.gov.in/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Admission Portal
              </a>
              <Link to="/admission-form" className="btn btn-secondary">
                Query Form
              </Link>
              {/* {!ADMISSIONS_CONFIG.hstesOpen && (
                <a 
                  href={ADMISSIONS_CONFIG.COUNSELLING_GOOGLE_FORM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                >
                  Offline Counselling
                </a>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-indicators">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
