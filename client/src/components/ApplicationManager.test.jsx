import { render, screen, waitFor } from '@testing-library/react';
import ApplicationManager from './ApplicationManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ApplicationManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ applications: [
          { id: 1, name: 'John Doe', course: 'B.Tech', date: '2025-01-01', status: 'Pending' },
          { id: 2, name: 'Jane Smith', course: 'LEET', date: '2025-01-02', status: 'Accepted' }
        ]})
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

  it('renders status dropdowns for applications', async () => {
    render(<ApplicationManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBe(2);
    });
  });
});
