import React from 'react';
import SubmenuTemplate from './SubmenuTemplate';
import { submenuData } from './submenuData';

const Library = () => <SubmenuTemplate {...submenuData['facilities/library']} />;

export default Library;
