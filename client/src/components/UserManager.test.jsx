import { render, screen, waitFor } from '@testing-library/react';
import UserManager from './UserManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('UserManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, username: 'admin1', role: 'admin', created_at: '2026-08-01' },
          { id: 2, username: 'super_admin1', role: 'super_admin', created_at: '2026-08-05' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<UserManager admin={{ role: 'super_admin', id: 2 }} />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  it('displays fetched users', async () => {
    render(<UserManager admin={{ role: 'super_admin', id: 2 }} />);
    
    await waitFor(() => {
      expect(screen.getByText('admin1')).toBeInTheDocument();
      expect(screen.getByText('super_admin1')).toBeInTheDocument();
    });
  });

  it('renders add new user button', () => {
    render(<UserManager admin={{ role: 'super_admin', id: 2 }} />);
    expect(screen.getByText('+ New User')).toBeInTheDocument();
  });

  it('renders disabled delete icon for self', async () => {
    render(<UserManager admin={{ role: 'super_admin', id: 2 }} />);
    
    await waitFor(() => {
      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      expect(deleteButtons[1]).toBeDisabled(); // self
    });
  });
});
