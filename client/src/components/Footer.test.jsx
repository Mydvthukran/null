import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../context/SettingsContext', () => ({
  useSettings: vi.fn(() => ({
    contact_email: 'test@example.com',
    contact_phone: '123-456-7890'
  }))
}));

describe('Footer Component', () => {
  const renderFooter = () => render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  it('renders the institute name and description', () => {
    renderFooter();
    expect(screen.getAllByText(/STATE INSTITUTE OF ENGINEERING & TECHNOLOGY, PANCHKULA/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Government Institute, Haryana/i)).toBeInTheDocument();
  });

  it('renders quick links', () => {
    renderFooter();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Academics')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
  });

  it('renders important external links', () => {
    renderFooter();
    const aicteLink = screen.getByText('AICTE');
    expect(aicteLink).toBeInTheDocument();
    expect(aicteLink).toHaveAttribute('href', 'https://www.aicte.gov.in/');
  });

  it('renders contact information from settings context', () => {
    renderFooter();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });

  it('renders the copyright year correctly', () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} State Institute`, 'i'))).toBeInTheDocument();
  });

  it('renders developers link', () => {
    renderFooter();
    const devLink = screen.getByRole('link', { name: /Students/i });
    expect(devLink).toHaveAttribute('href', '/developers');
  });
});
