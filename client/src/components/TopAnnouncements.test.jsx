import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopAnnouncements from './TopAnnouncements';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('TopAnnouncements Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Urgent Announcement', status: 'Active', category: 'Notice', file_path: null },
          { id: 2, title: 'Normal Announcement', status: 'Active', category: 'Notice', file_path: 'doc.pdf' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <TopAnnouncements />
      </BrowserRouter>
    );
    expect(await screen.findByText('ANNOUNCEMENTS')).toBeInTheDocument();
  });

  it('displays active announcements', async () => {
    render(
      <BrowserRouter>
        <TopAnnouncements />
      </BrowserRouter>
    );
    expect(await screen.findByText('Urgent Announcement')).toBeInTheDocument();
    expect(await screen.findByText('Normal Announcement')).toBeInTheDocument();
  });

  it('displays "New" badge for announcements', async () => {
    render(
      <BrowserRouter>
        <TopAnnouncements />
      </BrowserRouter>
    );
    const badges = await screen.findAllByText('New');
    expect(badges.length).toBe(2);
  });
});
