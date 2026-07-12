import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { facultyBySlug } from '../../../data/facultyProfiles';
import { departmentSectionCatalog } from '../departmentSectionCatalog';
import facultyProfileComponentMap from './facultyProfiles';

const FacultyProfileRoute = () => {
  const { deptSlug, teacherSlug } = useParams();

  if (!departmentSectionCatalog[deptSlug]) {
    return <Navigate to="/departments/cse" replace />;
  }

  if (!teacherSlug || !facultyBySlug[teacherSlug]) {
    return <Navigate to={`/departments/${deptSlug}#faculty`} replace />;
  }

  const ProfileComponent = facultyProfileComponentMap[teacherSlug];

  if (!ProfileComponent) {
    return <Navigate to={`/departments/${deptSlug}#faculty`} replace />;
  }

  return <ProfileComponent deptSlug={deptSlug} />;
};

export default FacultyProfileRoute;
