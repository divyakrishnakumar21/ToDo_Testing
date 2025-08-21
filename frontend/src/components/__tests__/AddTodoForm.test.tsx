import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddTodoForm } from '../AddTodoForm';

describe('AddTodoForm', () => {
  it('renders add todo form', () => {
    render(<AddTodoForm onAdd={() => {}} />);
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });
});
