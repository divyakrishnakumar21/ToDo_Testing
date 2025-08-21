import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (todo: { title: string; description?: string; dueDate?: string; important?: boolean; priority?: string }) => void;
}


export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [important, setImportant] = useState(false);
  const [priority, setPriority] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let deadline = dueDate;
    if (dueDate && time) {
      deadline = `${dueDate}T${time}`;
    }
    onAdd({ title, description, dueDate: deadline, important, priority });
    setTitle('');
    setDescription('');
    setDueDate('');
    setTime('');
    setImportant(false);
    setPriority('1');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)',
      padding: '32px 28px',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      marginBottom: '40px',
      maxWidth: '520px',
      margin: '0 auto',
      border: '2.5px solid #FFD700',
      outline: '2px solid #444',
      outlineOffset: '-8px',
      position: 'relative',
      zIndex: 2
    }}>
      <h2 style={{
        color: '#FFD700',
        marginBottom: '18px',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '2em',
        letterSpacing: '1px',
        textShadow: '0 2px 12px #000',
        borderBottom: '2px solid #FFD700',
        paddingBottom: '10px',
        borderRadius: '8px',
        background: 'rgba(35,37,38,0.7)',
        boxShadow: '0 2px 8px #222'
      }}>Add your ToDo Tasks</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (required)" required style={{ width: '100%', minHeight: '48px', fontSize: '1.1em', marginBottom: '8px', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ cursor: 'pointer', fontSize: '1.3em', color: important ? '#FFD700' : '#bbb', textShadow: important ? '0 0 8px #FFD700' : 'none' }} onClick={() => setImportant(v => !v)} title="Mark Important">★</span>
            <span style={{ fontWeight: 500, color: '#FFD700' }}>Mark Important</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 500, color: '#FFD700' }}>Priority:</span>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ fontSize: '1em', padding: '4px', borderRadius: '4px', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700' }}>
              <option value="none">None</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="verylow">Very Low</option>
            </select>
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{ width: '100%', minHeight: '48px', fontSize: '1.1em', marginBottom: '8px', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 500, color: '#FFD700' }}>Select deadline:</span>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: '140px', fontSize: '1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222' }} />
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100px', fontSize: '1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)', color: '#232526', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', letterSpacing: '1px', transition: 'background 0.3s' }}>Add Todo</button>
        </div>
      </form>
    </div>
  );
};
