import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VisionMissionHome from './VisionMissionHome';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('VisionMissionHome Component', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver;
  });

  afterAll(() => {
    window.IntersectionObserver = undefined;
  });

  const renderComponent = () => render(
    <BrowserRouter>
      <VisionMissionHome />
    </BrowserRouter>
  );

  it('renders Vision & Mission heading', () => {
    renderComponent();
    expect(screen.getByText('Vision & Mission')).toBeInTheDocument();
  });

  it('renders Vision content', () => {
    renderComponent();
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText(/To be a centre of excellence in technical education/i)).toBeInTheDocument();
  });

  it('renders Mission content', () => {
    renderComponent();
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText(/Quality Education – To provide a dynamic and inclusive learning environment/i)).toBeInTheDocument();
    expect(screen.getByText(/Research & Innovation – To promote research/i)).toBeInTheDocument();
  });

  it('renders Read Full Vision & Mission link', () => {
    renderComponent();
    const link = screen.getByRole('link', { name: /Read Full Vision & Mission/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about/vision-mission');
  });
});
