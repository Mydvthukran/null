import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommencementNotice from './CommencementNotice';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../components/ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('CommencementNotice Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <CommencementNotice />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('NOTICE')).toBeInTheDocument();
  });

  it('renders commencement date info', () => {
    renderPage();
    expect(screen.getByText('Commencement of B.Tech. 1st Year Regular Classes')).toBeInTheDocument();
  });

  it('renders induction program schedule', () => {
    renderPage();
    expect(screen.getByText('Week 1: Academic Induction')).toBeInTheDocument();
    expect(screen.getByText('Week 2: Industrial Induction')).toBeInTheDocument();
  });
});
