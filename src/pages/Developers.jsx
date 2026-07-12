import React, { useEffect, useRef } from 'react';
import '../css/developers.css';
import manishImg from '../assets/new-assets/collob/manish.jpeg';
import aaditiyaImg from '../assets/new-assets/collob/additiya.jpg';

const developersData = [
  {
    name: 'Manish Yadav',
    role: 'Frontend Developer',
    portfolio: 'https://manishthukran.vercel.app/',
    github: 'https://github.com/Mydvthukran',
    image: manishImg,
  },
  {
    name: 'Aaditiya Verma',
    role: 'Designer',
    portfolio: 'https://portfolio-lemon-seven-3meyfozedm.vercel.app/',
    github: 'https://github.com/vermaaaditya',
    image: aaditiyaImg,
  },
  {
    name: 'Nishith',
    role: 'Backend Developer',
    linkedin: 'https://www.linkedin.com/in/nish-yadav-3836b638b/',
    image: null,
  },
];

const TiltCard = ({ children, delay }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; // Increased max rotation slightly
    const rotateY = ((x - centerX) / centerX) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Calculate glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.1s ease-out';
  };

  return (
    <div
      className="tilt-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform', animationDelay: `${delay}s` }}
    >
      <div className="card-glare"></div>
      {children}
    </div>
  );
};

const Developers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="developers-page">
      <div className="developers-header">
        <h1>Meet the Developers</h1>
        <p>The talented students who built this platform with lot of love ❤️</p>
      </div>

      <div className="developers-container">
        {developersData.map((dev, index) => (
          <TiltCard key={index} delay={index * 0.2 + 0.3}>
            <div className="developer-card">
              <div className="developer-image-container" style={{ transform: 'translateZ(50px)' }}>
                {dev.image ? (
                  <img src={dev.image} alt={dev.name} className="developer-image" />
                ) : (
                  <div className="developer-placeholder">
                    {dev.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="developer-info" style={{ transform: 'translateZ(30px)' }}>
                <h3>{dev.name}</h3>
                <span className="developer-role">{dev.role}</span>
                
                <div className="developer-links" style={{ transform: 'translateZ(20px)' }}>
                  {dev.portfolio && (
                    <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="dev-btn portfolio-btn">
                      Portfolio
                    </a>
                  )}
                  {dev.github && (
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="dev-btn github-btn">
                      GitHub
                    </a>
                  )}
                  {dev.linkedin && (
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="dev-btn linkedin-btn">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

export default Developers;
