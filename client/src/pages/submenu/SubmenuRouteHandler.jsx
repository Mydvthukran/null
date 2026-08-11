import React, { useLayoutEffect, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AboutInstitute = React.lazy(() => import('./AboutInstitute'));
const VisionMission = React.lazy(() => import('./VisionMission'));
const DirectorsMessage = React.lazy(() => import('./DirectorsMessage'));
const RegistrarsMessage = React.lazy(() => import('./RegistrarsMessage'));
const MandatoryDisclosure = React.lazy(() => import('./MandatoryDisclosure'));
const QualityPolicy = React.lazy(() => import('./QualityPolicy'));
const Affiliations = React.lazy(() => import('./Affiliations'));
const AntiRagging = React.lazy(() => import('./AntiRagging'));
const AcademicAntiRagging = React.lazy(() => import('./AcademicAntiRagging'));
const History = React.lazy(() => import('./History'));
const DepartmentEngineering = React.lazy(() => import('./DepartmentEngineering'));
const DepartmentAiMl = React.lazy(() => import('./DepartmentAiMl'));
const DepartmentCyberSecurity = React.lazy(() => import('./DepartmentCyberSecurity'));
const DepartmentRobotics = React.lazy(() => import('./DepartmentRobotics'));
const DepartmentComputerScience = React.lazy(() => import('./DepartmentComputerScience'));
const DepartmentElectricalEngineering = React.lazy(() => import('./DepartmentElectricalEngineering'));
const DepartmentElectronicsVlsi = React.lazy(() => import('./DepartmentElectronicsVlsi'));
const DepartmentSectionPage = React.lazy(() => import('./departmentSections/DepartmentSectionPage'));
const CoursesOffered = React.lazy(() => import('./CoursesOffered'));
const AcademicCalendar = React.lazy(() => import('./AcademicCalendar'));
const TeachingLearning = React.lazy(() => import('./TeachingLearning'));
const Curriculum = React.lazy(() => import('./Curriculum'));
const ExamSchedule = React.lazy(() => import('./ExamSchedule'));
const AcademicStudentTestimonials = React.lazy(() => import('./AcademicStudentTestimonials'));
const Syllabus = React.lazy(() => import('./Syllabus'));
const CodeOfConduct = React.lazy(() => import('./CodeOfConduct'));
const Scholarships = React.lazy(() => import('./Scholarships'));
const DressCode = React.lazy(() => import('./DressCode'));
const AdmissionProspectus = React.lazy(() => import('./AdmissionProspectus'));
const Infrastructure = React.lazy(() => import('./Infrastructure'));
const Library = React.lazy(() => import('./Library'));
const Hostels = React.lazy(() => import('./Hostels'));
const Sports = React.lazy(() => import('./Sports'));
const SmartClassrooms = React.lazy(() => import('./SmartClassrooms'));
const Laboratories = React.lazy(() => import('./Laboratories'));
const Cafeteria = React.lazy(() => import('./Cafeteria'));
const Healthcare = React.lazy(() => import('./Healthcare'));
const Security = React.lazy(() => import('./Security'));
const CampusTraining = React.lazy(() => import('./CampusTraining'));
const PlacementBrochure = React.lazy(() => import('./PlacementBrochure'));
const PlacementRecords = React.lazy(() => import('./PlacementRecords'));
const MajorRecruiters = React.lazy(() => import('./MajorRecruiters'));
const PlacementProcess = React.lazy(() => import('./PlacementProcess'));
const PlacementStudentTestimonials = React.lazy(() => import('./PlacementStudentTestimonials'));
const AlumniDirectory = React.lazy(() => import('./AlumniDirectory'));
const AlumniRegistration = React.lazy(() => import('./AlumniRegistration'));
const AlumniEvents = React.lazy(() => import('./AlumniEvents'));
const CampusLife = React.lazy(() => import('./CampusLife'));
const PhotoGallery = React.lazy(() => import('./PhotoGallery'));
const VideoGallery = React.lazy(() => import('./VideoGallery'));
const EventsActivities = React.lazy(() => import('./EventsActivities'));
const Clubs = React.lazy(() => import('./Clubs'));

const submenuComponents = {
  'about/history': History,
  'about/about-institute': AboutInstitute,
  'about/mandatory-disclosure': MandatoryDisclosure,
  'about/vision-mission': VisionMission,
  'about/directors-message': DirectorsMessage,
  'about/registrars-message': RegistrarsMessage,
  'about/quality-policy': QualityPolicy,
  'about/affiliations': Affiliations,
  'about/anti-ragging': AntiRagging,
  'academics/anti-ragging': AcademicAntiRagging,
  'departments/engineering': DepartmentEngineering,
  'departments/cse': DepartmentSectionPage,
  'departments/ai-ml': DepartmentSectionPage,
  'departments/cyber-security': DepartmentSectionPage,
  'departments/robotics': DepartmentSectionPage,
  'departments/computer-science': DepartmentSectionPage,
  'departments/electrical-engineering': DepartmentSectionPage,
  'departments/electronics-vlsi': DepartmentSectionPage,
  'academics/courses-offered': CoursesOffered,
  'academics/academic-calendar': AcademicCalendar,
  'academics/syllabus': Syllabus,
  'academics/teaching-learning': TeachingLearning,
  'academics/curriculum': Curriculum,
  'academics/admission-prospectus': AdmissionProspectus,
  'academics/exam-schedule': ExamSchedule,
  'academics/student-testimonials': AcademicStudentTestimonials,
  'academics/code-of-conduct': CodeOfConduct,
  'academics/scholarships': Scholarships,
  'academics/dress-code': DressCode,
  'facilities/infrastructure': Infrastructure,
  'facilities/library': Library,
  'facilities/hostels': Hostels,
  'facilities/sports': Sports,
  'facilities/smart-classrooms': SmartClassrooms,
  'facilities/laboratories': Laboratories,
  'facilities/cafeteria': Cafeteria,
  'facilities/healthcare': Healthcare,
  'facilities/security': Security,
  'placements/campus-training': CampusTraining,
  'placements/placement-brochure': PlacementBrochure,
  'placements/placement-records': PlacementRecords,
  'placements/major-recruiters': MajorRecruiters,
  'placements/placement-process': PlacementProcess,
  'placements/student-testimonials': PlacementStudentTestimonials,
  'alumni/alumni-directory': AlumniDirectory,
  'alumni/alumni-registration': AlumniRegistration,
  'alumni/alumni-events': AlumniEvents,
  'life-at-siet/campus-life': CampusLife,
  'life-at-siet/photo-gallery': PhotoGallery,
  'life-at-siet/video-gallery': VideoGallery,
  'life-at-siet/events-activities': EventsActivities,
  'life-at-siet/clubs': Clubs,
  'academics/clubs': Clubs,
};

const SubmenuRouteHandler = () => {
  const location = useLocation();
  const [section, subSection] = location.pathname.split('/').filter(Boolean);

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
  }, [location.pathname]);

  const key = `${section}/${subSection}`;
  const Component = submenuComponents[key];

  if (!Component) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default SubmenuRouteHandler;
