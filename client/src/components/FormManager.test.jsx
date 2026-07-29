import { render, screen, waitFor } from '@testing-library/react';
import FormManager from './FormManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('FormManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, type: 'Contact', name: 'Alice', email: 'alice@email.com', message: 'Hello', status: 'Unread' },
          { id: 2, type: 'Support', name: 'Bob', email: 'bob@email.com', message: 'Help', status: 'Read' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<FormManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Form Submissions')).toBeInTheDocument();
  });

  it('displays fetched submissions', async () => {
    render(<FormManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('renders filter tabs', () => {
    render(<FormManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });

  it('filters forms', async () => {
    render(<FormManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    const contactFilter = screen.getByRole('button', { name: 'Contact' });
    contactFilter.click();
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument(); 
    });
  });
});
