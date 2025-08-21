import React, { useState } from 'react';

interface Note {
  date: string;
  time: string;
  content: string;
}

export const CalendarNotes: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    if (!note.trim()) return;
    const now = new Date();
    setNotes(prev => [
      ...prev,
      {
        date: selectedDate,
        time: now.toLocaleTimeString(),
        content: note.trim()
      }
    ]);
    setNote('');
  };

  return (
    <div style={{ maxWidth: '520px', margin: '40px auto', background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.6)', padding: '32px', border: '2.5px solid #FFD700', color: '#FFD700' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '18px', fontWeight: 700, fontSize: '2em', letterSpacing: '1px', textShadow: '0 2px 12px #000', borderBottom: '2px solid #FFD700', paddingBottom: '10px', borderRadius: '8px', background: 'rgba(35,37,38,0.7)', boxShadow: '0 2px 8px #222' }}>Calendar & Daily Notes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <input type="date" value={selectedDate} onChange={handleDateChange} style={{ width: '180px', fontSize: '1.1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222' }} />
        <textarea value={note} onChange={handleNoteChange} placeholder="Write your diary or notes for the day..." style={{ width: '100%', minHeight: '64px', fontSize: '1.1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222' }} />
        <button onClick={handleSave} style={{ cursor: 'pointer', background: 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)', color: '#232526', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', letterSpacing: '1px', transition: 'background 0.3s' }}>Save Note</button>
      </div>
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ color: '#FFD700', marginBottom: '12px', textAlign: 'center' }}>Notes for {selectedDate}</h3>
        {notes.filter(n => n.date === selectedDate).length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>No notes for this date.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notes.filter(n => n.date === selectedDate).map((n, idx) => (
              <li key={idx} style={{ background: '#222', color: '#FFD700', borderRadius: '8px', marginBottom: '12px', padding: '12px', boxShadow: '0 2px 8px #111' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>{n.time}</div>
                <div>{n.content}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
