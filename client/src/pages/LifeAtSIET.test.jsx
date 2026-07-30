import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LifeAtSIET from './LifeAtSIET';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('LifeAtSIET Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve({
          images: [
            { id: 1, title: 'Campus Photo', category: 'Campus', imagePath: 'campus.jpg' }
          ]
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders main heading', async () => {
    render(
      <BrowserRouter>
        <LifeAtSIET />
      </BrowserRouter>
    );
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });

  it('fetches and displays gallery images', async () => {
    render(
      <BrowserRouter>
        <LifeAtSIET />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Campus Photo')).toBeInTheDocument();
      expect(screen.getByText('Campus')).toBeInTheDocument();
    });
  });
});
