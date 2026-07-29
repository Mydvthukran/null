import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ScheduledPopup from './ScheduledPopup';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ScheduledPopup Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Popup Title', file_path: 'popup.jpg', status: 'Active', category: 'Home Carousel' }
        ])
      })
    ));
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does not render if closed previously in session', () => {
    sessionStorage.setItem('hasSeenPopup', 'true');
    render(
      <BrowserRouter>
        <ScheduledPopup />
      </BrowserRouter>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
