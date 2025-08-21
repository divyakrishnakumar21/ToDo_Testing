import React, { useState } from 'react';
import { TodoCardProps } from './TodoCard';

interface EditTodoFormProps {
  todo: TodoCardProps;
  onUpdate: (todo: TodoCardProps) => void;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(todo.dueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...todo, title, description, dueDate });
  };

  return (
    <form onSubmit={handleSubmit}>
  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ width: '100%', minHeight: '48px', fontSize: '1.1em', marginBottom: '8px' }} />
  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{ width: '100%', minHeight: '48px', fontSize: '1.1em', marginBottom: '8px' }} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Update Todo</button>
    </form>
  );
};
