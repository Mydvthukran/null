import React from 'react';
import TeacherProfileTemplate from './TeacherProfileTemplate';
import { facultyBySlug } from '../../../../data/facultyProfiles';

const DrDivyaGargProfile = ({ deptSlug }) => {
  return <TeacherProfileTemplate deptSlug={deptSlug} profile={facultyBySlug['dr-divya-garg']} />;
};

export default DrDivyaGargProfile;
