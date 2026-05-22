import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
