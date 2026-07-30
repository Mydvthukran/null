import { render, screen, waitFor } from '@testing-library/react';
import SettingsManager from './SettingsManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('SettingsManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true,
        json: () => Promise.resolve({
          welcome_title: 'Test',
          contact_email: 'admin@college.edu',
          contact_phone: '123-456-7890'
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<SettingsManager token="test" />);
    await waitFor(() => {
      expect(screen.getByText('System Settings & Branding')).toBeInTheDocument();
    });
  });

  it('displays fetched settings inputs', async () => {
    render(<SettingsManager token="test" />);
    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThan(0);
      expect(screen.getByDisplayValue('admin@college.edu')).toBeInTheDocument();
    });
  });

  it('renders save button', async () => {
    render(<SettingsManager token="test" />);
    await waitFor(() => {
      expect(screen.getByText('Save Settings')).toBeInTheDocument();
    });
  });
});
