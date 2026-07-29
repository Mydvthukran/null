import { render, screen, waitFor } from '@testing-library/react';
import SettingsManager from './SettingsManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('SettingsManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, key: 'contact_email', value: 'admin@college.edu' },
          { id: 2, key: 'contact_phone', value: '123-456-7890' }
        ])
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<SettingsManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Site Settings')).toBeInTheDocument();
  });

  it('displays fetched settings inputs', async () => {
    render(<SettingsManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeGreaterThan(0);
      expect(screen.getByDisplayValue('admin@college.edu')).toBeInTheDocument();
    });
  });

  it('renders save button', () => {
    render(<SettingsManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Save Settings')).toBeInTheDocument();
  });
});
