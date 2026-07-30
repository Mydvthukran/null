import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopAnnouncements from './TopAnnouncements';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('TopAnnouncements Component', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <TopAnnouncements />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Top Announcements')).toBeInTheDocument();
  });

  it('renders view all link', () => {
    renderPage();
    expect(screen.getByText('View All Notices')).toBeInTheDocument();
  });
});
