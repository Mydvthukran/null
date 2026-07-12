

export const getSectionHome = (sectionLabel) => {
  switch (sectionLabel) {
    case 'ABOUT US':
      return { label: 'About', to: '/about' };
    case 'DEPARTMENTS':
      return { label: 'Departments', to: '/departments' };
    case 'ACADEMICS':
      return { label: 'Academics', to: '/academics' };
    case 'FACILITIES':
      return { label: 'Facilities', to: '/facilities' };
    case 'TRAINING & PLACEMENTS':
      return { label: 'Placements', to: '/placements/placement-brochure' };
    case 'ALUMNI':
      return { label: 'Alumni', to: '/alumni' };
    case 'LIFE @ SIET':
      return { label: 'Life @ SIET', to: '/life-at-siet' };
    default:
      return { label: 'Home', to: '/' };
  }
};


