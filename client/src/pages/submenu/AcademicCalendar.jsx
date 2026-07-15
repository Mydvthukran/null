import React from 'react';
import SyllabusHubTemplate from './SyllabusHubTemplate';
import { submenuData } from './submenuData';

const AcademicCalendar = () => {
  const data = submenuData['academics/academic-calendar'];
  return (
    <SyllabusHubTemplate 
      {...data} 
      courses={data.documents}
      finderLabel="Calendar Type"
      selectLabel="Select Session"
      searchPlaceholder="Search calendar..."
      hideHero
    />
  );
};

export default AcademicCalendar;
