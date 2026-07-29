import { render, screen } from '@testing-library/react';
import SocialMediaBar from './SocialMediaBar';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../context/SettingsContext', () => ({
  useSettings: vi.fn(() => ({
    facebook_link: 'https://facebook.com/test',
    twitter_link: 'https://twitter.com/test',
    instagram_link: 'https://instagram.com/test',
    linkedin_link: 'https://linkedin.com/test'
  }))
}));

describe('SocialMediaBar Component', () => {
  it('renders facebook link correctly', () => {
    render(<SocialMediaBar />);
    const link = screen.getByLabelText('Facebook');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://facebook.com/test');
  });

  it('renders twitter link correctly', () => {
    render(<SocialMediaBar />);
    const link = screen.getByLabelText('Twitter');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://twitter.com/test');
  });

  it('renders instagram link correctly', () => {
    render(<SocialMediaBar />);
    const link = screen.getByLabelText('Instagram');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://instagram.com/test');
  });

  it('renders linkedin link correctly', () => {
    render(<SocialMediaBar />);
    const link = screen.getByLabelText('LinkedIn');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://linkedin.com/test');
  });
});
