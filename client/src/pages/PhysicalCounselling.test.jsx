import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhysicalCounselling from './PhysicalCounselling';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../components/ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('PhysicalCounselling Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <PhysicalCounselling />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Physical Counselling')).toBeInTheDocument();
  });

  it('renders terms and conditions text', () => {
    renderPage();
    expect(screen.getByText(/By submitting this form/i)).toBeInTheDocument();
  });

  it('renders document links', () => {
    renderPage();
    expect(screen.getByText('Physical Counselling form')).toBeInTheDocument();
    expect(screen.getByText('Fee Structure')).toBeInTheDocument();
  });

  it('shows warning when applying without accepting terms', () => {
    renderPage();
    const applyButton = screen.getByRole('button', { name: 'Apply Online' });
    fireEvent.click(applyButton);
    expect(screen.getByText('Please Accept the terms and conditions')).toBeInTheDocument();
  });
});
