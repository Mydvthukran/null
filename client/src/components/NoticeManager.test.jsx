import { render, screen, waitFor } from '@testing-library/react';
import NoticeManager from './NoticeManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('NoticeManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Notice 1', category: 'Notice', date: '2026-08-01', status: 'Active' },
          { id: 2, title: 'Notice 2', category: 'Notice', date: '2026-08-05', status: 'Archived' }
        ])
      })
    ));
    vi.stubGlobal('URL', { createObjectURL: vi.fn(), revokeObjectURL: vi.fn() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<NoticeManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Notice Management')).toBeInTheDocument();
  });

  it('displays fetched notices', async () => {
    render(<NoticeManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Notice 1')).toBeInTheDocument();
      expect(screen.getByText('Notice 2')).toBeInTheDocument();
    });
  });

  it('renders add new notice button', () => {
    render(<NoticeManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('+ New Notice')).toBeInTheDocument();
  });

  it('does not render delete icon for regular admin', async () => {
    render(<NoticeManager admin={{ role: 'admin' }} />);
    
    await waitFor(() => {
      const deleteButtons = screen.queryAllByRole('button', { name: /Delete/i });
      expect(deleteButtons.length).toBe(0);
    });
  });
  
  it('filters notices correctly', async () => {
    render(<NoticeManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Notice 1')).toBeInTheDocument();
    });

    const activeFilterBtn = screen.getByRole('button', { name: 'Archived' });
    activeFilterBtn.click();
    
    await waitFor(() => {
      expect(screen.queryByText('Notice 1')).not.toBeInTheDocument(); 
      expect(screen.getByText('Notice 2')).toBeInTheDocument();
    });
  });
});
