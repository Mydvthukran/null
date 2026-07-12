import React from 'react';
import TeacherProfileTemplate from './TeacherProfileTemplate';
import { facultyBySlug } from '../../../../data/facultyProfiles';

const ErTusharProfile = ({ deptSlug }) => {
  return <TeacherProfileTemplate deptSlug={deptSlug} profile={facultyBySlug['er-tushar']} />;
};

export default ErTusharProfile;
