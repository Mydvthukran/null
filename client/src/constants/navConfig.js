export const navItems = [
  {
    name: 'Home',
    href: '/',
    submenu: null
  },
  {
    name: 'About Us',
    href: '/about',
    submenu: [
      { name: 'History', href: '/about/history' },
      { name: 'About Institute', href: '/about/about-institute' },
      { name: 'Vision & Mission', href: '/about/vision-mission' },
      { name: "Director - Principal's Desk", href: '/about/directors-message' },
      { name: 'Registrar\'s Desk', href: '/about/registrars-message' },
      { name: 'Mandatory Disclosure 2026-27', href: '/about/mandatory-disclosure' },
      { name: 'Unnat Bharat Abhiyan', href: 'https://unnatbharatabhiyan.gov.in/', external: true }
    ]
  },
  {
    name: 'Departments',
    href: '/departments',
    submenu: [
      {
        name: 'Computer Science & Engineering',
        href: '/departments/cse',
        submenu: [
          { name: 'About Department', href: '/departments/cse#about-department' },
          { name: 'Vision & Mission', href: '/departments/cse#vision-mission' },
          { name: 'Faculty', href: '/departments/cse#faculty' },
          { name: 'Time Table', href: '/departments/cse#time-table' }
        ]
      },
      {
        name: 'Computer Science & Engineering(AI & Machine Learning)',
        href: '/departments/ai-ml',
        submenu: [
          { name: 'About Department', href: '/departments/ai-ml#about-department' },
          { name: 'Vision & Mission', href: '/departments/ai-ml#vision-mission' },
          { name: 'Faculty', href: '/departments/ai-ml#faculty' },
          { name: 'Time Table', href: '/departments/ai-ml#time-table' }
        ]
      },
      {
        name: 'Computer Science & Engineering(Cyber Security)',
        href: '/departments/cyber-security',
        submenu: [
          { name: 'About Department', href: '/departments/cyber-security#about-department' },
          { name: 'Vision & Mission', href: '/departments/cyber-security#vision-mission' },
          { name: 'Faculty', href: '/departments/cyber-security#faculty' },
          { name: 'Time Table', href: '/departments/cyber-security#time-table' }
        ]
      },
      {
        name: 'Robotics & Automation',
        href: '/departments/robotics',
        submenu: [
          { name: 'About Department', href: '/departments/robotics#about-department' },
          { name: 'Vision & Mission', href: '/departments/robotics#vision-mission' },
          { name: 'Faculty', href: '/departments/robotics#faculty' },
          { name: 'Time Table', href: '/departments/robotics#time-table' }
        ]
      },
      {
        name: 'Electrical Engineering',
        href: '/departments/electrical-engineering',
        submenu: [
          { name: 'About Department', href: '/departments/electrical-engineering#about-department' },
          { name: 'Vision & Mission', href: '/departments/electrical-engineering#vision-mission' },
          { name: 'Faculty', href: '/departments/electrical-engineering#faculty' },
          { name: 'Time Table', href: '/departments/electrical-engineering#time-table' }
        ]
      },
      {
        name: 'Electronics Engineering (VLSI Design)',
        href: '/departments/electronics-vlsi',
        submenu: [
          { name: 'About Department', href: '/departments/electronics-vlsi#about-department' },
          { name: 'Vision & Mission', href: '/departments/electronics-vlsi#vision-mission' },
          { name: 'Faculty', href: '/departments/electronics-vlsi#faculty' },
          { name: 'Time Table', href: '/departments/electronics-vlsi#time-table' }
        ]
      }
    ]
  },
  {
    name: 'Student',
    href: '/academics',
    submenu: [
      { name: 'Academic Calendar', href: '/academics/academic-calendar' },
      { name: 'Syllabus', href: '/academics/syllabus' },
      { name: 'Query Form', href: '/admission-form' },
      { name: 'Admission Prospectus', href: '/academics/admission-prospectus' },
      { name: 'Pay Fees Online', href: '/pay-fees-online' },
      { name: 'Exam Schedule', href: '/academics/exam-schedule' },
      { name: 'Scholarships', href: '/academics/scholarships' },
      { name: 'Dress Code', href: '/academics/dress-code' },
      { name: 'Grievance Portal', href: 'https://grievance.sietpanchkula.ac.in/', external: true },
      { name: 'Code of Conduct', href: '/academics/code-of-conduct' },
      { name: 'Anti-Ragging', href: '/academics/anti-ragging' },
      { name: 'SIH 2026', href: '/sih-2026' },
      { name: 'Clubs', href: '/life-at-siet/clubs' }
    ]
  },
  {
    name: 'Facilities',
    href: '/facilities',
    submenu: [
      { name: 'Infrastructure', href: '/facilities/infrastructure' },
      { name: 'Library', href: '/facilities/library' },
      { name: 'Hostel', href: '/facilities/hostels' },
      { name: 'Sports', href: '/facilities/sports' },
      { name: 'Smart Classrooms', href: '/facilities/smart-classrooms' },
      { name: 'Laboratories', href: '/facilities/laboratories' },
      { name: 'Cafeteria', href: '/facilities/cafeteria' },
      { name: 'Healthcare', href: '/facilities/healthcare' },
      { name: 'Security', href: '/facilities/security' }
    ]
  },
  {
    name: 'Training & Placements',
    href: 'https://tpo.sietpanchkula.ac.in/',
    external: true,
    submenu: null
  },
  {
    name: 'Alumni',
    href: '/alumni',
    submenu: [
      { name: 'Alumni Directory', href: '/alumni/alumni-directory' },
      { name: 'Alumni Registration', href: '/alumni/alumni-registration' },
      { name: 'Alumni Events', href: '/alumni/alumni-events' }
    ]
  },
  {
    name: 'Life @ SIET',
    href: '/life-at-siet',
    submenu: [
      { name: 'Life @ SIET Overview', href: '/life-at-siet' },
      { name: 'Events', href: '/events' },
      { name: 'SIH 2026', href: '/sih-2026' },
      { name: 'Student Helpline', href: '/student-helpline' },
      { name: 'Top-Level Sections', href: '/top-level-sections' },
      { name: 'Content Differences', href: '/content-differences' },
      { name: 'Clubs', href: '/life-at-siet/clubs' }
    ]
  },
  {
    name: 'Admissions',
    href: '/admission-helpline',
    submenu: [
      { name: 'Admission Helpline', href: '/admission-helpline' },
      { name: 'Admission Prospectus', href: '/academics/admission-prospectus' },
      { name: 'Admission Documents', href: '/admission-documents' },
      { name: 'Pay Fees Online', href: '/pay-fees-online' },
      { name: 'Physical Counselling', href: '/physical-counselling' }
    ]
  },
  {
    name: 'SIH 2026',
    href: '/sih-2026',
    submenu: null
  },
  {
    name: 'Jobs',
    href: '/jobs',
    submenu: null
  }
];
