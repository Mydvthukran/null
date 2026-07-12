import React from 'react';
import SubmenuTemplate from './SubmenuTemplate';
import { submenuData } from './submenuData';

const Healthcare = () => <SubmenuTemplate {...submenuData['facilities/healthcare']} />;

export default Healthcare;
