import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdmissionHelpline from './AdmissionHelpline';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../components/ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('AdmissionHelpline Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <AdmissionHelpline />
    </BrowserRouter>
  );

  it('renders main headings', () => {
    renderPage();
    expect(screen.getByText('Admission Helpline 2025-26')).toBeInTheDocument();
  });

  it('renders offline counselling note', () => {
    renderPage();
    expect(screen.getByText(/Offline Counselling at SIET Panchkula/i)).toBeInTheDocument();
  });

  it('renders first year contacts', () => {
    renderPage();
    expect(screen.getByText('1st Year')).toBeInTheDocument();
  });

  it('renders LEET contacts', () => {
    renderPage();
    expect(screen.getByText('LEET')).toBeInTheDocument();
  });
  
  it('renders document list link', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /View Required Documents/i })).toBeInTheDocument();
  });
});
