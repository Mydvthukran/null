import React from 'react';
import { Link } from 'react-router-dom';
import cseImg from '../assets/new-assets/home/courses/cse.jpeg';
import aimlImg from '../assets/new-assets/home/courses/AI-ML.jpg';
import cyberImg from '../assets/new-assets/home/courses/Cyber-Security.jpg';
import roboticsImg from '../assets/new-assets/home/courses/Robotics-Automation.jpg';
import electricalImg from '../assets/new-assets/home/courses/electrical.jpeg';
import electronicsImg from '../assets/new-assets/home/courses/electronics.jpeg';

const admissionFormDoc = null;

/**
 * Courses Component
 * Displays current and upcoming courses offered by the college
 * Includes AI, Cyber, Robotics (current) and Electrical, Mechanical, Civil (upcoming)
 */
const Courses = () => {
  // Official "Courses Offered" (from sietpanchkula.ac.in)
  const currentCourses = [
    {
      id: 1,
      title: 'Computer Science & Engineering',
      shortCode: 'CSE',
      learnMoreHref: '/departments/cse',
      image: cseImg,
      description:
        'Covers computing fundamentals including programming, data structures, algorithms, software engineering, databases, and computer networks to build versatile IT professionals.',
      duration: '4 Years',
      status: 'ongoing',
      seats: 60
    },
    {
      id: 2,
      title: 'Computer Science and Engineering (AI & ML)',
      shortCode: 'CSE-AIML',
      learnMoreHref: '/departments/ai-ml',
      image: aimlImg,
      description:
        'Focuses on artificial intelligence and machine learning, covering data science, neural networks, and automation to develop intelligent systems for real-world problem-solving.',
      duration: '4 Years',
      status: 'ongoing',
      seats: 60
    },
    {
      id: 3,
      title: 'Computer Science and Engineering (Cyber Security)',
      shortCode: 'CSE-CS',
      learnMoreHref: '/departments/cyber-security',
      image: cyberImg,
      description:
        'Specializes in cybersecurity techniques, ethical hacking, cryptography, and digital forensics to protect systems and networks from cyber threats and ensure data security.',
      duration: '4 Years',
      status: 'ongoing',
      seats: 60
    },
    {
      id: 4,
      title: 'Robotics & Automation',
      shortCode: 'RA',
      learnMoreHref: '/departments/robotics',
      image: roboticsImg,
      description:
        'Integrates mechanical engineering, electronics, and AI to design and develop intelligent robots, automated systems, and smart technologies for industrial and real-world applications.',
      duration: '4 Years',
      status: 'ongoing',
      seats: 60
    },
    {
      id: 5,
      title: 'Electrical Engineering',
      shortCode: 'EE',
      learnMoreHref: '/departments/electrical-engineering',
      image: electricalImg,
      description:
        'Builds strong foundations in electrical machines, power systems, circuit analysis, and control engineering for modern energy and industrial applications.',
      duration: '4 Years',
      status: 'ongoing',
      seats: 60
    },
    {
      id: 6,
      title: 'Electronics Engineering (VLSI Design)',
      shortCode: 'ECE (VLSI)',
      learnMoreHref: '/departments/electronics-vlsi',
      image: electronicsImg,
      description:
        'Focuses on semiconductor devices, VLSI circuit design, embedded systems, and electronics product development for next-generation hardware innovation.',
      duration: '4 Years',
      status: 'ongoing',
      seats: 60
    }
  ];

  const upcomingCourses = [];

  const CourseCard = ({ course }) => (
    <div className={`course-card ${course.status}`}>
      <div className="course-card-image">
        {course.image ? (
          <img 
            src={course.image}
            alt={course.title}
            className="course-img"
          />
        ) : (
          <div className="course-img course-img-placeholder" aria-hidden="true" />
        )}
        <div className="course-overlay">
          <div className="course-badge">{course.status === 'upcoming' ? 'Coming Soon' : 'Available'}</div>
        </div>
      </div>
      
      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-code">Code: {course.shortCode}</p>
        
        {course.description ? <p className="course-description">{course.description}</p> : null}
        
        <div className="course-details">
          {course.duration ? (
            <div className="detail-item">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">{course.duration}</span>
            </div>
          ) : null}
          {typeof course.seats === 'number' ? (
            <div className="detail-item">
              <span className="detail-label">Seats:</span>
              <span className="detail-value">{course.seats}</span>
            </div>
          ) : null}
        </div>
        
        {course.status === 'upcoming' ? (
          admissionFormDoc ? (
            <a href={admissionFormDoc} target="_blank" rel="noopener noreferrer" className={`course-btn ${course.status}`}>
              Pre-Register
            </a>
          ) : (
            <span className={`course-btn ${course.status} course-btn-disabled`} aria-disabled="true">
              No file
            </span>
          )
        ) : (
          <Link to={course.learnMoreHref || '/departments/cse'} className={`course-btn ${course.status}`}>
            Learn More
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <section className="courses section" id="courses">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Our Programs</h2>
          <div className="title-underline"></div>
        </div>

        {/* Current Courses */}
        <div className="courses-category">
          <h3 className="category-title">Currently Offered</h3>
          <div className="courses-grid">
            {currentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Upcoming Courses */}
        {upcomingCourses.length > 0 ? (
          <div className="courses-category">
            <h3 className="category-title">Coming Soon</h3>
            <div className="courses-grid">
              {upcomingCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Courses;
