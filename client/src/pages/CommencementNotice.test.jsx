import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommencementNotice from './CommencementNotice';
import { describe, it, expect } from 'vitest';

describe('CommencementNotice Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <CommencementNotice />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Session Commencement Notice')).toBeInTheDocument();
  });

  it('renders commencement date info', () => {
    renderPage();
    expect(screen.getByText(/Classes for the upcoming academic session/i)).toBeInTheDocument();
  });

  it('renders uniform guidelines', () => {
    renderPage();
    expect(screen.getByText(/Students must strictly adhere to the uniform code/i)).toBeInTheDocument();
  });
});
