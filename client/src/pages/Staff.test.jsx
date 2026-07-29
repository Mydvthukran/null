import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Staff from './Staff';
import { describe, it, expect } from 'vitest';

describe('Staff Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <Staff />
    </BrowserRouter>
  );

  it('renders main heading', () => {
    renderPage();
    expect(screen.getByText('Staff and Utility Routes')).toBeInTheDocument();
  });

  it('renders all notices portal link', () => {
    renderPage();
    const link = screen.getByText('All Notices');
    expect(link).toBeInTheDocument();
  });

  it('renders academic calendar link', () => {
    renderPage();
    const link = screen.getByText('Academic Calendar');
    expect(link).toBeInTheDocument();
  });
  
  it('renders student helpline link', () => {
    renderPage();
    const link = screen.getByText('Student Helpline');
    expect(link).toBeInTheDocument();
  });
});
