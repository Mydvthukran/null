import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { describe, it, expect } from 'vitest';

describe('Header Component', () => {
  it('renders college name in Hindi and English', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/राज्य अभियांत्रिकी एवं प्रौद्योगिकी संस्थान, पंचकुला/i)).toBeInTheDocument();
    expect(screen.getByText(/STATE INSTITUTE OF ENGINEERING & TECHNOLOGY, PANCHKULA/i)).toBeInTheDocument();
  });

  it('renders both logos correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByAltText(/SIET Panchkula Logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Haryana Government Emblem/i)).toBeInTheDocument();
  });
});
