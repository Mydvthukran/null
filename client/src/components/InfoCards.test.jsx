import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InfoCards from './InfoCards';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('InfoCards Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve([
          { id: 1, title: 'Test Notice 1', date: '2026-07-01', status: 'Active', category: 'Notice', file_path: 'test1.pdf' },
          { id: 2, title: 'Archived Notice', date: '2026-06-01', status: 'Archived', category: 'Notice', file_path: 'test2.pdf' },
          { id: 3, title: 'Test Event 1', date: '2026-07-05', status: 'Active', category: 'Event', file_path: null }
        ])
      })
    ));

    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => setTimeout(cb, 0)));
    vi.stubGlobal('cancelAnimationFrame', vi.fn(clearTimeout));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders section title correctly', () => {
    render(
      <BrowserRouter>
        <InfoCards />
      </BrowserRouter>
    );
    expect(screen.getByText('Campus Updates')).toBeInTheDocument();
    expect(screen.getByText('Notices')).toBeInTheDocument();
  });

  it('fetches and displays notices (excluding archived)', async () => {
    render(
      <BrowserRouter>
        <InfoCards />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      // Loop duplicate count is 3, so there should be multiple elements
      const notice1 = screen.getAllByText('Test Notice 1');
      expect(notice1.length).toBeGreaterThan(0);
      
      const event1 = screen.getAllByText('Test Event 1');
      expect(event1.length).toBeGreaterThan(0);
    });

    expect(screen.queryByText('Archived Notice')).not.toBeInTheDocument();
  });
  
  it('displays empty state if no notices', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve([])
      })
    ));

    render(
      <BrowserRouter>
        <InfoCards />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      const emptyTitles = screen.getAllByText('No updates available');
      expect(emptyTitles.length).toBeGreaterThan(0);
      const emptySubtitles = screen.getAllByText('This section will appear once official updates are added.');
      expect(emptySubtitles.length).toBeGreaterThan(0);
    });
  });

  it('renders a link to all notices', () => {
    render(
      <BrowserRouter>
        <InfoCards />
      </BrowserRouter>
    );
    
    const viewAllLink = screen.getByRole('link', { name: /View all notices/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/all-notices');
  });
});
