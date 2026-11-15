import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../firebase', () => ({
  auth: {},
  googleProvider: {},
  signInWithPopup: vi.fn(),
  firebaseSignOut: vi.fn(),
  onAuthStateChanged: vi.fn()
}));

import AdminDashboard from './AdminDashboard';

describe('AdminDashboard Component - Google Authentication Only', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'Unauthorized' })
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders Google Sign-In with authorized administrator email and no password inputs', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('SIET Admin Portal')).toBeInTheDocument();
    expect(screen.getByText('Sign in with your authorized administrator Google Account')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    expect(screen.getByText('my3596418@gmail.com')).toBeInTheDocument();

    // Verify username and password inputs are completely absent
    expect(screen.queryByPlaceholderText('••••••••')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('siet_admin')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
  });
});
