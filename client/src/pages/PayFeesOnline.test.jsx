import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PayFeesOnline from './PayFeesOnline';
import { describe, it, expect } from 'vitest';

describe('PayFeesOnline Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <PayFeesOnline />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Online Payment Portal')).toBeInTheDocument();
  });

  it('renders bank details', () => {
    renderPage();
    expect(screen.getByText('Payment Instructions')).toBeInTheDocument();
    expect(screen.getByText('Pay Fees Online (SBI Collect)')).toBeInTheDocument();
  });
});
