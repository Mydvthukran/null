import { render, screen, waitFor } from '@testing-library/react';
import BannerCarousel from './BannerCarousel';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('BannerCarousel Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve({
          images: [
            { id: 1, title: 'Campus View', category: 'Home Carousel', imagePath: 'test.jpg' }
          ]
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<BannerCarousel />);
    expect(screen.getByText('Institute Gallery')).toBeInTheDocument();
  });

  it('fetches and displays banners', async () => {
    render(<BannerCarousel />);
    await waitFor(() => {
      expect(screen.getByText('Campus View')).toBeInTheDocument();
    });
  });
});
