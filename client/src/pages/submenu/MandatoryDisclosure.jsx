import React from 'react';
import SubmenuWithPDF from './SubmenuWithPDF';
import { submenuData } from './submenuData';

const MandatoryDisclosure = () => <SubmenuWithPDF {...submenuData['about/mandatory-disclosure']} hideHero />;

export default MandatoryDisclosure;
