import React from 'react';
import SubmenuTemplate from './SubmenuTemplate';
import { submenuData } from './submenuData';

const Laboratories = () => <SubmenuTemplate {...submenuData['facilities/laboratories']} />;

export default Laboratories;
