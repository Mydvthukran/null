import createDepartmentDemoSections from '../../departmentDemoSections';
import roboticsTimetablePdf from '../../../../assets/new-assets/student/timetable/SIET_RA_Branchwise_TT.pdf';

const demoSections = createDepartmentDemoSections(
  'Robotics & Automation',
  ['Robotics Systems', 'Control Systems'],
  'robotics'
);

const roboticsSections = demoSections.map((section) => {
  if (section.id === 'about-department') {
    return {
      ...section,
      body: [
        'Combines mechanical engineering, electronics, and software to design intelligent automated systems — with hands-on projects integrating hardware and software.'
      ],
      points: [
        'Robotics Systems',
        'Control Systems',
        'Industrial Automation'
      ]
    };
  }
  if (section.id === 'time-table') {
    return {
      ...section,
      body: ['Download or view the official semester-wise timetable for Robotics & Automation.'],
      schedule: undefined,
      timetablePdf: roboticsTimetablePdf
    };
  }
  return section;
});

export default roboticsSections;
