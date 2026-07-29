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
    expect(screen.getByText('Required Documents for Admission')).toBeInTheDocument();
  });

  it('renders standard document list', () => {
    renderPage();
    expect(screen.getByText('1. 10th Marksheet & Certificate')).toBeInTheDocument();
    expect(screen.getByText('2. 12th Marksheet & Certificate')).toBeInTheDocument();
    expect(screen.getByText('6. Character Certificate')).toBeInTheDocument();
  });
});
