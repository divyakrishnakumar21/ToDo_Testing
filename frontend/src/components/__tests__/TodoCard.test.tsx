import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoCard } from '../TodoCard';

describe('TodoCard', () => {
  it('renders todo card with title', () => {
  render(<TodoCard id="1" title="Test Task" description="desc" dueDate="2025-08-21" priority="high" important={true} completed={false} onComplete={() => {}} />);
    expect(screen.getByText(/test task/i)).toBeInTheDocument();
  });
});
