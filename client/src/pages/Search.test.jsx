import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from './Search';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Search Page', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          notices: [{ id: 1, title: 'Exam Notice' }],
          events: [{ id: 1, title: 'Annual Fest' }],
          gallery: []
        })
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderPage = () => render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Search Site')).toBeInTheDocument();
  });

  it('performs search when typing', async () => {
    renderPage();
    const input = screen.getByPlaceholderText('Enter search term (min 3 characters)...');
    fireEvent.change(input, { target: { value: 'Exam' } });
    
    await waitFor(() => {
      expect(screen.getByText('Exam Notice')).toBeInTheDocument();
      expect(screen.getByText('Annual Fest')).toBeInTheDocument(); // Since search is mocked, all results return
    });
  });
});
