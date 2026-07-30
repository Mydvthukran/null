import { render, screen, waitFor } from '@testing-library/react';
import NoticeManager from './NoticeManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('NoticeManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve([
          { id: 1, title: 'Important Notice', date: '2023-10-10', category: 'Notice', status: 'Active' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<NoticeManager token="test" />);
    expect(screen.getByText('Manage Notices')).toBeInTheDocument();
    expect(screen.getByText('+ Add Notice')).toBeInTheDocument();
  });

  it('displays fetched notices', async () => {
    render(<NoticeManager token="test" />);
    await waitFor(() => {
      expect(screen.getByText('Important Notice')).toBeInTheDocument();
    });
  });
});
