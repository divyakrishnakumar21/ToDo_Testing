
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
    <div className="card-animate" style={{
      border: '2px solid #FFD700',
      margin: '12px',
      padding: '18px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)',
      boxShadow: '0 2px 12px #222',
      transition: 'box-shadow 0.3s, transform 0.3s',
      animation: 'cardFadeIn 0.7s cubic-bezier(.4,0,.2,1)'
    }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={e => onComplete && onComplete(id, e.target.checked)}
        style={{ marginRight: '18px', accentColor: '#FFD700', width: '22px', height: '22px', cursor: 'pointer', transition: 'accent-color 0.3s' }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ textDecoration: completed ? 'line-through' : 'none', color: '#FFD700', fontWeight: 700, fontSize: '1.3em', marginBottom: '6px', letterSpacing: '1px', transition: 'color 0.3s' }}>{title}</h3>
        <p style={{ textDecoration: completed ? 'line-through' : 'none', marginBottom: '8px', color: '#f5f5f5', fontSize: '1em', transition: 'color 0.3s' }}>{description}</p>
        <p style={{ color: '#FFD700', fontWeight: 500, fontSize: '1em', marginBottom: '4px' }}>Due: {dueDateDisplay}</p>
        {important && <span style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.1em', marginRight: '12px', textShadow: '0 0 8px #FFD700' }}>★ Important</span>}
        <span style={{ marginLeft: '12px', color: '#1976d2', fontWeight: 700, fontSize: '1.1em' }}>
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
