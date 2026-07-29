import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../components/Hero', () => ({ default: () => <div data-testid="mock-hero">Hero</div> }));
vi.mock('../components/TopAnnouncements', () => ({ default: () => <div data-testid="mock-top-announcements">TopAnnouncements</div> }));
vi.mock('../components/InfoCards', () => ({ default: () => <div data-testid="mock-info-cards">InfoCards</div> }));
vi.mock('../components/VisionMissionHome', () => ({ default: () => <div data-testid="mock-vision-mission">VisionMission</div> }));
vi.mock('../components/DirectorDesk', () => ({ default: () => <div data-testid="mock-director-desk">DirectorDesk</div> }));
vi.mock('../components/BannerCarousel', () => ({ default: () => <div data-testid="mock-banner-carousel">BannerCarousel</div> }));
vi.mock('../components/ScheduledPopup', () => ({ default: () => <div data-testid="mock-scheduled-popup">ScheduledPopup</div> }));

describe('Home Page', () => {
  it('renders all main sections of the homepage', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-top-announcements')).toBeInTheDocument();
    expect(screen.getByTestId('mock-info-cards')).toBeInTheDocument();
    expect(screen.getByTestId('mock-vision-mission')).toBeInTheDocument();
    expect(screen.getByTestId('mock-director-desk')).toBeInTheDocument();
    expect(screen.getByTestId('mock-banner-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-scheduled-popup')).toBeInTheDocument();
  });
});
