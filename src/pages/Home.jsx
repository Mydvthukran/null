import React from 'react';
import Hero from '../components/Hero';
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
