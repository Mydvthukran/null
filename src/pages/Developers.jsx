import React, { useEffect, useRef, useState } from 'react';
import '../css/developers.css';
import manishImg from '../assets/new-assets/collob/manish.jpeg';
import aaditiyaImg from '../assets/new-assets/collob/additiya.jpg';

const developersData = [
  {
    name: 'Manish Yadav',
    role: 'Frontend Master',
    theme: '#3b82f6', // Blue
    portfolio: 'https://manishthukran.vercel.app/',
    github: 'https://github.com/Mydvthukran',
    image: manishImg,
    stats: [
      { label: 'UI / UX', value: 95 },
      { label: 'React.js', value: 98 },
      { label: 'CSS Magic', value: 99 }
    ]
  },
  {
    name: 'Aaditiya Verma',
    role: 'Design Lead',
    theme: '#ec4899', // Pink
    portfolio: 'https://portfolio-lemon-seven-3meyfozedm.vercel.app/',
    github: 'https://github.com/vermaaaditya',
    image: aaditiyaImg,
    stats: [
      { label: 'Creativity', value: 100 },
      { label: 'Figma', value: 98 },
      { label: 'Vision', value: 95 }
    ]
  },
  {
    name: 'Nishith',
    role: 'Backend Ninja',
    theme: '#10b981', // Green
    linkedin: 'https://www.linkedin.com/in/nish-yadav-3836b638b/',
    image: null,
    stats: [
      { label: 'Architecture', value: 98 },
      { label: 'Databases', value: 95 },
      { label: 'API Design', value: 96 }
    ]
  },
];

const TiltCard = ({ children, delay, themeColor }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Extreme 3D Tilt
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

    // Calculate glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 50%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
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
      style={{ 
        transformStyle: 'preserve-3d', 
        willChange: 'transform', 
        animationDelay: `${delay}s`,
        '--card-theme': themeColor
      }}
    >
      {/* Animated glowing border behind the card */}
      <div className="card-border-glow"></div>
      
      <div className="card-glare"></div>
      {children}
    </div>
  );
};

const Developers = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <div className="developers-page">
      {/* Interactive Spotlight tracking the mouse */}
      <div 
        className="mouse-spotlight" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} 
      />
      
      {/* Tech Grid Background */}
      <div className="tech-grid-bg"></div>

      <div className="developers-header">
        <h1 data-text="The Creators">The Creators</h1>
        <p>The elite minds that architected this platform.</p>
      </div>

      <div className="developers-container">
        {developersData.map((dev, index) => (
          <TiltCard key={index} delay={index * 0.2 + 0.3} themeColor={dev.theme}>
            <div className="developer-card">
              
              <div className="card-top-accent"></div>
              
              <div className="developer-image-container" style={{ transform: 'translateZ(60px)' }}>
                {dev.image ? (
                  <img src={dev.image} alt={dev.name} className="developer-image" />
                ) : (
                  <div className="developer-placeholder" style={{ background: `linear-gradient(135deg, ${dev.theme}, #000)` }}>
                    {dev.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="developer-info" style={{ transform: 'translateZ(40px)' }}>
                <h3 className="glitch-text">{dev.name}</h3>
                <span className="developer-role" style={{ color: dev.theme, borderColor: dev.theme, boxShadow: `0 0 10px ${dev.theme}40` }}>
                  {dev.role}
                </span>
                
                {/* TRADING CARD STATS */}
                <div className="dev-stats-container">
                  {dev.stats.map((stat, i) => (
                    <div className="dev-stat" key={i}>
                      <div className="stat-header">
                        <span className="stat-label">{stat.label}</span>
                        <span className="stat-value">{stat.value}</span>
                      </div>
                      <div className="stat-bar-bg">
                        <div 
                          className="stat-bar-fill" 
                          style={{ width: `${stat.value}%`, backgroundColor: dev.theme, boxShadow: `0 0 8px ${dev.theme}` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="developer-links" style={{ transform: 'translateZ(20px)' }}>
                  {dev.portfolio && (
                    <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="dev-btn hover-glow">
                      Portfolio
                    </a>
                  )}
                  {dev.github && (
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="dev-btn hover-glow">
                      GitHub
                    </a>
                  )}
                  {dev.linkedin && (
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="dev-btn hover-glow">
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
