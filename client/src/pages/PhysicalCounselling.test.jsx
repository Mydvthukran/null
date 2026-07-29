import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhysicalCounselling from './PhysicalCounselling';
import { describe, it, expect } from 'vitest';

describe('PhysicalCounselling Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <PhysicalCounselling />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('B.Tech Physical Counselling 2025-26')).toBeInTheDocument();
  });

  it('renders application fee info', () => {
    renderPage();
    expect(screen.getByText(/Application Fee: ₹500/i)).toBeInTheDocument();
  });

  it('renders offline form section', () => {
    renderPage();
    expect(screen.getByText(/Offline Counselling Form/i)).toBeInTheDocument();
  });

  it('renders required documents heading', () => {
    renderPage();
    expect(screen.getByText(/Required Documents/i)).toBeInTheDocument();
  });
});
