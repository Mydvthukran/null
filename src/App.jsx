import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LifeAtSIET from './pages/LifeAtSIET';
import SubmenuRouteHandler from './pages/submenu/SubmenuRouteHandler';
import ChatbotWidget from './components/ChatbotWidget';
import AllNotices from './pages/AllNotices';
import Admission from './pages/Admission';
import TopLevelSections from './pages/TopLevelSections';
import Events from './pages/Events';
import StudentHelpline from './pages/StudentHelpline';
import ContentDifferences from './pages/ContentDifferences';
import Staff from './pages/Staff';
import Search from './pages/Search';
import ScheduledPopup from './components/ScheduledPopup';
import DepartmentElectronicsVlsi from './pages/submenu/DepartmentElectronicsVlsi';
import CoursesOffered from './pages/submenu/CoursesOffered';
import AboutDepartment from './pages/submenu/departmentSections/AboutDepartment';
import VisionMission from './pages/submenu/departmentSections/VisionMission';
import Faculty from './pages/submenu/departmentSections/Faculty';
import LessonPlans from './pages/submenu/departmentSections/LessonPlans';
import TimeTable from './pages/submenu/departmentSections/TimeTable';
import DepartmentSectionPage from './pages/submenu/departmentSections/DepartmentSectionPage';
import FacultyProfileRoute from './pages/submenu/departmentSections/FacultyProfileRoute';

const ExternalPlacementRedirect = () => {
  React.useEffect(() => {
    window.location.replace('https://siettpo.vercel.app/');
  }, []);

  return null;
};

/**
 * Main App Component
 * Combines all sections to create the complete college website with routing
 */
function App() {
  return (
    <div className="App">
      <ScheduledPopup />

      {/* Top Header with College Name and Logo */}
      <Header />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/about/about-institute" replace />} />
        <Route path="/about/:subSection" element={<SubmenuRouteHandler />} />
        <Route path="/departments" element={<Navigate to="/departments/cse" replace />} />
        <Route path="/departments/:deptSlug" element={<DepartmentSectionPage />} />
        <Route path="/departments/:deptSlug/about-department" element={<Navigate to="../#about-department" replace />} />
        <Route path="/departments/:deptSlug/vision-mission" element={<Navigate to="../#vision-mission" replace />} />
        <Route path="/departments/:deptSlug/faculty" element={<Navigate to="../#faculty" replace />} />
        <Route path="/departments/:deptSlug/faculty/:teacherSlug" element={<FacultyProfileRoute />} />
        <Route path="/departments/:deptSlug/lesson-plans" element={<Navigate to="../#lesson-plans" replace />} />
        <Route path="/departments/:deptSlug/time-table" element={<Navigate to="../#time-table" replace />} />
        <Route path="/academics" element={<Navigate to="/academics/academic-calendar" replace />} />
        <Route path="/academics/:subSection" element={<SubmenuRouteHandler />} />
        <Route path="/facilities" element={<Navigate to="/facilities/infrastructure" replace />} />
        <Route path="/facilities/:subSection" element={<SubmenuRouteHandler />} />
        <Route path="/placements" element={<ExternalPlacementRedirect />} />
        <Route path="/placements/:subSection" element={<ExternalPlacementRedirect />} />
        <Route path="/alumni" element={<Navigate to="/alumni/alumni-directory" replace />} />
        <Route path="/alumni/:subSection" element={<SubmenuRouteHandler />} />
        <Route path="/life-at-siet" element={<LifeAtSIET />} />
        <Route path="/life-at-siet/:subSection" element={<SubmenuRouteHandler />} />
        <Route path="/all-notices" element={<AllNotices />} />
        <Route path="/admission-form" element={<Admission />} />
        <Route path="/top-level-sections" element={<TopLevelSections />} />
        <Route path="/events" element={<Events />} />
        <Route path="/student-helpline" element={<StudentHelpline />} />
        <Route path="/content-differences" element={<ContentDifferences />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <ChatbotWidget />

      {/* Footer with Links and Contact Info */}
      <Footer />
    </div>
  );
}

export default App;
