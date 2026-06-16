import campusImage from '../../assets/new-assets/home/hero-home/siet1.jpg';
import campusAltImage from '../../assets/new-assets/home/hero-home/siet2.jpg';
import directorImage from '../../assets/new-assets/home/principal-photo/prienciple.jpeg';
import aiMlImage from '../../assets/new-assets/home/courses/AI-ML.jpg';
import cyberImage from '../../assets/new-assets/home/courses/Cyber-Security.jpg';
import roboticsImage from '../../assets/new-assets/home/courses/Robotics-Automation.jpg';
import cseDeptImage from '../../assets/new-assets/home/courses/cse.jpeg';
import electricalDeptImage from '../../assets/new-assets/home/courses/electrical.jpeg';
import electronicsDeptImage from '../../assets/new-assets/home/courses/electronics.jpeg';
import competitionImage from '../../assets/new-assets/life at siet/events/Web-Development-Competition.jpg';
import expertLectureImage from '../../assets/new-assets/life at siet/events/Expert_Lecture-1-724x1024.jpg';
import walkInImage from '../../assets/new-assets/life at siet/events/walk-in-1024x593.png';
import campusLifeImage from '../../assets/new-assets/life at siet/gallery/1-1-1024x768.jpg';
import sportsImage from '../../assets/new-assets/life at siet/gallery/sportsmeetpic_nancy-edited.jpg';
import galleryImage from '../../assets/new-assets/life at siet/gallery/3-1-edited.jpg';
import galleryAltImage from '../../assets/new-assets/life at siet/gallery/IMG_1927-1024x768.jpg';
import libraryImage from '../../assets/new-assets/life at siet/gallery/IMG_1922-1024x768.jpg';
import inspectionImage from '../../assets/new-assets/life at siet/gallery/Inspection-Pic-1024x768.jpg';
import teacherImage from '../../assets/new-assets/depatment/facalities/teachers/anil-kumar.jpg';
import firstYearSyllabusDoc from '../../assets/new-assets/student/syllabus/B.Tech_.-1st-Year-Common-Syllabus-1 (1).pdf';
import cseAimlCsSecondYearSyllabusDoc from '../../assets/new-assets/student/syllabus/B.Tech_CSE-AIML-CS_2ndyear_2025onwards.pdf';
import roboticsAutomationSyllabusDoc from '../../assets/new-assets/student/syllabus/B.tech_syllabus_RoboticsAutomation (1).pdf';
import aimlSemesterFiveSixSyllabusDoc from '../../assets/new-assets/student/syllabus/AIML-5-6-SEM (1).pdf';
import beBtechBarchProspectusDoc from '../../assets/new-assets/student/admission prospectus/BE-BTech-BArch-Prospectus-2025.pdf';
import btechLeetProspectusDoc from '../../assets/new-assets/student/admission prospectus/BTechLE-Prospectus-2025.pdf';
import createDepartmentDemoSections from './departmentDemoSections';

const kukWebsiteUrl = 'https://kuk.ac.in/';
const kukDateSheetUrl = 'https://kuk.ac.in/date-sheet/';

const academicCalendarImage = null;
const facilitiesImage = campusImage;

/* ──────────────────────────────────────────────
   Shared anti-ragging content (used by both
   about/anti-ragging and academics/anti-ragging)
   ────────────────────────────────────────────── */
const antiRaggingBody = [
  'Ragging is strictly banned by the Government of India, State Government of Haryana, and the Hon\'ble Supreme Court. SIET enforces a zero-tolerance policy with round-the-clock vigilance by faculty and administration.'
];
const antiRaggingPoints = [
  'Penalties include expulsion, hostel eviction, withholding of scholarships, and debarring from placements.',
  'Violation is punishable by ₹25,000 fine and up to 3 years of rigorous imprisonment.',
  'Faculty are deputed at key campus locations during day and night to prevent incidents.',
  'Any form of teasing, intimidation, or coercion of junior students constitutes ragging.'
];

export const submenuData = {
  /* ═══════════════════════
     ABOUT US
     ═══════════════════════ */
  'about/history': {
    sectionLabel: 'ABOUT US',
    title: 'History',
    showHeroImage: false,
    body: [
      'State Institute of Engineering & Technology (SIET), Panchkula, is a premier government engineering college committed to excellence in technical education and innovation.',
      'Established to nurture the next generation of engineers, SIET currently operates from the shared campus of GPP (Government Polytechnic, Panchkula) Sector-26.',
      'The institute offers six cutting-edge undergraduate programs: Computer Science and Engineering , Computer Science and Engineering (AI & ML), Computer Science and Engineering (Cyber Security), Robotics & Automation, Electrical Engineering, and Electronics Engineering (VLSI Design).',
      'With a focus on industry-oriented learning, state-of-the-art facilities, and expert faculty, SIET aims to empower students with the knowledge and skills required to excel in the ever-evolving world of technology.'
    ],
    points: []
  },
  'about/about-institute': {
    sectionLabel: 'ABOUT US',
    title: 'About Institute',
    image: campusImage,
    body: [
      'State Institute of Engineering & Technology (SIET), Panchkula, is a premier government engineering college committed to excellence in technical education and innovation. Established to nurture the next generation of engineers, SIET currently operates from the shared campus of GPP (Government Polytechnic, Panchkula) Sector-26.',
      'The institute offers six cutting-edge undergraduate programs: Computer Science and Engineering (Core), Computer Science and Engineering (AI & ML), Computer Science and Engineering (Cyber Security), Robotics & Automation, Electrical Engineering, and Electronics Engineering (VLSI Design).',
      'With a focus on industry-oriented learning, state-of-the-art facilities, and expert faculty, SIET aims to empower students with the knowledge and skills required to excel in the ever-evolving world of technology.'
    ],
    points: [
      'Computer Science and Engineering - Intake: 60',
      'Computer Science and Engineering (AI & ML) - Intake: 60',
      'Computer Science and Engineering (Cyber Security) - Intake: 60',
      'Robotics & Automation - Intake: 60',
      'Electrical Engineering - Intake: 60',
      'Electronics Engineering (VLSI Design) - Intake: 60',
      'Focus on hands-on labs, projects, and industry-relevant skills.'
    ]
  },
  'about/vision-mission': {
    sectionLabel: 'ABOUT US',
    title: 'Vision & Mission',
    image: campusAltImage,
    body: [
      'Vision',
      'To be a centre of excellence in technical education, research, and innovation, fostering a skilled and ethical workforce that contributes to the sustainable development of society and the nation.',
      'Mission'
    ],
    points: [
      'Quality Education – To provide a dynamic and inclusive learning environment that nurtures creativity, problem-solving, and technical expertise.',
      'Research & Innovation – To promote research and technological advancements that address local and global challenges.',
      'Industry Collaboration – To strengthen industry-academia partnerships for hands-on learning, internships, and employability.',
      'Social Responsibility – To instil values of ethics, leadership, and sustainability for the betterment of society.',
      'Lifelong Learning – To equip students with the skills necessary for continuous learning and adaptation to emerging technologies.'
    ]
  },
  'about/directors-message': {
    sectionLabel: 'ABOUT US',
    title: "Director - Principal's Desk",
    image: directorImage,
    imageMode: 'portrait',
    body: [
      'I take the pleasure in welcoming you to State Institute of Engineering and Technology (SIET), Panchkula an institute dedicated to the proper growth and development of each and every student for a better career prospect.',
      'The institute is all set to bring out the potential within each student and provide proper guidance so that their potentials can be utilized to make them future engineers capable of meeting any challenge that will be faced by them after leaving the college. The college provides full support to improve their communication skills, critical thinking abilities, moral values and sense of responsibility. All efforts are made to improve the creativity and problem solving abilities of the students so that they can contribute their best to the society and the country.',
      'The infrastructure has been developed with most modern equipment; provisions have also been made to upgrade the same keeping pace with the technological advancements of the time. SIET has a team of highly qualified, experienced and dedicated faculty who devote their time not only to teaching but also for the overall development of the students. Further, faculty from other renowned institutions are invited to deliver guest lectures to help augment their studies beyond syllabus.',
      'We are confident that the students passing out from this college will be technically sound, confident and have good leadership skills. I wish all the best to all the prospective students.'
    ],
    points: [
      '— Prof. Anil Kumar, Director-Principal'
    ]
  },
  'about/quality-policy': {
    sectionLabel: 'ABOUT US',
    title: 'Quality Policy',
    image: teacherImage,
    points: [
      'Academic quality assurance aligned with AICTE/KUK standards.',
      'Continuous improvement in teaching-learning outcomes.',
      'Performance culture driven by measurable results.'
    ]
  },
  'about/affiliations': {
    sectionLabel: 'ABOUT US',
    title: 'Affiliations',
    image: inspectionImage,
    body: [
      'SIET is approved by AICTE, New Delhi and affiliated to Kurukshetra University (KUK).'
    ],
    resources: [],
    points: []
  },
  'about/anti-ragging': {
    sectionLabel: 'ABOUT US',
    title: 'Anti-Ragging',
    showHeroImage: false,
    body: antiRaggingBody,
    points: antiRaggingPoints
  },

  /* ═══════════════════════
     ACADEMICS — Anti-Ragging (shared content)
     ═══════════════════════ */
  'academics/anti-ragging': {
    sectionLabel: 'ACADEMICS',
    title: 'Anti-Ragging',
    showHeroImage: false,
    body: antiRaggingBody,
    points: antiRaggingPoints
  },

  /* ═══════════════════════
     DEPARTMENTS
     ═══════════════════════ */
  'departments/engineering': {
    sectionLabel: 'DEPARTMENTS',
    title: 'Engineering',
    image: facilitiesImage,
    body: [
      'Engineering education at SIET is designed to balance scientific fundamentals, practical laboratory exposure, and problem-solving through collaborative project work.',
      'Students are progressively trained from basic concepts to advanced applications, with mentoring support and outcome-based assessment in every semester.'
    ],
    points: [
      'Interdisciplinary engineering foundation across all branches.',
      'Well-equipped labs and practical-first curriculum.',
      'Project-based learning with industry exposure.',
      'Continuous assessment through quizzes, assignments, practicals, and reviews.'
    ]
  },
  'departments/ai-ml': {
    sectionLabel: 'DEPARTMENTS',
    title: 'AI & Machine Learning',
    image: aiMlImage,
    nestedSections: createDepartmentDemoSections('AI & Machine Learning', ['machine learning', 'data science'], 'ai-ml'),
    body: [
      'Focused on artificial intelligence, neural networks, and data science for building intelligent real-world systems.'
    ],
    points: [
      'Machine learning fundamentals and model development.',
      'Data science pipelines and evaluation workflows.',
      'Industry-relevant AI project exposure.'
    ]
  },
  'departments/cyber-security': {
    sectionLabel: 'DEPARTMENTS',
    title: 'Cyber Security',
    image: cyberImage,
    nestedSections: createDepartmentDemoSections('Cyber Security', ['network security', 'digital forensics'], 'cyber-security'),
    body: [
      'Specializes in securing digital systems through ethical hacking, cryptography, and forensic analysis.'
    ],
    points: [
      'Network and application security practices.',
      'Ethical hacking and digital forensics.',
      'Security operations and risk management.'
    ]
  },
  'departments/robotics': {
    sectionLabel: 'DEPARTMENTS',
    title: 'Robotics & Automation',
    image: roboticsImage,
    nestedSections: createDepartmentDemoSections('Robotics & Automation', ['control systems', 'automation'], 'robotics'),
    body: [
      'Integrates mechanical systems, electronics, and intelligent control for designing automated and smart technologies.'
    ],
    points: [
      'Control systems and embedded foundations.',
      'Sensor integration and automation workflows.',
      'Robotics prototyping and deployment.'
    ]
  },
  'departments/computer-science': {
    sectionLabel: 'DEPARTMENTS',
    title: 'Computer Science & Engineering',
    image: cseDeptImage,
    nestedSections: createDepartmentDemoSections('Computer Science & Engineering', ['programming', 'software engineering'], 'cse'),
    body: [
      'Computer Science & Engineering builds strong capability in problem-solving, software development, and systems thinking through a structured academic pathway.',
      'The program integrates coding practice, data structures, operating systems, databases, and software engineering with regular lab assignments and guided projects.',
      'Students gain exposure to development workflows, version control, testing, and deployment practices expected in modern software teams.'
    ],
    points: [
      'Strong programming and algorithmic foundation.',
      'Full-stack software engineering practices.',
      'Cloud, data, and system design exposure.',
      'Hands-on mini and major projects with review-based mentoring.',
      'Preparation for internships, coding assessments, and placement interviews.'
    ]
  },
  'departments/electrical-engineering': {
    sectionLabel: 'DEPARTMENTS',
    title: 'Electrical Engineering',
    image: electricalDeptImage,
    nestedSections: createDepartmentDemoSections('Electrical Engineering', ['power systems', 'control engineering'], 'electrical-engineering'),
    body: [
      'Prepares students for careers in power systems, automation, and control engineering through a practical, industry-aligned curriculum.'
    ],
    points: [
      'Power systems, electrical machines, and network analysis.',
      'Hands-on lab training in circuits and control engineering.',
      'Renewable energy, industrial automation, and smart grid concepts.'
    ]
  },
  'departments/electronics-vlsi': {
    sectionLabel: 'DEPARTMENTS',
    title: 'Electronics Engineering (VLSI Design)',
    image: electronicsDeptImage,
    nestedSections: createDepartmentDemoSections('Electronics Engineering (VLSI Design)', ['VLSI design', 'embedded systems'], 'electronics-vlsi'),
    body: [
      'Builds strong analog-digital electronics foundations with advanced chip design skills for the semiconductor industry.'
    ],
    points: [
      'Electronic devices, digital systems, and signal processing.',
      'VLSI design flow — HDL, simulation, and verification.',
      'Embedded systems, PCB design, and hardware prototyping.'
    ]
  },

  /* ═══════════════════════
     ACADEMICS
     ═══════════════════════ */
  'academics/courses-offered': {
    sectionLabel: 'ACADEMICS',
    title: 'Courses Offered',
    image: aiMlImage,
    body: [
      'SIET offers six B.Tech programs (intake: 60 each) designed for industry readiness.',
      'Each program follows a progressive structure that combines foundational theory, practical labs, tutorials, and guided project work across semesters.'
    ],
    points: [
      'Computer Science & Engineering — Programming, algorithms, software engineering, databases.',
      'CSE (AI & ML) — Neural networks, data science, intelligent systems.',
      'CSE (Cyber Security) — Ethical hacking, cryptography, digital forensics.',
      'Robotics & Automation — Intelligent robots, smart technologies, automation.',
      'Electrical Engineering — Power systems, machines, control engineering.',
      'Electronics (VLSI Design) — Semiconductor devices, chip design, embedded systems.',
      'Curriculum delivery includes internal assessments, practical evaluations, and semester-end examinations.',
      'Students are encouraged to build portfolios through hackathons, technical clubs, and internships.'
    ]
  },
  'academics/academic-calendar': {
    sectionLabel: 'ACADEMICS',
    title: 'Academic Calendar',
    image: academicCalendarImage,
    showHeroImage: false,
    body: [
      'Refer to the official Kurukshetra University website for the latest academic calendar, session dates, and semester timelines.'
    ],
    resources: [
      { label: 'Kurukshetra University Website', href: kukWebsiteUrl }
    ],
    points: [
      'Semester dates and class commencement notices are published by Kurukshetra University.',
      'Check the official KUK website regularly for updates to the academic calendar.'
    ]
  },
  'academics/syllabus': {
    sectionLabel: 'ACADEMICS',
    title: 'Syllabus',
    subtitle: 'Search and open the syllabus PDF for your program.',
    courses: [
      { key: 'btech-1st', label: 'B.tech 1st year', pdfUrl: firstYearSyllabusDoc },
      { key: 'btech-cse-aiml-2nd', label: 'B.tech CSE AIML-2nd year', pdfUrl: cseAimlCsSecondYearSyllabusDoc },
      { key: 'btech-cse-cs-2nd', label: 'B.tech CSE CS-2nd year', pdfUrl: cseAimlCsSecondYearSyllabusDoc },
      { key: 'btech-ra-2nd', label: 'B.tech Robotics & Automation-2nd year', pdfUrl: roboticsAutomationSyllabusDoc },
      { key: 'btech-cse-aiml-3rd', label: 'B.tech CSE AIML-3rd year', pdfUrl: aimlSemesterFiveSixSyllabusDoc },
      { key: 'btech-cse-cs-3rd', label: 'B.tech CSE CS-3rd year', pdfUrl: null },
      { key: 'btech-ra-3rd', label: 'B.tech Robotics & Automation-3rd year', pdfUrl: null },
      { key: 'btech-cse-aiml-4th', label: 'B.tech CSE AIML-4th year', pdfUrl: null },
      { key: 'btech-cse-cs-4th', label: 'B.tech CSE CS-4th year', pdfUrl: null },
      { key: 'btech-ra-4th', label: 'B.tech Robotics & Automation-4th year', pdfUrl: null }
    ],
    body: [
      'Find and download the official syllabus for each year and department below.'
    ],
    points: []
  },
  'academics/admission-prospectus': {
    sectionLabel: 'ACADEMICS',
    title: 'Admission Prospectus',
    subtitle: 'Select a prospectus document to preview.',
    documents: [
      { key: 'be-btech-barch', label: 'BE / B.Tech / B.Arch Prospectus (2025)', pdfUrl: beBtechBarchProspectusDoc },
      { key: 'btech-leet', label: 'B.Tech LEET Prospectus (2025)', pdfUrl: btechLeetProspectusDoc }
    ],
    resources: [
      { label: 'HSTES Admissions Portal', href: 'https://www.hstes.org.in/' }
    ],
    body: [
      'Preview and download official prospectus documents. For counselling updates, refer to the HSTES portal.'
    ],
    points: []
  },
  'academics/teaching-learning': {
    sectionLabel: 'ACADEMICS',
    title: 'Teaching & Learning',
    image: teacherImage,
    points: [
      'Outcome-based pedagogy with integrated classroom and lab sessions.',
      'Continuous assessment through assignments, practicals, and projects.',
      'Faculty mentoring and personalized academic guidance.'
    ]
  },
  'academics/curriculum': {
    sectionLabel: 'ACADEMICS',
    title: 'Curriculum',
    image: campusAltImage,
    points: [
      'Course-wise syllabus aligned with KUK university standards.',
      'Regular industry-driven updates to subject content.',
      'Balanced theory-practical credit mix across all semesters.'
    ]
  },
  'academics/exam-schedule': {
    sectionLabel: 'ACADEMICS',
    title: 'Exam Schedule',
    image: academicCalendarImage,
    resources: [
      { label: 'Kurukshetra University Date Sheet', href: kukDateSheetUrl },
      { label: 'Kurukshetra University Website', href: kukWebsiteUrl }
    ],
    points: [
      'External practical datesheets are announced through Kurukshetra University.',
      'Follow the notified timings and exam-day instructions published on the KUK website.',
      'Use the official KUK date sheet for current exam schedule updates.'
    ]
  },
  'academics/code-of-conduct': {
    sectionLabel: 'ACADEMICS',
    title: 'Code of Conduct',
    subtitle: 'Official student code of conduct document (PDF).',
    pdfUrl: null,
    body: [
      'The institute Code of Conduct PDF will be embedded here once available.'
    ],
    points: [],
    resources: []
  },
  'academics/student-testimonials': {
    sectionLabel: 'ACADEMICS',
    title: 'Student Testimonials',
    image: competitionImage,
    points: [
      'First-hand accounts from students about their learning experience.',
      'Placement journeys and internship highlights.',
      'Academic and co-curricular achievement stories.'
    ]
  },

  /* ═══════════════════════
     FACILITIES
     ═══════════════════════ */
  'facilities/infrastructure': {
    sectionLabel: 'FACILITIES',
    title: 'Infrastructure',
    image: facilitiesImage,
    body: [
      'SIET operates from a 5.15-acre campus in Sector 26, Panchkula with shared institutional infrastructure.'
    ],
    points: [
      'Academic blocks, labs, and seminar halls.',
      'Leased campus with planned expansion.',
      'Wi-Fi enabled premises with digital resources.'
    ]
  },
  'facilities/library': {
    sectionLabel: 'FACILITIES',
    title: 'Library',
    image: libraryImage,
    points: [
      'Central library with textbooks, reference materials, and journals.',
      'Digital access to e-resources for curriculum and project work.',
      'Reading room with structured borrowing system.'
    ]
  },
  'facilities/hostels': {
    sectionLabel: 'FACILITIES',
    title: 'Hostels',
    image: facilitiesImage,
    points: [
      'Separate hostels for boys and girls with warden supervision.',
      'Mess, common room, and basic student amenities.',
      'Hostel rules enforced for safety and discipline.'
    ]
  },
  'facilities/sports': {
    sectionLabel: 'FACILITIES',
    title: 'Sports',
    image: sportsImage,
    points: [
      'Outdoor grounds for cricket, football, and athletics.',
      'Indoor facilities for table tennis and badminton.',
      'Participation in inter-college and university-level competitions.'
    ]
  },
  'facilities/smart-classrooms': {
    sectionLabel: 'FACILITIES',
    title: 'Smart Classrooms',
    image: teacherImage,
    points: [
      'Projector-equipped classrooms with audio-visual aids.',
      'Interactive teaching tools for enhanced engagement.',
      'Hybrid-ready setup supporting digital and in-person learning.'
    ]
  },
  'facilities/laboratories': {
    sectionLabel: 'FACILITIES',
    title: 'Laboratories',
    image: roboticsImage,
    points: [
      'Department-specific labs for each B.Tech program.',
      'Hands-on experiments, mini projects, and practical sessions.',
      'Equipment maintained to safety and industry standards.'
    ]
  },
  'facilities/cafeteria': {
    sectionLabel: 'FACILITIES',
    title: 'Cafeteria',
    image: galleryAltImage,
    points: [
      'On-campus cafeteria with hygienic food services.',
      'Affordable, student-friendly menu options.',
      'Clean and comfortable dining space.'
    ]
  },
  'facilities/healthcare': {
    sectionLabel: 'FACILITIES',
    title: 'Healthcare',
    image: facilitiesImage,
    points: [
      'First-aid facility and emergency response on campus.',
      'Access to medical consultation for students and staff.',
      'Health and wellness awareness programs.'
    ]
  },
  'facilities/security': {
    sectionLabel: 'FACILITIES',
    title: 'Security',
    image: facilitiesImage,
    points: [
      '24/7 campus security with CCTV monitoring.',
      'Controlled entry/exit with visitor management.',
      'Rapid incident response and safety protocols.'
    ]
  },

  /* ═══════════════════════
     TRAINING & PLACEMENTS
     ═══════════════════════ */
  'placements/campus-training': {
    sectionLabel: 'TRAINING & PLACEMENTS',
    title: 'Campus Training',
    image: expertLectureImage,
    points: [
      'Aptitude, reasoning, and technical skill preparation.',
      'Soft skills, group discussion, and interview coaching.',
      'Mock tests and one-on-one mentoring sessions.'
    ]
  },
  'placements/placement-brochure': {
    sectionLabel: 'TRAINING & PLACEMENTS',
    title: 'Placement Brochure 2026-27',
    subtitle: 'Bridging academic excellence and industrial innovation.',
    pdfUrl: 'https://tpo.sietpanchkula.ac.in/brochure.pdf',
    body: [
      'The brochure covers batch demographics, department highlights, and the placement cell workflow. Preview below or download the PDF.'
    ],
    points: [
      'Department-wise intake and student profile snapshot.',
      'Placement process and recruiter engagement workflow.',
      'Training ecosystem and industry-readiness initiatives.'
    ],
    resources: [
      { label: 'Open Placement Portal', href: 'https://tpo.sietpanchkula.ac.in/' }
    ]
  },
  'placements/placement-records': {
    sectionLabel: 'TRAINING & PLACEMENTS',
    title: 'Placement Records',
    image: walkInImage,
    points: [
      'Placement updates and drive results shared through official notices.',
      'Department-specific placement activities announced by date.',
      'Monitor the Updates page for the latest opportunities.'
    ]
  },
  'placements/major-recruiters': {
    sectionLabel: 'TRAINING & PLACEMENTS',
    title: 'Major Recruiters',
    image: inspectionImage,
    points: [
      'Partner companies across IT, manufacturing, and service sectors.',
      'Recurring campus recruiters and hiring collaborators.',
      'Growing network of industry partnerships.'
    ]
  },
  'placements/placement-process': {
    sectionLabel: 'TRAINING & PLACEMENTS',
    title: 'Placement Process',
    image: expertLectureImage,
    points: [
      'Pre-placement talk → Aptitude test → Technical round → HR interview → Offer.',
      'Eligibility and registration criteria shared before each drive.',
      'Placement cell coordinates logistics between students and recruiters.'
    ]
  },
  'placements/student-testimonials': {
    sectionLabel: 'TRAINING & PLACEMENTS',
    title: 'Student Testimonials',
    image: competitionImage,
    points: [
      'Students share experiences from placement drives and internships.',
      'Highlights from web development, quiz, and coding competitions.',
      'Skill-building events and institute-level engagement programs.'
    ]
  },

  /* ═══════════════════════
     ALUMNI
     ═══════════════════════ */
  'alumni/alumni-directory': {
    sectionLabel: 'ALUMNI',
    title: 'Alumni Directory',
    image: campusLifeImage,
    points: [
      'Batch-wise alumni profiles with professional details.',
      'Mentorship and career guidance opportunities.',
      'Network with alumni across industries.'
    ]
  },
  'alumni/alumni-registration': {
    sectionLabel: 'ALUMNI',
    title: 'Alumni Registration',
    image: campusLifeImage,
    body: [
      'Register to stay connected with SIET\'s alumni network and receive event invitations.'
    ],
    points: [
      'Institute helpline: 0172-2929871',
      'Official email: sietpkl@gmail.com'
    ]
  },
  'alumni/alumni-events': {
    sectionLabel: 'ALUMNI',
    title: 'Alumni Events',
    image: campusLifeImage,
    points: [
      'Annual reunions and batch meetups.',
      'Guest talks, networking events, and knowledge sessions.',
      'Collaborative initiatives between alumni and current students.'
    ]
  },

  /* ═══════════════════════
     LIFE @ SIET
     ═══════════════════════ */
  'life-at-siet/campus-life': {
    sectionLabel: 'LIFE @ SIET',
    title: 'Campus Life',
    image: campusLifeImage,
    points: [
      'Student clubs for technical, cultural, and social activities.',
      'Collaborative campus environment with peer learning.',
      'Balanced academic and extracurricular experience.'
    ]
  },
  'life-at-siet/photo-gallery': {
    sectionLabel: 'LIFE @ SIET',
    title: 'Photo Gallery',
    image: galleryImage,
    points: [
      'Campus events, fests, and academic highlights.',
      'Co-curricular activities and student achievements.',
      'Infrastructure and institutional milestones in visuals.'
    ]
  },
  'life-at-siet/video-gallery': {
    sectionLabel: 'LIFE @ SIET',
    title: 'Video Gallery',
    image: galleryAltImage,
    points: [
      'Campus tours and event coverage.',
      'Student project demos and initiative clips.',
      'Official highlights and media reels.'
    ]
  },
  'life-at-siet/events-activities': {
    sectionLabel: 'LIFE @ SIET',
    title: 'Events & Activities',
    image: competitionImage,
    points: [
      'Workshops, technical fests, and expert seminars.',
      'Coding, quiz, and design competitions.',
      'Semester-wise student engagement calendar.'
    ]
  }
};
