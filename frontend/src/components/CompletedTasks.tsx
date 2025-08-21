import React from 'react';
import { TodoCardProps } from './TodoCard';

interface CompletedTasksProps {
  todos: TodoCardProps[];
}

export const CompletedTasks: React.FC<CompletedTasksProps> = ({ todos }) => {
  return (
    <div style={{ minWidth: '600px', maxWidth: '750px', margin: '32px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Completed Tasks</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181a1b', boxShadow: '0 2px 8px #111', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#FFD700', color: '#181a1b' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #444' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #444' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #444' }}>Due Date</th>
            <th style={{ padding: '10px', border: '1px solid #444' }}>Priority</th>
            <th style={{ padding: '10px', border: '1px solid #444' }}>Completed On</th>
          </tr>
        </thead>
        <tbody>
          {todos.filter(todo => todo.completed).length === 0 ? (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>No completed tasks</td></tr>
          ) : todos.filter(todo => todo.completed).map((todo: TodoCardProps) => (
            <tr key={todo.id} style={{ background: '#222' }}>
              <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.title}</td>
              <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.description}</td>
              <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.dueDate ? new Date(todo.dueDate).toLocaleString() : 'No date'}</td>
              <td style={{ border: '1px solid #444', padding: '8px', color: '#FFD700' }}>{todo.priority && todo.priority !== 'none' ? todo.priority : 'None'}</td>
              <td style={{ border: '1px solid #444', padding: '8px', color: '#FFD700' }}>{(todo as any).completedOn ? new Date((todo as any).completedOn).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
