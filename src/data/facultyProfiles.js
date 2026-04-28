import ankitaPhoto from '../assets/new-assets/depatment/facalities/teachers/ANKITA.jpg';
import divyaGargPhoto from '../assets/new-assets/depatment/facalities/teachers/DIVYAGARG.jpg';
import divyaSinglaPhoto from '../assets/new-assets/depatment/facalities/teachers/DIVYASINGLA (1).jpg';
import elamPhoto from '../assets/new-assets/depatment/facalities/teachers/ELAM.jpg';
import luxmiPhoto from '../assets/new-assets/depatment/facalities/teachers/LUXMI.jpg';
import milapPhoto from '../assets/new-assets/depatment/facalities/teachers/MILAP.jpg';
import monikaPhoto from '../assets/new-assets/depatment/facalities/teachers/MONIKA.jpg';
import niveditaPhoto from '../assets/new-assets/depatment/facalities/teachers/NAVNEETA.jpg';
import reenaPhoto from '../assets/new-assets/depatment/facalities/teachers/REENADULL.jpg';
import rituPhoto from '../assets/new-assets/depatment/facalities/teachers/RITU.jpg';
import tusharPhoto from '../assets/new-assets/depatment/facalities/teachers/TUSHAR.jpg';

const ALL_DEPARTMENTS = [
  'cse',
  'ai-ml',
  'cyber-security',
  'robotics',
  'electrical-engineering',
  'electronics-vlsi'
];

const facultyProfilesData = [
  {
    slug: 'dr-milap-sharma',
    name: 'Dr. Milap Sharma',
    designation: 'Assistant Professor',
    qualification: 'Ph.D., M.Tech., B.Tech.',
    email: 'milapsharma25@gmail.com',
    areaOfInterest:
      'Computer Aided Design, Sensors, Production & Industrial Engineering, Ergonomics, Research Methodology',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682368',
    image: 'https://sietpanchkula.ac.in/wp-content/uploads/2026/02/Picture1.jpg',
    departments: ['robotics', 'electronics-vlsi']
  },
  {
    slug: 'mrs-ankita-jiwan',
    name: 'Mrs. Ankita Jiwan',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'jiwan.soloman.ankita@gmail.com',
    areaOfInterest: 'Object Oriented Programming, Database System, C, C++, Python',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682850',
    image: null,
    departments: ['cse']
  },
  {
    slug: 'dr-divya-garg',
    name: 'Dr. Divya Garg',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (CSE), M.Tech. (CSE), B.Tech. (CSE)',
    email: 'divya29garg@gmail.com',
    areaOfInterest: 'Affective Computing, Artificial Intelligence, Human Computer Interaction',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682325',
    image: null,
    departments: ['ai-ml', 'cse']
  },
  {
    slug: 'mrs-priyanka-diwan-goyal',
    name: 'Mrs. Priyanka Diwan Goyal',
    designation: 'Assistant Professor',
    qualification: 'M.Tech. (CSE), B.Tech. (CSE)',
    email: 'diwan.priyanka@gmail.com',
    areaOfInterest:
      'C, C++, VB, Network Security, Software Engineering, Wireless Sensor Networks, Artificial Intelligence',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682537',
    image: null,
    departments: ['cyber-security', 'cse']
  },
  {
    slug: 'ms-luxmi-sharma',
    name: 'Ms. Luxmi Sharma',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'luxmisharma44@gmail.com',
    areaOfInterest:
      'Advance Database Management System, Python, Data Analytics, Data Structure and Algorithm, MATLAB, Wireless Sensor Network',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682335',
    image: null,
    departments: ['cse', 'ai-ml']
  },
  {
    slug: 'ms-nivedita-kapoor',
    name: 'Ms. Nivedita Kapoor',
    designation: 'Assistant Professor',
    qualification: 'M.A. (English), M.Phil.',
    email: 'nivedita.kapoor03@gmail.com',
    areaOfInterest:
      'English Literature, Language and Linguistics, Translation Studies, Regional and Folk Literature, Indian Aesthetics and Indian Knowledge System, Soft Skills and Personality Development',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/683757',
    image: null,
    departments: ALL_DEPARTMENTS
  },
  {
    slug: 'ms-reena-dhull',
    name: 'Ms. Reena Dhull',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'reenakdhull@gmail.com',
    areaOfInterest:
      'Power System Protection, Power System Stability, Automatic Generation Control using Fuzzy Logic Controller, Power Electronics and Drives, Electrical Vehicles',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/681915',
    image: null,
    departments: ['electrical-engineering', 'electronics-vlsi']
  },
  {
    slug: 'dr-elam-siwach',
    name: 'Dr. Elam Siwach',
    designation: 'Assistant Professor',
    qualification: 'Ph.D., M.Sc., B.Sc., B.Ed.',
    email: 'elamsiwach@sietpanchkula.ac.in',
    areaOfInterest:
      'Reliability Analysis, Mathematical Modeling of Industrial Machines, Mechanical Modeling, Laplace Transformation, Stochastic Process, Statistics',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682378',
    image: null,
    departments: ['robotics', 'electrical-engineering']
  },
  {
    slug: 'ms-monika',
    name: 'Ms. Monika',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'monika.saini.393@gmail.com',
    areaOfInterest:
      'C, C++, Python, Computer Networks, Network Security, Wireless Networks, Artificial Intelligence, Software Engineering',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682375',
    image: null,
    departments: ['cyber-security', 'cse']
  },
  {
    slug: 'er-tushar',
    name: 'Er. Tushar',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'tushar@sietpanchkula.ac.in',
    areaOfInterest:
      'Cyber Security, Computer Networks, Ad Hoc Network, DBMS, Agile Software Development, Cloud Computing, Software Verification Validation and Testing',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682234',
    image: null,
    departments: ['cyber-security']
  },
  {
    slug: 'ms-ritu-kadiyan',
    name: 'Ms. Ritu Kadiyan',
    designation: 'Assistant Professor',
    qualification: 'M.Tech., B.Tech.',
    email: 'ritukadiyan@sietpanchkula.ac.in',
    areaOfInterest:
      'Computer Network, Python, Internet of Things, Computer Architecture, DBMS, Artificial Intelligence, Discrete Mathematics',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682303',
    image: null,
    departments: ['ai-ml', 'cse']
  },
  {
    slug: 'dr-divya-singla',
    name: 'Dr. Divya Singla',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. (CSE), M.Tech. (CSE), B.Tech. (CSE)',
    email: 'drdivvyasingla@gmail.com',
    areaOfInterest: 'Software Engineering, Database Management System, Machine Learning, Artificial Intelligence',
    vidwan: 'https://vidwan.inflibnet.ac.in/profile/682323',
    image: null,
    departments: ['ai-ml', 'cse']
  }
];

const facultyImageBySlug = {
  'dr-milap-sharma': milapPhoto,
  'mrs-ankita-jiwan': ankitaPhoto,
  'dr-divya-garg': divyaGargPhoto,
  'ms-luxmi-sharma': luxmiPhoto,
  'ms-nivedita-kapoor': niveditaPhoto,
  'ms-reena-dhull': reenaPhoto,
  'dr-elam-siwach': elamPhoto,
  'ms-monika': monikaPhoto,
  'er-tushar': tusharPhoto,
  'ms-ritu-kadiyan': rituPhoto,
  'dr-divya-singla': divyaSinglaPhoto
};

export const facultyProfiles = facultyProfilesData.map((profile) => ({
  ...profile,
  image: facultyImageBySlug[profile.slug] ?? profile.image
}));

export const facultySourceUrl = 'https://sietpanchkula.ac.in/faculty/';

export const facultyBySlug = facultyProfiles.reduce((acc, profile) => {
  acc[profile.slug] = profile;
  return acc;
}, {});

export const facultyByDepartment = facultyProfiles.reduce((acc, profile) => {
  profile.departments.forEach((deptSlug) => {
    if (!acc[deptSlug]) {
      acc[deptSlug] = [];
    }
    acc[deptSlug].push(profile);
  });
  return acc;
}, {});

export const getFacultyByDepartment = (deptSlug) => {
  return facultyByDepartment[deptSlug] || facultyProfiles;
};
