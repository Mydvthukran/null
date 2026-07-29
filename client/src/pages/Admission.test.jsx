import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admission from './Admission';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../components/ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('Admission Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <Admission />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('B.Tech Admission 2026-27')).toBeInTheDocument();
  });

  it('renders first year section', () => {
    renderPage();
    expect(screen.getByText(/1st Year \(B.Tech\)/i)).toBeInTheDocument();
  });

  it('renders LEET section', () => {
    renderPage();
    expect(screen.getByText(/2nd Year \(B.Tech LEET\)/i)).toBeInTheDocument();
  });

  it('renders links', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /Download Admission Brochure/i })).toBeInTheDocument();
  });

  it('renders admission open text', () => {
    renderPage();
    expect(screen.getByText(/Admission Open for B.Tech/i)).toBeInTheDocument();
  });
});
