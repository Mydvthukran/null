import { render, screen, waitFor, act } from '@testing-library/react';

import BannerCarousel from './BannerCarousel';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('BannerCarousel Component', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver;
  });

  afterAll(() => {
    window.IntersectionObserver = undefined;
  });

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          images: [
            { id: 1, title: 'Banner 1', category: 'Home Carousel', imagePath: 'banner1.jpg' },
            { id: 2, title: 'Banner 2', category: 'Home Carousel', imagePath: 'banner2.jpg' },
            { id: 3, title: 'Other Image', category: 'Gallery', imagePath: 'other.jpg' }
          ]
        })
      })
    ));
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('renders loading state initially', () => {
    render(<BannerCarousel />);
    expect(screen.getByText('Loading gallery...')).toBeInTheDocument();
  });

  it('fetches and filters carousel images', async () => {
    render(<BannerCarousel />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading gallery...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Banner 1')).toBeInTheDocument();
    expect(screen.getByText('Banner 2')).toBeInTheDocument();
    expect(screen.queryByText('Other Image')).not.toBeInTheDocument(); // Was filtered out
  });

  it('automatically rotates banners', async () => {
    render(<BannerCarousel />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading gallery...')).not.toBeInTheDocument();
    });

    // Check first slide is active
    const slides = screen.getAllByRole('article', { hidden: true });
    expect(slides[0]).toHaveClass('active');
    expect(slides[1]).not.toHaveClass('active');

    act(() => {
      vi.advanceTimersByTime(4500);
    });

    // Check second slide is active
    expect(slides[0]).not.toHaveClass('active');
    expect(slides[1]).toHaveClass('active');
  });

  it('handles empty banner case', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ images: [] })
      })
    ));

    render(<BannerCarousel />);

    await waitFor(() => {
      expect(screen.getByText('No Home Carousel images found.')).toBeInTheDocument();
    });
  });
});
