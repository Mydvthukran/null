import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactUs from './ContactUs';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../context/SettingsContext', () => ({
  useSettings: vi.fn(() => ({
    contact_email: 'test@college.edu',
    contact_phone: '999-888-7777',
    address: 'Test Address'
  }))
}));

describe('ContactUs Page', () => {
  it('renders contact information correctly', () => {
    render(
      <BrowserRouter>
        <ContactUs />
      </BrowserRouter>
    );

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('test@college.edu')).toBeInTheDocument();
    expect(screen.getByText('999-888-7777')).toBeInTheDocument();
  });
});
