import createDepartmentDemoSections from '../../departmentDemoSections';
import aimlTimetablePdf from '../../../../assets/new-assets/student/timetable/SIET_AIML_Branchwise_TT.pdf';

const demoSections = createDepartmentDemoSections(
  'Computer Science & Engineering (AI & Machine Learning)',
  ['Artificial Intelligence', 'Machine Learning'],
  'ai-ml'
);

const aiMlSections = demoSections.map((section) => {
  if (section.id === 'about-department') {
    return {
      ...section,
      body: [
        'Integrates core computing with AI and ML specialization — students build predictive models, automation systems, and intelligent solutions using modern frameworks.'
      ],
      points: [
        'Artificial Intelligence',
        'Machine Learning',
        'Data Science'
      ]
    };
  }
  if (section.id === 'time-table') {
    return {
      ...section,
      body: ['Download or view the official semester-wise timetable for CSE (AI & ML).'],
      schedule: undefined,
      timetablePdf: aimlTimetablePdf
    };
  }
  return section;
});

export default aiMlSections;
