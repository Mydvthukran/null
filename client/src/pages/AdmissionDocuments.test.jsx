import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdmissionDocuments from './AdmissionDocuments';
import { describe, it, expect } from 'vitest';

describe('AdmissionDocuments Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <AdmissionDocuments />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Fee Structure')).toBeInTheDocument();
  });

  it('renders fee structure table', () => {
    renderPage();
    expect(screen.getByText('Tuition fee (PA)')).toBeInTheDocument();
  });

  it('renders standard document links', () => {
    renderPage();
    expect(screen.getByText('Documents SIET B.Tech Admission')).toBeInTheDocument();
    expect(screen.getByText('Fee Structure 2026-27')).toBeInTheDocument();
  });
});
