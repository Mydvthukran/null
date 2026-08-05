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
    expect(link).toHaveAttribute('href', 'https://www.facebook.com/people/State-Institute-of-Engineering-Technology-Panchkula/61588014391559/');
  });

  it('renders twitter link correctly', () => {
    render(<SocialMediaBar />);
    const link = screen.getByLabelText('Twitter');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://x.com/sietpkl');
  });

  it('renders instagram link correctly', () => {
    render(<SocialMediaBar />);
    const link = screen.getByLabelText('Instagram');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.instagram.com/siet.panchkula/?hl=en');
  });
});
