import createDepartmentDemoSections from '../../departmentDemoSections';

const demoSections = createDepartmentDemoSections(
  'Electronics Engineering (VLSI Design)',
  ['VLSI Design', 'Embedded Systems'],
  'electronics-vlsi'
);

const electronicsVlsiSections = demoSections.map((section) => {
  if (section.id !== 'about-department') return section;
  return {
    ...section,
    body: [
      'Focuses on IC design, semiconductor technologies, and embedded systems — with hands-on VLSI design, simulation, and hardware prototyping.'
    ],
    points: [
      'VLSI Design',
      'Embedded Systems',
      'Semiconductor Technology'
    ]
  };
});

export default electronicsVlsiSections;
