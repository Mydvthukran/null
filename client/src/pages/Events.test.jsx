import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Events from './Events';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Events Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((url) => {
      if (url.includes('/notices')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
      }
      return Promise.resolve({ ok: true,
        json: () => Promise.resolve([
          { id: 1, title: 'Annual Tech Fest', date: '2025-05-10', category: 'Fest' }
        ])
      });
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderPage = () => render(
    <BrowserRouter>
      <Events />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Events & Seminars')).toBeInTheDocument();
  });

  it('fetches and displays events', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Annual Tech Fest')).toBeInTheDocument();
    });
  });
});
