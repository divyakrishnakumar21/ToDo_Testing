
import React from 'react';

export interface TodoCardProps {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  important?: boolean;
  priority?: string;
  onComplete?: (id: string, completed: boolean) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ id, title, description, dueDate, completed, important, priority, onComplete }) => {
  let dueDateDisplay = 'No date';
  if (dueDate) {
    const dateObj = new Date(dueDate);
    const dateStr = dateObj.toLocaleDateString();
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dueDateDisplay = `${dateStr} ${timeStr}`;
  }
  return (
    <div style={{ border: '1px solid #ccc', margin: '8px', padding: '8px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={e => onComplete && onComplete(id, e.target.checked)}
        style={{ marginRight: '12px' }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h3>
        <p style={{ textDecoration: completed ? 'line-through' : 'none', marginBottom: '8px' }}>{description}</p>
        <p>Due: {dueDateDisplay}</p>
        {important && <span style={{ color: '#FFD700', fontWeight: 700 }}>★ Important</span>}
        <span style={{ marginLeft: '12px', color: '#1976d2' }}>
          Priority: {(() => {
            switch ((priority || '').toLowerCase()) {
              case 'critical': return 'Critical';
              case 'high': return 'High';
              case 'medium': return 'Medium';
              case 'low': return 'Low';
              case 'verylow': return 'Very Low';
              default: return 'None';
            }
          })()}
        </span>
      </div>
    </div>
  );
};
