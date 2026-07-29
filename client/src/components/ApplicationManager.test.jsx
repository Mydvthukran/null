import { render, screen, waitFor } from '@testing-library/react';
import ApplicationManager from './ApplicationManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ApplicationManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'John Doe', email: 'john@example.com', program: 'B.Tech', status: 'Pending' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', program: 'LEET', status: 'Approved' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<ApplicationManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Admission Applications')).toBeInTheDocument();
  });

  it('displays fetched applications', async () => {
    render(<ApplicationManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('renders status filter tabs', () => {
    render(<ApplicationManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pending' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Approved' })).toBeInTheDocument();
  });

  it('filters applications', async () => {
    render(<ApplicationManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const pendingFilter = screen.getByRole('button', { name: 'Pending' });
    pendingFilter.click();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument(); 
    });
  });
});
