import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdmissionHelpline from './AdmissionHelpline';
import { describe, it, expect } from 'vitest';

describe('AdmissionHelpline Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <AdmissionHelpline />
    </BrowserRouter>
  );

  it('renders main headings', () => {
    renderPage();
    expect(screen.getByText('Admission Helpline')).toBeInTheDocument();
  });

  it('renders email contact', () => {
    renderPage();
    expect(screen.getByText('admissions@sietpanchkula.ac.in')).toBeInTheDocument();
  });

  it('renders department coordinators', () => {
    renderPage();
    expect(screen.getByText('Department Coordinators')).toBeInTheDocument();
    expect(screen.getByText('Computer Science & Engineering')).toBeInTheDocument();
  });

  it('renders general admission queries', () => {
    renderPage();
    expect(screen.getByText('General Admission Queries')).toBeInTheDocument();
    expect(screen.getByText('Dr. Milap Sharma')).toBeInTheDocument();
  });

  it('renders office contact', () => {
    renderPage();
    expect(screen.getByText('Office Contact')).toBeInTheDocument();
  });
});
