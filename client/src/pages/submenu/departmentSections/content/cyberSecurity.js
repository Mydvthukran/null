import createDepartmentDemoSections from '../../departmentDemoSections';

const demoSections = createDepartmentDemoSections(
  'Computer Science & Engineering (Cyber Security)',
  ['Network Security', 'Ethical Hacking'],
  'cyber-security'
);

const cyberSecuritySections = demoSections.map((section) => {
  if (section.id !== 'about-department') return section;
  return {
    ...section,
    body: [
      'Covers ethical hacking, network security, cryptography, and risk management — preparing students to identify vulnerabilities and secure digital infrastructure.'
    ],
    points: [
      'Network Security',
      'Ethical Hacking',
      'Cryptography'
    ]
  };
});

export default cyberSecuritySections;
