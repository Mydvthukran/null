import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Developers from './Developers';
import { describe, it, expect } from 'vitest';

describe('Developers Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <Developers />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('The Creators')).toBeInTheDocument();
  });

  it('renders developer cards', () => {
    renderPage();
    expect(screen.getByText('Manish Yadav')).toBeInTheDocument();
    expect(screen.getByText('Aaditiya Verma')).toBeInTheDocument();
  });
});
