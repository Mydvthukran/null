import { render, screen, waitFor } from '@testing-library/react';
import EventManager from './EventManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('EventManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve([
          { id: 1, title: 'Exam Notice', date: '2023-10-10', category: 'Event', status: 'Upcoming' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<EventManager token="test" />);
    expect(screen.getByText('Manage Announcements')).toBeInTheDocument();
    expect(screen.getByText('+ Add Announcement')).toBeInTheDocument();
  });

  it('displays fetched events', async () => {
    render(<EventManager token="test" />);
    await waitFor(() => {
      expect(screen.getByText('Exam Notice')).toBeInTheDocument();
    });
  });
});
