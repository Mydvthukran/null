import React from 'react';
import TeacherProfileTemplate from './TeacherProfileTemplate';
import { facultyBySlug } from '../../../../data/facultyProfiles';

const MsRituKadiyanProfile = ({ deptSlug }) => {
  return <TeacherProfileTemplate deptSlug={deptSlug} profile={facultyBySlug['ms-ritu-kadiyan']} />;
};

export default MsRituKadiyanProfile;
