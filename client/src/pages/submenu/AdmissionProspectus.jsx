import React from 'react';
import SyllabusHubTemplate from './SyllabusHubTemplate';
import { submenuData } from './submenuData';

const AdmissionProspectus = () => {
  const data = submenuData['academics/admission-prospectus'];
  return (
    <SyllabusHubTemplate
      {...data}
      courses={data.documents}
      finderLabel="Search Documents"
      selectLabel="Select Document"
      searchPlaceholder="Search document title..."
      hideHero
    />
  );
};

export default AdmissionProspectus;
