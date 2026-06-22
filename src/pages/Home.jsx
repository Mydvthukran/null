import React from 'react';
import Hero from '../components/Hero';
import mouImg1 from '../assets/new-assets/home/hero-home/iit-ropar-mou-1.jpeg';
import mouImg2 from '../assets/new-assets/home/hero-home/iit-ropar-mou-2.jpeg';
import AboutInstituteHome from '../components/AboutInstituteHome';
import DirectorDesk from '../components/DirectorDesk';
import VisionMissionHome from '../components/VisionMissionHome';
import Courses from '../components/Courses';
import InfoCards from '../components/InfoCards';
import TopAnnouncements from '../components/TopAnnouncements';
import BannerCarousel from '../components/BannerCarousel';

/**
 * Home Page Component
 * Main landing page with hero, director's desk, and other sections
 */
function Home() {
  return (
    <div>
      <TopAnnouncements />

      {/* Hero Section with Banner Image */}
      <Hero />

      {/* MoU Section */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ fontSize: '1.8rem', textTransform: 'none', lineHeight: '1.4' }}>
              IIT Ropar and SIET Panchkula Sign Landmark MoU for Academic, Faculty, and Student Exchange Cooperation
            </h2>
            <div className="title-underline"></div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
            <img src={mouImg1} alt="IIT Ropar and SIET Panchkula MoU Signing" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
            <img src={mouImg2} alt="IIT Ropar and SIET Panchkula MoU Signing" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* About Institute */}
      <AboutInstituteHome />

      {/* Vision & Mission */}
      <VisionMissionHome />

      {/* Director's Message Section */}
      <DirectorDesk />

      {/* Courses Section - Current and Upcoming Programs */}
      <Courses />

      {/* Information Cards: News, Notifications, Placements */}
      <InfoCards />

      {/* Institute Gallery (below campus updates cards) */}
      <BannerCarousel />
    </div>
  );
}

export default Home;
