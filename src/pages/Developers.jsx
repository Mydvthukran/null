import React, { useEffect } from 'react';
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
          <div className="developer-card" key={index}>
            <div className="developer-image-container">
              {dev.image ? (
                <img src={dev.image} alt={dev.name} className="developer-image" />
              ) : (
                <div className="developer-placeholder">
                  {dev.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="developer-info">
              <h3>{dev.name}</h3>
              <span className="developer-role">{dev.role}</span>
              
              <div className="developer-links">
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
        ))}
      </div>
    </div>
  );
};

export default Developers;
