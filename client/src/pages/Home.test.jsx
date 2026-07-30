import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { describe, it, expect, vi } from 'vitest';

// Mock child components that might have complex rendering or fetch calls
vi.mock('../components/Hero', () => ({ default: () => <div data-testid="hero-section">Hero Section</div> }));
vi.mock('../components/AboutInstituteHome', () => ({ default: () => <div>About Institute</div> }));
vi.mock('../components/DirectorDesk', () => ({ default: () => <div>Director Desk</div> }));
vi.mock('../components/VisionMissionHome', () => ({ default: () => <div>Vision Mission</div> }));
vi.mock('../components/Courses', () => ({ default: () => <div>Courses</div> }));
vi.mock('../components/InfoCards', () => ({ default: () => <div>Info Cards</div> }));
vi.mock('../components/TopAnnouncements', () => ({ default: () => <div>Top Announcements</div> }));
vi.mock('../components/BannerCarousel', () => ({ default: () => <div>Banner Carousel</div> }));

describe('Home Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  it('renders all main sections of the homepage', () => {
    renderPage();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByText('View MoU Document')).toBeInTheDocument();
    expect(screen.getByText('About Institute')).toBeInTheDocument();
    expect(screen.getByText('Director Desk')).toBeInTheDocument();
  });
});
