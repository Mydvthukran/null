import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';


// Leadership images
import chiefMinister from '../assets/new-assets/home/about-leadership/chiefminister.jpg';
import educationMinister from '../assets/new-assets/home/about-leadership/mahipal-hq.png';
import principalSecretary from '../assets/new-assets/home/about-leadership/apoorva-hq.jpg';
import directorGeneral from '../assets/new-assets/home/about-leadership/SNarayanan.jpeg';
import principalPhoto from '../assets/new-assets/home/principal-photo/prienciple.jpeg';

const leaders = [
  {
    name: 'Shri Nayab Saini',
    designation: "Hon'ble Chief Minister,",
    org: 'Government of Haryana',
    image: chiefMinister,
  },
  {
    name: 'Shri Mahipal Dhanda',
    designation: "Hon'ble Education Minister,",
    org: 'Government of Haryana',
    image: educationMinister,
  },
  {
    name: 'Shri Apoorva Kumar Singh, IAS',
    designation: 'Principal Secretary Higher Education',
    org: '(Directorate of Technical Education, Haryana)',
    image: principalSecretary,
  },
  {
    name: 'Shri S. Narayanan IFoS',
    designation: 'Director General',
    org: '(Directorate of Technical Education, Haryana)',
    image: directorGeneral,
  },
];

const stats = [
  { value: 6, suffix: '', label: 'B.Tech Programs' },
  { value: 100, suffix: '%', label: 'Govt. Funded' },
  { value: 20, suffix: '+', label: 'Expert Faculty' },
  { value: 2023, suffix: '', label: 'Established' },
];

/* Animated counter hook */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.round(eased * target));
            if (progress < 1) {
              animationRef.current = requestAnimationFrame(step);
            }
          };
          animationRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [target, duration]);

  return [count, ref];
}

/* Single stat with animation */
const AnimatedStat = ({ value, suffix, label }) => {
  const [count, ref] = useCountUp(value);
  return (
    <div className="about-stat-item" ref={ref}>
      <span className="about-stat-value">{count}{suffix}</span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
};

const AboutInstituteHome = () => {
  return (
    <ScrollReveal>
      <section className="section about-us-home" aria-label="About Us">
        <div className="container">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">About Us</h2>
            <div className="title-underline"></div>
          </div>

          {/* Leadership Grid — Top Row */}
          <div className="about-leaders-grid">
            {leaders.map((leader, index) => (
              <div className="about-leader-card" key={index} style={{ animationDelay: `${index * 0.12}s` }}>
                <div className="about-leader-photo-wrap">
                  <div className="about-leader-photo">
                    <img src={leader.image} alt={leader.name} loading="lazy" />
                  </div>
                  <div className="about-leader-ring"></div>
                </div>
                <h3 className="about-leader-name">{leader.name}</h3>
                <p className="about-leader-designation">{leader.designation}</p>
                <p className="about-leader-org">{leader.org}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row — Principal + About Content */}
          <div className="about-bottom-row">
            {/* Principal Card */}
            <div className="about-leader-card about-principal-card">
              <div className="about-leader-photo-wrap">
                <div className="about-leader-photo about-principal-photo">
                  <img src={principalPhoto} alt="Prof. Anil Kumar Rose" loading="lazy" />
                </div>
                <div className="about-leader-ring"></div>
              </div>
              <h3 className="about-leader-name">Prof. Anil Kumar Rose</h3>
              <p className="about-leader-designation">Director-Principal,</p>
              <p className="about-leader-org">SIET, Panchkula</p>
            </div>

            {/* Institute Content */}
            <div className="about-mission-block">
              <div className="about-mission-quote-icon">❝</div>
              <p className="about-mission-text">
                State Institute of Engineering &amp; Technology (SIET), Panchkula, is a premier government engineering
                college committed to excellence in technical education and innovation. Established to nurture the next
                generation of engineers, SIET currently operates from the shared campus of GPP (Government Polytechnic,
                Panchkula) Sector-26. The institute offers six cutting-edge undergraduate programs: Computer Science and
                Engineering (Core), CSE (AI &amp; ML), CSE (Cyber Security), Robotics &amp; Automation, Electrical Engineering,
                and Electronics Engineering (VLSI Design).
              </p>
              <p className="about-mission-text about-mission-text-secondary">
                With a focus on industry-oriented learning, state-of-the-art facilities, and expert faculty, SIET aims
                to empower students with the knowledge and skills required to excel in the ever-evolving world of technology.
              </p>

              {/* Animated Stats Bar */}
              <div className="about-stats-bar">
                {stats.map((s, i) => (
                  <AnimatedStat key={i} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>

              <div className="about-mission-actions" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link to="/about/about-institute" className="btn btn-primary">
                  Read More
                </Link>
                <Link to="/about/mandatory-disclosure" className="btn btn-outline-gold">
                  📄 Mandatory Disclosure 2026-27
                </Link>
                <a
                  href="#courses"
                  className="btn btn-outline-gold"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('courses');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default AboutInstituteHome;
