import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
// ...existing code...
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface NoteEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  notes: string;
  lastUpdated: Date;
}

const FullCalendarNotes: React.FC = () => {
  // Double click detection for slot
  const [lastSlotClick, setLastSlotClick] = useState<number>(0);
  const [events, setEvents] = useState<NoteEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [note, setNote] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [editingEvent, setEditingEvent] = useState<NoteEvent | null>(null);
  // Add state for calendar navigation
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setShowModal(true);
    setNote('');
    setNoteTitle('');
    setEditingEvent(null);
  };

  const handleSelectEvent = (event: NoteEvent) => {
    setSelectedDate(event.start);
    setNote(event.notes);
    setNoteTitle(event.title);
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!selectedDate || !note.trim()) return;
    const now = new Date();
    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, notes: note.trim(), title: noteTitle.trim() || 'Diary Note', start: selectedDate, end: selectedDate, lastUpdated: now } : ev));
    } else {
      setEvents(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          title: noteTitle.trim() || 'Diary Note',
          start: selectedDate,
          end: selectedDate,
          notes: note.trim(),
          lastUpdated: now,
        },
      ]);
    }
    setShowModal(false);
    setNote('');
    setNoteTitle('');
    setEditingEvent(null);
  };

  const handleDelete = () => {
    if (editingEvent) {
      setEvents(prev => prev.filter(ev => ev.id !== editingEvent.id));
      setShowModal(false);
      setNote('');
      setNoteTitle('');
      setEditingEvent(null);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '32px', maxWidth: '1200px', margin: '40px auto', background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.6)', padding: '32px', border: '2.5px solid #FFD700', color: '#FFD700' }}>
      <div style={{ flex: 2 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '18px', fontWeight: 700, fontSize: '2em', letterSpacing: '1px', textShadow: '0 2px 12px #000', borderBottom: '2px solid #FFD700', paddingBottom: '10px', borderRadius: '8px', background: 'rgba(35,37,38,0.7)', boxShadow: '0 2px 8px #222' }}>Calendar & Daily Notes</h2>
        {/* Year selector dropdown */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px', gap: '12px' }}>
          <label htmlFor="year-select" style={{ color: '#FFD700', fontWeight: 700, fontSize: '1.1em' }}>Year:</label>
          <select
            id="year-select"
            value={calendarDate.getFullYear()}
            onChange={e => {
              const newYear = parseInt(e.target.value, 10);
              setCalendarDate(new Date(newYear, calendarDate.getMonth(), 1));
            }}
            style={{ fontSize: '1.1em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', padding: '4px 12px' }}
          >
            {Array.from({ length: 21 }, (_, i) => {
              const year = new Date().getFullYear() - 10 + i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '12px', color: '#FFD700', fontWeight: 500, fontSize: '1.1em', background: 'rgba(35,37,38,0.7)', borderRadius: '8px', padding: '8px 0', boxShadow: '0 1px 4px #222' }}>
          Double click to add or edit notes
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 650,
            background: '#181a1b',
            color: '#FFD700',
            borderRadius: '12px',
            boxShadow: '0 2px 8px #111',
            marginBottom: '32px',
            border: '2px solid #FFD700',
            fontFamily: 'Monotype Corsiva, cursive',
          }}
          selectable
          date={calendarDate}
          view={calendarView}
          onNavigate={(date: Date) => setCalendarDate(date)}
          onView={(view: string) => setCalendarView(view as 'month' | 'week' | 'day')}
          onSelectSlot={(slotInfo: { start: Date }) => {
            const now = Date.now();
            if (now - lastSlotClick < 350) {
              // Double click detected
              setSelectedDate(slotInfo.start);
              setNote('');
              setNoteTitle('');
              setEditingEvent(null);
              setShowModal(true);
            } else {
              // Single click: select date only
              setSelectedDate(slotInfo.start);
            }
            setLastSlotClick(now);
          }}
          onDoubleClickEvent={(event: NoteEvent) => {
            // Double click on event: edit note
            setSelectedDate(event.start);
            setNote(event.notes);
            setNoteTitle(event.title);
            setEditingEvent(event);
            setShowModal(true);
          }}
          onDoubleClickSlot={(slotInfo: { start: Date }) => {
            // Double click on empty slot: add note
            setSelectedDate(slotInfo.start);
            setNote('');
            setNoteTitle('');
            setEditingEvent(null);
            setShowModal(true);
          }}
          onSelectEvent={(event: NoteEvent) => {
            // Single click on event: select date only
            setSelectedDate(event.start);
          }}
          views={['month', 'week', 'day']}
          popup
          eventPropGetter={() => ({
            style: {
              backgroundColor: '#232526',
              color: '#FFD700',
              borderRadius: '8px',
              fontWeight: 700,
              border: '2px solid #FFD700',
              boxShadow: '0 2px 8px #111',
            },
          })}
          components={{
            event: ({ event }: { event: NoteEvent }) => (
              <span title={event.notes} style={{ color: '#FFD700', fontWeight: 700 }}>{event.title}</span>
            ),
          }}
        />
      </div>
      <div style={{ flex: 1, background: 'rgba(35,37,38,0.85)', borderRadius: '12px', boxShadow: '0 2px 8px #222', padding: '24px', minWidth: '320px', maxHeight: '650px', overflowY: 'auto' }}>
        <h3 style={{ color: '#FFD700', marginBottom: '16px', textAlign: 'center', fontWeight: 700, fontSize: '1.3em', letterSpacing: '1px', textShadow: '0 2px 8px #000', borderBottom: '2px solid #FFD700', paddingBottom: '8px', borderRadius: '8px', background: 'rgba(35,37,38,0.7)', boxShadow: '0 2px 8px #222' }}>Your Notes</h3>
        <div style={{ marginBottom: '18px', textAlign: 'center', color: '#FFD700', fontWeight: 500 }}>
          <span style={{ fontSize: '1.1em' }}>Selected Date: </span>
          <span style={{ fontWeight: 700, fontSize: '1.2em', background: '#232526', borderRadius: '6px', padding: '4px 12px', color: '#FFD700', boxShadow: '0 1px 4px #222' }}>
            {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'None'}
          </span>
        </div>
        {events.length === 0 || !selectedDate || events.filter(ev => format(ev.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')).length === 0 ? (
          <div style={{ color: '#FFD700', textAlign: 'center', marginTop: '32px', fontSize: '1.1em' }}>No notes for this date. Select a date on the calendar to view notes.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {events
              .filter(ev => selectedDate && format(ev.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
              .sort((a, b) => b.start.getTime() - a.start.getTime())
              .map(ev => (
                <li key={ev.id} style={{ marginBottom: '18px', background: '#232526', borderRadius: '8px', boxShadow: '0 1px 4px #222', padding: '16px', color: '#FFD700', position: 'relative' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1em', marginBottom: '6px' }}>
                    {ev.title || 'Diary Note'}
                    <span style={{ marginLeft: '12px', fontWeight: 400, fontSize: '0.95em', color: '#FFD70099' }}>{format(ev.start, 'yyyy-MM-dd')}</span>
                    <span style={{ marginLeft: '12px', fontWeight: 400, fontSize: '0.9em', color: '#FFD70066' }}>
                      Last updated: {ev.lastUpdated ? format(ev.lastUpdated, 'yyyy-MM-dd HH:mm:ss') : ''}
                    </span>
                  </div>
                  <div style={{ marginBottom: '10px', whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {ev.notes.split('\n').slice(0,2).join('\n')}
                    {ev.notes.split('\n').length > 2 || ev.notes.length > 120 ? ' ...' : ''}
                  </div>
                  <div style={{ display: 'flex', gap: '18px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); setSelectedDate(ev.start); setNote(ev.notes); setNoteTitle(ev.title); setEditingEvent(ev); setShowModal(true); }}
                      style={{ color: '#FFD700', fontWeight: 700, fontSize: '1em', textDecoration: 'underline', cursor: 'pointer', marginRight: '8px' }}
                    >Edit</a>
                    <span style={{ color: '#FFD700', fontWeight: 700 }}>|</span>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); setEvents(prev => prev.filter(evn => evn.id !== ev.id)); }}
                      style={{ color: '#d32f2f', fontWeight: 700, fontSize: '1em', textDecoration: 'underline', cursor: 'pointer', marginLeft: '8px' }}
                    >Delete</a>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)', padding: '32px 28px', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.6)', maxWidth: '420px', width: '100%', border: '2.5px solid #FFD700', outline: '2px solid #444', outlineOffset: '-8px', position: 'relative', zIndex: 1001 }}>
            <h3 style={{ color: '#FFD700', marginBottom: '18px', textAlign: 'center', fontWeight: 700, fontSize: '1.5em', letterSpacing: '1px', textShadow: '0 2px 12px #000', borderBottom: '2px solid #FFD700', paddingBottom: '10px', borderRadius: '8px', background: 'rgba(35,37,38,0.7)', boxShadow: '0 2px 8px #222' }}>{editingEvent ? 'Edit Note' : 'Add Note'} for {selectedDate && format(selectedDate, 'yyyy-MM-dd')}</h3>
            <input
              type="text"
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
              placeholder="Title for your note..."
              style={{ width: '100%', fontSize: '1.3em', fontWeight: 700, background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', marginBottom: '18px', padding: '10px' }}
            />
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Write your diary or notes for the day..." style={{ width: '100%', minHeight: '420px', fontSize: '1.2em', background: '#232526', color: '#FFD700', border: '1.5px solid #FFD700', borderRadius: '6px', boxShadow: '0 1px 4px #222', marginBottom: '16px', resize: 'vertical', padding: '14px' }} />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
              <button onClick={handleSave} style={{ cursor: 'pointer', background: 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)', color: '#232526', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', letterSpacing: '1px', transition: 'background 0.3s' }}>{editingEvent ? 'Update Note' : 'Save Note'}</button>
              <button onClick={() => setShowModal(false)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', marginLeft: '8px', cursor: 'pointer' }}>Cancel</button>
              {editingEvent && <button onClick={handleDelete} style={{ background: '#444', color: '#FFD700', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', marginLeft: '8px', cursor: 'pointer' }}>Delete</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FullCalendarNotes;
// ...existing code...
