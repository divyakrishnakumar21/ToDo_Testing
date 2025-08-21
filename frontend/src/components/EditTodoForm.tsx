import React, { useState } from 'react';
import { TodoCardProps } from './TodoCard';

interface EditTodoFormProps {
  todo: TodoCardProps;
  onUpdate: (todo: TodoCardProps) => void;
  onCancel: () => void;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  // Split dueDate into date and time if possible
  let initialDate = '';
  let initialTime = '';
  if (todo.dueDate) {
    const [date, time] = todo.dueDate.split('T');
    initialDate = date;
    initialTime = time || '';
  }
  const [dueDate, setDueDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let deadline = dueDate;
    if (dueDate && time) {
      deadline = `${dueDate}T${time}`;
    }
    if (dueDate && !time) {
      deadline = dueDate;
    }
    onUpdate({ ...todo, title, description, dueDate: deadline });
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    onCancel();
  };

  if (!showModal) return null;

  return (
    <div className="modal-animate" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'modalFadeIn 0.5s cubic-bezier(.4,0,.2,1)'
    }}>
      <div className="card-animate" style={{
        background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)',
        padding: '32px 28px',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
        maxWidth: '520px',
        width: '100%',
        border: '2.5px solid #FFD700',
        outline: '2px solid #444',
        outlineOffset: '-8px',
        position: 'relative',
        zIndex: 1001,
        transition: 'box-shadow 0.3s, transform 0.3s',
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
          boxShadow: '0 2px 8px #222',
          animation: 'cardFadeIn 0.7s cubic-bezier(.4,0,.2,1)'
        }}>Edit your ToDo Task</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%' }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ width: '100%', minHeight: '48px', fontSize: '1.1em', marginBottom: '8px', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', transition: 'box-shadow 0.3s, border 0.3s' }} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{ width: '100%', minHeight: '48px', fontSize: '1.1em', marginBottom: '8px', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', transition: 'box-shadow 0.3s, border 0.3s' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 500, color: '#FFD700' }}>Select deadline:</span>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: '140px', fontSize: '1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', transition: 'box-shadow 0.3s, border 0.3s' }} />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100px', fontSize: '1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', transition: 'box-shadow 0.3s, border 0.3s' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
            <button type="submit" className="button-animate" style={{ cursor: 'pointer', background: 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)', color: '#232526', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', letterSpacing: '1px', transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s' }}>Update Todo</button>
            <button type="button" onClick={handleCancel} className="button-animate" style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', marginLeft: '8px', cursor: 'pointer', transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
