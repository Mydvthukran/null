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
    expect(screen.getByText('Student Query Form')).toBeInTheDocument();
  });

  it('renders name input', () => {
    renderPage();
    // Match exactly 'Name *' to avoid matching 'Father\'s Name *'
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
  });

  it('renders address input', () => {
    renderPage();
    expect(screen.getByLabelText('Address *')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /Submit Query Form/i })).toBeInTheDocument();
  });
});
