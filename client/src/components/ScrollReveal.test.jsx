import { render } from '@testing-library/react';
import ScrollReveal from './ScrollReveal';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('ScrollReveal Component', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver;
  });

  afterAll(() => {
    window.IntersectionObserver = undefined;
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    );
    
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollReveal className="custom-class">
        <div>Test Content</div>
      </ScrollReveal>
    );
    
    expect(container.firstChild).toHaveClass('reveal');
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
