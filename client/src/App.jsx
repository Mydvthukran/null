import React, { Suspense, useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import ScheduledPopup from './components/ScheduledPopup';
import SocialMediaBar from './components/SocialMediaBar';
import { SettingsProvider } from './context/SettingsContext';

const Home = React.lazy(() => import('./pages/Home'));
const LifeAtSIET = React.lazy(() => import('./pages/LifeAtSIET'));
const SubmenuRouteHandler = React.lazy(() => import('./pages/submenu/SubmenuRouteHandler'));
const AllNotices = React.lazy(() => import('./pages/AllNotices'));
const Admission = React.lazy(() => import('./pages/Admission'));
const TopLevelSections = React.lazy(() => import('./pages/TopLevelSections'));
const Events = React.lazy(() => import('./pages/Events'));
const StudentHelpline = React.lazy(() => import('./pages/StudentHelpline'));
const ContentDifferences = React.lazy(() => import('./pages/ContentDifferences'));
const Staff = React.lazy(() => import('./pages/Staff'));
const Search = React.lazy(() => import('./pages/Search'));
const DepartmentSectionPage = React.lazy(() => import('./pages/submenu/departmentSections/DepartmentSectionPage'));
const FacultyProfileRoute = React.lazy(() => import('./pages/submenu/departmentSections/FacultyProfileRoute'));
const AdmissionHelpline = React.lazy(() => import('./pages/AdmissionHelpline'));
const PayFeesOnline = React.lazy(() => import('./pages/PayFeesOnline'));
const AdmissionDocuments = React.lazy(() => import('./pages/AdmissionDocuments'));
const PhysicalCounselling = React.lazy(() => import('./pages/PhysicalCounselling'));
const Jobs = React.lazy(() => import('./pages/Jobs'));
const SIH2026 = React.lazy(() => import('./pages/SIH2026'));
const Developers = React.lazy(() => import('./pages/Developers'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const CommencementNotice = React.lazy(() => import('./pages/CommencementNotice'));

const ExternalPlacementRedirect = () => {
  useEffect(() => {
    window.location.replace('https://tpo.sietpanchkula.ac.in/');
  }, []);

  return null;
};

function App() {
  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
    if (!sessionStorage.getItem('siet_visited')) {
      fetch(`${apiBase}/visitors/hit`, { method: 'POST', cache: 'no-store' })
        .then(() => sessionStorage.setItem('siet_visited', 'true'))
        .catch((err) => console.error('Failed to register visit:', err));
    }
  }, []);

  return (
    <SettingsProvider>
      <div className="App">
        <ScheduledPopup />
        <Header />
        <Navbar />

        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>Loading...</div>}>
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
            <Route path="/admission-helpline" element={<AdmissionHelpline />} />
            <Route path="/pay-fees-online" element={<PayFeesOnline />} />
            <Route path="/admission-documents" element={<AdmissionDocuments />} />
            <Route path="/physical-counselling" element={<PhysicalCounselling />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/sih-2026" element={<SIH2026 />} />
            <Route path="/commencement-notice" element={<CommencementNotice />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Suspense>

        <ChatbotWidget />
        <SocialMediaBar />
        <Footer />
      </div>
    </SettingsProvider>
  );
}

export default App;
