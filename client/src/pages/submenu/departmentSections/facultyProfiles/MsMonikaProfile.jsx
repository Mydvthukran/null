import React from 'react';
import TeacherProfileTemplate from './TeacherProfileTemplate';
import { facultyBySlug } from '../../../../data/facultyProfiles';

const MsMonikaProfile = ({ deptSlug }) => {
  return <TeacherProfileTemplate deptSlug={deptSlug} profile={facultyBySlug['ms-monika']} />;
};

export default MsMonikaProfile;
