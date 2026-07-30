import { render, screen, waitFor } from '@testing-library/react';
import UserManager from './UserManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('UserManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve({
          users: [
            { id: 1, username: 'admin', name: 'Admin User', role: 'super_admin' }
          ]
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<UserManager token="test" />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('+ Add User')).toBeInTheDocument();
  });

  it('displays fetched users', async () => {
    render(<UserManager token="test" />);
    await waitFor(() => {
      expect(screen.getByText('Admin User')).toBeInTheDocument();
    });
  });
});
