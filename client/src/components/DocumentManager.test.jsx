import { render, screen, waitFor } from '@testing-library/react';
import DocumentManager from './DocumentManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('DocumentManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve({
          documents: [
            { document_key: 'doc1', name: 'Prospectus 2026', category: 'General', size: '2 MB' }
          ]
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<DocumentManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('System Document Manager')).toBeInTheDocument();
    expect(screen.getByText('Website Documents')).toBeInTheDocument();
  });

  it('displays fetched documents', async () => {
    render(<DocumentManager admin={{ role: 'super_admin' }} />);
    await waitFor(() => {
      expect(screen.getByText('Prospectus 2026')).toBeInTheDocument();
    });
  });
});
