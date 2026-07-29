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
    expect(screen.getByText('Project Developers')).toBeInTheDocument();
  });

  it('renders developer cards', () => {
    renderPage();
    expect(screen.getByText('Yogesh Kumar')).toBeInTheDocument();
    expect(screen.getByText('Rohan Mukhija')).toBeInTheDocument();
    expect(screen.getByText('Vinay Sharma')).toBeInTheDocument();
    expect(screen.getByText('Tarun Rana')).toBeInTheDocument();
  });
});
