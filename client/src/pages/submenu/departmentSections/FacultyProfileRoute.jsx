import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { departmentSectionCatalog } from '../departmentSectionCatalog';
import TeacherProfileTemplate from './facultyProfiles/TeacherProfileTemplate';
import { getFileUrl } from '../../../utils/fileUrlHelper';

const FacultyProfileRoute = () => {
  const { deptSlug, teacherSlug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/faculty/' + teacherSlug)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(f => {
        setProfile({
          ...f,
          areaOfInterest: f.area_of_interest,
          vidwan: f.vidwan_link,
          image: f.image_path ? getFileUrl(f.image_path) : null
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching faculty:', err);
        setError(true);
        setLoading(false);
      });
  }, [teacherSlug]);

  if (!departmentSectionCatalog[deptSlug]) {
    return <Navigate to="/departments/cse" replace />;
  }

  if (loading) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading profile...
      </div>
    );
  }

  if (error || !profile) {
    return <Navigate to={`/departments/${deptSlug}#faculty`} replace />;
  }

  return <TeacherProfileTemplate deptSlug={deptSlug} profile={profile} />;
};

export default FacultyProfileRoute;
