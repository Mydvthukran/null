import React from 'react';
import SubmenuTemplate from './SubmenuTemplate';
import { submenuData } from './submenuData';

const DepartmentEngineering = () => <SubmenuTemplate {...submenuData['departments/engineering']} />;

export default DepartmentEngineering;
