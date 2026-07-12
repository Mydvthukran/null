import React from 'react';
import SubmenuTemplate from './SubmenuTemplate';
import { submenuData } from './submenuData';

const DepartmentElectricalEngineering = () => (
  <SubmenuTemplate {...submenuData['departments/electrical-engineering']} />
);

export default DepartmentElectricalEngineering;

