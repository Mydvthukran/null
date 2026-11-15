import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllNoticesBoard from './AllNoticesBoard';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./ScrollReveal', () => ({ default: ({ children }) => <div>{children}</div> }));

describe('AllNoticesBoard Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Network error'))));
  });

  it('renders All Notices section title', () => {
    render(
      <BrowserRouter>
        <AllNoticesBoard />
      </BrowserRouter>
    );
    expect(screen.getByText('All Notices')).toBeInTheDocument();
  });

  it('displays the Revised Internal Complaint Committee notice', () => {
    render(
      <BrowserRouter>
        <AllNoticesBoard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Revised Internal Complaint Committee/i)).toBeInTheDocument();
    expect(screen.getByText(/02 Nov 2026/i)).toBeInTheDocument();
  });
});
