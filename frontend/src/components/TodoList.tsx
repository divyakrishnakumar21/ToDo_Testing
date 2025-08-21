import React, { useState } from 'react';
import { TodoCardProps } from './TodoCard';

interface TodoListProps {
  todos: TodoCardProps[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, onComplete }) => {
  const [sortType, setSortType] = useState<'date' | 'name' | 'priority-low-high' | 'priority-high-low' | 'recent'>('date');
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const importantTasks = todos.filter((todo: TodoCardProps) => todo.important);
  const upcoming = todos.filter((todo: TodoCardProps) => !todo.completed);

  // Sort upcoming tasks
  const sortedUpcoming = [...upcoming].sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      'critical': 1,
      'high': 2,
      'medium': 3,
      'low': 4,
      'none': 4, // treat 'none' as 'low'
      'verylow': 5,
      undefined: 4,
      '': 4
    };
    if (sortType === 'date') {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateA - dateB;
    } else if (sortType === 'priority-low-high') {
      return (priorityOrder[a.priority?.toLowerCase() || 'none'] - priorityOrder[b.priority?.toLowerCase() || 'none']);
    } else if (sortType === 'priority-high-low') {
      return (priorityOrder[b.priority?.toLowerCase() || 'none'] - priorityOrder[a.priority?.toLowerCase() || 'none']);
    } else if (sortType === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortType === 'recent') {
      // Sort by most recently added (assuming todos are ordered by creation, newest last)
      return 0; // No sort needed, just reverse the array below
    } else {
      return 0;
    }
  });
  const finalUpcoming = sortType === 'recent' ? [...sortedUpcoming].reverse() : sortedUpcoming;

  // Helper to display date and time
  const formatDateTime = (dt?: string) => {
    if (!dt) return 'No date';
    // If dt is only a date string (YYYY-MM-DD), show only date
    if (/^\d{4}-\d{2}-\d{2}$/.test(dt)) {
      const dateObj = new Date(dt);
      return dateObj.toLocaleDateString();
    }
    // Otherwise, show date and time
    const dateObj = new Date(dt);
    const dateStr = dateObj.toLocaleDateString();
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} ${timeStr}`;
  };

  const today = new Date();
  const todayTasks = todos.filter((todo: TodoCardProps) => {
    if (!todo.dueDate) return false;
    const due = new Date(todo.dueDate);
    return due.getFullYear() === today.getFullYear() &&
      due.getMonth() === today.getMonth() &&
      due.getDate() === today.getDate();
  });

  const handleCompleteWithAnimation = (id: string, completed: boolean) => {
    if (completed) {
      setRemovingIds(prev => [...prev, id]);
      setTimeout(() => {
        onComplete(id, completed);
        setRemovingIds(prev => prev.filter(rid => rid !== id));
      }, 700); // 700ms animation
    } else {
      onComplete(id, completed);
    }
  };

  return (
    <>
      {/* Main container for tables, align and space evenly without changing style values */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', width: '100%' }}>
        {/* Row for Important and Today tables, spaced evenly */}
  <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', width: '100%' }}>
          <div style={{ minWidth: '600px', maxWidth: '750px', marginBottom: '32px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Important Tasks</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181a1b', boxShadow: '0 2px 8px #111', borderRadius: '8px', overflow: 'hidden' }}>
              <thead style={{ background: '#FFD700', color: '#181a1b' }}>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Due Date</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {importantTasks.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>No important tasks</td></tr>
                ) : importantTasks.map((todo: TodoCardProps) => (
                    <tr key={todo.id} data-testid={`important-row-${todo.id}-${todo.title.replace(/\s+/g, '-')}`} style={{ background: '#222' }}>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.title}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.description}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{formatDateTime(todo.dueDate)}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#FFD700' }}>
                      {(() => {
                        switch ((todo.priority || '').toLowerCase()) {
                          case 'critical': return 'Critical';
                          case 'high': return 'High';
                          case 'medium': return 'Medium';
                          case 'low': return 'Low';
                          case 'verylow': return 'Very Low';
                          default: return 'None';
                        }
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Spacer between tables */}
          <div style={{ width: '24px' }} />
          {/* Highlights of today table */}
          <div style={{ minWidth: '600px', maxWidth: '750px', marginBottom: '32px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Highlights of Today</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181a1b', boxShadow: '0 2px 8px #111', borderRadius: '8px', overflow: 'hidden' }}>
              <thead style={{ background: '#FFD700', color: '#181a1b' }}>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Title</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Due Date</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {todayTasks.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>No tasks for today</td></tr>
                ) : todayTasks.map((todo: TodoCardProps) => (
                    <tr key={todo.id} data-testid={`today-row-${todo.id}-${todo.title.replace(/\s+/g, '-')}`} style={{ background: '#222' }}>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.title}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.description}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{formatDateTime(todo.dueDate)}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#FFD700' }}>{todo.priority && todo.priority !== 'none' ? todo.priority : 'None'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Row for All Tasks and Upcoming Tasks tables, spaced evenly */}
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', width: '100%' }}>
          <div style={{ flex: 1, minWidth: '600px', maxWidth: '750px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFD700' }}>All Tasks</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181a1b', boxShadow: '0 2px 8px #111', borderRadius: '8px', overflow: 'hidden' }}>
              <thead style={{ background: '#FFD700', color: '#181a1b' }}>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Complete</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Title</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Description</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Due Date</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Priority</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Important</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.filter(todo => !todo.completed).length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                      No tasks available
                    </td>
                  </tr>
                ) : (
                  todos.filter(todo => !todo.completed || removingIds.includes(todo.id)).map((todo: TodoCardProps) => (
                      <tr key={todo.id} data-testid={`task-row-${todo.id}-${todo.title.replace(/\s+/g, '-')}`} style={{
                      background: '#222',
                      textDecoration: todo.completed || removingIds.includes(todo.id) ? 'line-through' : 'none',
                      opacity: removingIds.includes(todo.id) ? 0.3 : 1,
                      transition: 'opacity 0.7s'
                    }}>
                      <td style={{ textAlign: 'center', border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={e => handleCompleteWithAnimation(todo.id, e.target.checked)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.title}</td>
                      <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.description}</td>
                      <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{formatDateTime(todo.dueDate)}</td>
                      <td style={{ border: '1px solid #444', padding: '8px', color: '#FFD700' }}>{todo.priority && todo.priority !== 'none' ? todo.priority : 'None'}</td>
                      <td style={{ border: '1px solid #444', padding: '8px', textAlign: 'center', color: '#FFD700' }}>{todo.important ? '★' : ''}</td>
                      <td style={{ border: '1px solid #444', padding: '8px', textAlign: 'center' }}>
                        <button onClick={() => onEdit(todo.id)} style={{ marginRight: '4px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => onDelete(todo.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div style={{ flex: 1, minWidth: '500px', maxWidth: '600px', borderLeft: '1px solid #444', paddingLeft: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ textAlign: 'center', color: '#FFD700', marginBottom: 0 }}>Upcoming Tasks</h2>
              <select value={sortType} onChange={e => setSortType(e.target.value as any)} style={{ marginLeft: '16px', padding: '6px', borderRadius: '4px', border: '1px solid #ffb74d', background: '#232526', color: '#ffb74d', fontWeight: 500 }}>
                <option value="date">Sort by date</option>
                <option value="name">Sort by name</option>
                <option value="priority-low-high">Sort by priority (Low to High)</option>
                <option value="priority-high-low">Sort by priority (High to Low)</option>
                <option value="recent">Sort by Recently added</option>
              </select>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#181a1b', boxShadow: '0 2px 8px #111', borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
              <thead style={{ background: '#FFD700', color: '#181a1b' }}>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Title</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Description</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Due Date</th>
                  <th style={{ padding: '10px', border: '1px solid #444' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {finalUpcoming.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>All tasks completed!</td></tr>
                ) : finalUpcoming.map((todo: TodoCardProps) => (
                  <tr key={todo.id} style={{ background: '#222' }}>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.title}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{todo.description}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#f5f5f5' }}>{formatDateTime(todo.dueDate)}</td>
                    <td style={{ border: '1px solid #444', padding: '8px', color: '#FFD700' }}>{todo.priority && todo.priority !== 'none' ? todo.priority : 'None'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ height: '32px' }} />
          </div>
        </div>
      </div>
    </>
  );
};
