import React from 'react';
import SyllabusHubTemplate from './SyllabusHubTemplate';
import { submenuData } from './submenuData';

const Syllabus = () => <SyllabusHubTemplate {...submenuData['academics/syllabus']} hideHero />;

export default Syllabus;

