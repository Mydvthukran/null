import { render, screen, waitFor } from '@testing-library/react';
import FormManager from './FormManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('FormManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve({
          inquiries: [
            { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Test', message: 'Hello', date: '2025-01-01', status: 'New' }
          ]
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<FormManager token="test" />);
    expect(screen.getByText('Form Submissions (Contact Us)')).toBeInTheDocument();
  });

  it('displays fetched forms', async () => {
    render(<FormManager token="test" />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
