import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DirectorDesk from './DirectorDesk';
import { describe, it, expect } from 'vitest';

describe('DirectorDesk Component', () => {
  const renderComponent = () => render(
    <BrowserRouter>
      <DirectorDesk />
    </BrowserRouter>
  );

  it('renders section title correctly', () => {
    renderComponent();
    expect(screen.getByText("Director's Desk")).toBeInTheDocument();
  });

  it('renders director message snippet', () => {
    renderComponent();
    expect(screen.getByText(/I take the pleasure in welcoming you to State Institute of Engineering and Technology/i)).toBeInTheDocument();
  });

  it('renders director name and title', () => {
    renderComponent();
    expect(screen.getByText(/Prof. Anil Kumar/i)).toBeInTheDocument();
    expect(screen.getByText(/Director - Principal, SIET Panchkula/i)).toBeInTheDocument();
  });

  it('renders read more link', () => {
    renderComponent();
    const link = screen.getByRole('link', { name: /Read More/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about/directors-message');
  });

  it('renders director image', () => {
    renderComponent();
    const img = screen.getByRole('img', { name: /Prof. Anil Kumar - Director/i });
    expect(img).toBeInTheDocument();
  });
});
