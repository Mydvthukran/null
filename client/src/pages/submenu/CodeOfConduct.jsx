import React from 'react';
import SubmenuWithPDF from './SubmenuWithPDF';
import { submenuData } from './submenuData';

const CodeOfConduct = () => <SubmenuWithPDF {...submenuData['academics/code-of-conduct']} hideHero />;

export default CodeOfConduct;

