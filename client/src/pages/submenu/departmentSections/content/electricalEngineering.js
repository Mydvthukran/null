import createDepartmentDemoSections from '../../departmentDemoSections';

const demoSections = createDepartmentDemoSections(
  'Electrical Engineering',
  ['Power Systems', 'Electrical Machines'],
  'electrical-engineering'
);

const electricalEngineeringSections = demoSections.map((section) => {
  if (section.id !== 'about-department') return section;
  return {
    ...section,
    body: [
      'Builds expertise in power generation, transmission, and system design — blending theory with practical applications for energy and infrastructure careers.'
    ],
    points: [
      'Power Systems',
      'Electrical Machines',
      'Control Engineering'
    ]
  };
});

export default electricalEngineeringSections;
