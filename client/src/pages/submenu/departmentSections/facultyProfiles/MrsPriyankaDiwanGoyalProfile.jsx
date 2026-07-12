import React from 'react';
import TeacherProfileTemplate from './TeacherProfileTemplate';
import { facultyBySlug } from '../../../../data/facultyProfiles';

const MrsPriyankaDiwanGoyalProfile = ({ deptSlug }) => {
  return <TeacherProfileTemplate deptSlug={deptSlug} profile={facultyBySlug['mrs-priyanka-diwan-goyal']} />;
};

export default MrsPriyankaDiwanGoyalProfile;
