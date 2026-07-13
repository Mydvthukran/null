import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { departmentSectionCatalog } from '../departmentSectionCatalog';
import TeacherProfileTemplate from './facultyProfiles/TeacherProfileTemplate';

const FacultyProfileRoute = () => {
  const { deptSlug, teacherSlug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!teacherSlug) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    fetch(`https://null-e3uj.onrender.com/api/faculty/${teacherSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError(true);
        setLoading(false);
      });
  }, [teacherSlug]);

  if (!departmentSectionCatalog[deptSlug]) {
    return <Navigate to="/departments/cse" replace />;
  }

  if (loading) {
    return <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading profile...</div>;
  }

  if (error || !profile) {
    return <Navigate to={`/departments/${deptSlug}#faculty`} replace />;
  }

  return <TeacherProfileTemplate deptSlug={deptSlug} profile={profile} />;
};

export default FacultyProfileRoute;
