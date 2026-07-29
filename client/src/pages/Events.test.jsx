import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Events from './Events';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Events Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Annual Sports Meet', date: '2026-08-01' },
          { id: 2, title: 'Tech Fest', date: '2026-09-15' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderPage = () => render(
    <BrowserRouter>
      <Events />
    </BrowserRouter>
  );

  it('renders section title', async () => {
    renderPage();
    expect(screen.getByText('Events & Activities')).toBeInTheDocument();
  });

  it('fetches and displays events', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Annual Sports Meet')).toBeInTheDocument();
      expect(screen.getByText('Tech Fest')).toBeInTheDocument();
    });
  });
});
