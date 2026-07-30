import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from './Search';
import { describe, it, expect } from 'vitest';

describe('Search Page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );

  it('renders section title', () => {
    renderPage();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('displays no results when query is empty', () => {
    renderPage();
    expect(screen.getByText('Results for')).toBeInTheDocument();
  });
});
