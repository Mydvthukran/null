import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import campusBuilding from '../assets/new-assets/home/hero-home/siet1.jpg';
const AboutInstituteHome = () => {
  return (
    <ScrollReveal>
      <section className="section home-about-institute" aria-label="About the institute">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About the Institute</h2>
            <div className="title-underline"></div>
          </div>

          <div className="home-about-grid">
            <div className="home-about-visual">
              <img src={campusBuilding} alt="SIET Panchkula campus building" loading="lazy" />
            </div>
            <div className="home-about-content">
              <p className="lead-text">
                State Institute of Engineering &amp; Technology (SIET), Panchkula, is a premier government engineering
                college committed to excellence in technical education and innovation. Established to nurture the next
                generation of engineers, SIET currently operates from the shared campus of GPP (Government Polytechnic,
                Panchkula) Sector-26. The institute offers six cutting-edge undergraduate programs: Computer Science and Engineering (Core), Computer Science and Engineering
                (AI &amp; ML), Computer Science and Engineering (Cyber Security), Robotics &amp; Automation, Electrical Engineering, and Electronics Engineering (VLSI Design).
                With a focus on industry-oriented learning, state-of-the-art facilities, and expert faculty, SIET aims to empower students with the knowledge and skills required to excel in the ever-evolving world of technology.
              </p>
              <div className="home-about-actions">
                <Link to="/about/about-institute" className="btn btn-primary">
                  Read More
                </Link>
                  <Link to="/departments/cse" className="btn btn-secondary">
                  Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default AboutInstituteHome;

