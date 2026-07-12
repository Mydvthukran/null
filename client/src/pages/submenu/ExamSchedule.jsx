import React from 'react';
import SubmenuTemplate from './SubmenuTemplate';
import { submenuData } from './submenuData';

const ExamSchedule = () => <SubmenuTemplate {...submenuData['academics/exam-schedule']} />;

export default ExamSchedule;
