import React from 'react';
import TeacherProfileTemplate from './TeacherProfileTemplate';
import { facultyBySlug } from '../../../../data/facultyProfiles';

const DrDivyaSinglaProfile = ({ deptSlug }) => {
  return <TeacherProfileTemplate deptSlug={deptSlug} profile={facultyBySlug['dr-divya-singla']} />;
};

export default DrDivyaSinglaProfile;
