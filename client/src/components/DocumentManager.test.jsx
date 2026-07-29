import { render, screen, waitFor } from '@testing-library/react';
import DocumentManager from './DocumentManager';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('DocumentManager Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Exam Guidelines', category: 'Academic', upload_date: '2026-08-01', file_path: 'exam.pdf' },
          { id: 2, title: 'Holiday List', category: 'General', upload_date: '2026-08-05', file_path: 'holidays.pdf' }
        ])
      })
    ));
    vi.stubGlobal('URL', { createObjectURL: vi.fn(), revokeObjectURL: vi.fn() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders correctly', async () => {
    render(<DocumentManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByText('Document Management')).toBeInTheDocument();
  });

  it('displays fetched documents', async () => {
    render(<DocumentManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Exam Guidelines')).toBeInTheDocument();
      expect(screen.getByText('Holiday List')).toBeInTheDocument();
    });
  });

  it('renders filter tabs', () => {
    render(<DocumentManager admin={{ role: 'super_admin' }} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Academic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'General' })).toBeInTheDocument();
  });

  it('filters documents', async () => {
    render(<DocumentManager admin={{ role: 'super_admin' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Exam Guidelines')).toBeInTheDocument();
    });

    const academicFilter = screen.getByRole('button', { name: 'Academic' });
    academicFilter.click();
    
    await waitFor(() => {
      expect(screen.getByText('Exam Guidelines')).toBeInTheDocument();
      expect(screen.queryByText('Holiday List')).not.toBeInTheDocument(); 
    });
  });
});
