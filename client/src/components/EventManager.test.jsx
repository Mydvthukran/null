import { render, screen, waitFor } from '@testing-library/react';
import EventManager from './EventManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('EventManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Test Event 1', category: 'Event', date: '2026-08-01', status: 'Active' },
          { id: 2, title: 'Test Event 2', category: 'Event', date: '2026-08-05', status: 'Archived' }
        ])
      })
    ));
    vi.stubGlobal('URL', { createObjectURL: vi.fn(), revokeObjectURL: vi.fn() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<EventManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Event Management')).toBeInTheDocument();
  });

  it('displays fetched events', async () => {
    render(<EventManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    });
  });

  it('filters events', async () => {
    render(<EventManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    });

    const activeFilterBtn = screen.getByRole('button', { name: 'Active' });
    activeFilterBtn.click();
    
    await waitFor(() => {
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Event 2')).not.toBeInTheDocument(); // because it is archived
    });
  });

  it('renders add new event button', () => {
    render(<EventManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('+ New Event')).toBeInTheDocument();
  });

  it('renders delete icon for super_admin', async () => {
    render(<EventManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });
});
