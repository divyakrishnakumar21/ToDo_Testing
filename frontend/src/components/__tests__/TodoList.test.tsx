import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoList } from '../TodoList';

describe('TodoList', () => {
  it('shows no tasks message when todos is empty', () => {
  render(<TodoList todos={[]} onComplete={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });
});
