import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Hero';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../context/SettingsContext', () => ({
  useSettings: vi.fn(() => ({
    welcome_title: 'Mock Title',
    welcome_subtitle: 'Mock Subtitle'
  }))
}));

describe('Hero Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderHero = () => render(
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );

  it('renders hero title and subtitle from context', () => {
    renderHero();
    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Subtitle')).toBeInTheDocument();
  });

  it('renders static text content', () => {
    renderHero();
    expect(screen.getByText('Admissions Open for 2026-27 Session')).toBeInTheDocument();
  });

  it('renders correct call to action buttons', () => {
    renderHero();
    const portalBtn = screen.getByText('Admission Portal');
    const queryBtn = screen.getByText('Query Form');
    expect(portalBtn).toBeInTheDocument();
    expect(portalBtn).toHaveAttribute('href', 'https://techadmissionshry.gov.in/');
    expect(queryBtn).toBeInTheDocument();
    expect(queryBtn).toHaveAttribute('href', '/admission-form');
  });

  it('renders carousel indicators', () => {
    renderHero();
    const indicators = screen.getAllByRole('button');
    expect(indicators).toHaveLength(4); // 4 images in the carousel
    expect(indicators[0]).toHaveClass('active');
  });

  it('changes active indicator on timer', () => {
    renderHero();
    const indicators = screen.getAllByRole('button');
    expect(indicators[0]).toHaveClass('active');
    
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    expect(indicators[0]).not.toHaveClass('active');
    expect(indicators[1]).toHaveClass('active');
  });
});
