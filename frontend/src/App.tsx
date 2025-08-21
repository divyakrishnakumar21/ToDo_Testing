import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { EditTodoForm } from './components/EditTodoForm';
import { TodoCardProps } from './components/TodoCard';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CompletedTasks } from './components/CompletedTasks';
import FullCalendarNotes from './components/FullCalendarNotes';

const API_URL = 'http://localhost:3000/tasks';

const greetings = [
  'Hi',
  'Hola',
  'Bonjour',
  'Hallo',
  'Ciao',
  'Olá',
  'Привет',
  'नमस्ते',
  'こんにちは',
  '你好',
  '안녕하세요',
  'Salam',
  'Merhaba',
  'Hej',
  'Ahoj',
  'Sveiki',
  'Halo',
  'Sawasdee',
  'Shalom',
  'Yassou',
  'Selam',
  'Hallo',
  'Hei',
  'Hei',
  'Hei',
];

function getTimeString(timezone: string) {
  return new Date().toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function AppContent() {
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon: string } | null>(null);
  const [dateTime, setDateTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    // Update date/time every second
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    // Fetch weather from Open-Meteo (no API key required)
  fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,
            desc: 'Clear',
            icon: '☀️',
          });
        }
      });
    return () => clearInterval(timer);
  }, []);
  const [greetingIdx, setGreetingIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIdx(idx => (idx + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodoCardProps | null>(null);

  // Fetch todos from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // Add new todo
  const handleAdd = (todo: { title: string; description?: string; dueDate?: string }) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: false })
    })
      .then(res => res.json())
      .then(newTodo => setTodos(prev => [...prev, newTodo]));
  };

  // Edit todo
  const handleEdit = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) setEditingTodo(todo);
  };

  // Update todo
  const handleUpdate = (updated: TodoCardProps) => {
    fetch(`${API_URL}/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos(prev => prev.map(t => t.id === newTodo.id ? newTodo : t));
        setEditingTodo(null);
      });
  };

  // Delete todo
  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)));
  };

  // Complete/incomplete todo
  const handleComplete = (id: string, completed: boolean) => {
    const completedOn = completed ? new Date().toISOString() : undefined;
    fetch(`${API_URL}/${id}/complete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed, completedOn })
    })
      .then(res => res.json())
      .then(updated => setTodos(prev => prev.map(t => t.id === updated.id ? updated : t)));
  };

  return (
    <div className="App" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1976d2 100%)',
      minHeight: '100vh',
      padding: '32px',
      color: '#FFD700',
      backgroundBlendMode: 'darken',
      transition: 'background 0.5s',
      fontFamily: 'Monotype Corsiva, cursive',
      position: 'relative'
    }}>
      {/* Home button at top right, hidden on main page */}
      {location.pathname !== '/' && (
        <Link to="/" style={{ position: 'absolute', top: 24, right: 24, zIndex: 100, background: 'rgba(35,37,38,0.85)', borderRadius: '10px', boxShadow: '0 2px 8px #222', padding: '8px 16px', color: '#FFD700', textDecoration: 'none', fontWeight: 700, fontSize: '1.1em', letterSpacing: '1px', transition: 'background 0.3s', border: '2px solid #FFD700' }}>
          Home
        </Link>
      )}
      {location.pathname !== '/calendar' && (
        <>
          {/* Time widget below weather widget on right side */}
          <div style={{ position: 'absolute', top: 320, right: 32, background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)', borderRadius: '20px', boxShadow: '0 4px 16px #222', padding: '24px 32px', color: '#FFD700', minWidth: '240px', textAlign: 'left', zIndex: 20, border: '2px solid #FFD700', fontFamily: 'Monotype Corsiva, cursive' }}>
            <div style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: '12px', color: '#FFD700', letterSpacing: '2px', textAlign: 'center', textShadow: '0 2px 8px #000' }}>World Clocks</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.2em', fontWeight: 700, marginRight: '10px' }}>🇮🇳</span>
              <span style={{ fontSize: '1.1em', fontWeight: 700, marginRight: '10px' }}>Bangalore</span>
              <span style={{ fontSize: '1.2em', fontWeight: 700 }}>{getTimeString('Asia/Kolkata')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.2em', fontWeight: 700, marginRight: '10px' }} role="img" aria-label="Germany">🇩🇪</span>
              <span style={{ fontSize: '1.1em', fontWeight: 700, marginRight: '10px' }}>Berlin</span>
              <span style={{ fontSize: '1.2em', fontWeight: 700 }}>{getTimeString('Europe/Berlin')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.2em', fontWeight: 700, marginRight: '10px' }} role="img" aria-label="United States">🇺🇸</span>
              <span style={{ fontSize: '1.1em', fontWeight: 700, marginRight: '10px' }}>Redmond</span>
              <span style={{ fontSize: '1.2em', fontWeight: 700 }}>{getTimeString('America/Los_Angeles')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2em', fontWeight: 700, marginRight: '10px' }}>🇨🇦</span>
              <span style={{ fontSize: '1.1em', fontWeight: 700, marginRight: '10px' }}>Toronto</span>
              <span style={{ fontSize: '1.2em', fontWeight: 700 }}>{getTimeString('America/Toronto')}</span>
            </div>
          </div>
          {/* Link just below the widget, not inside */}
          <div style={{ position: 'absolute', top: 580, right: 32, width: '240px', zIndex: 21, textAlign: 'center' }}>
            {location.pathname === '/completed' ? (
              <Link to="/" style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline', marginTop: '12px', display: 'block', cursor: 'pointer' }}>
                Go back
              </Link>
            ) : (
              <>
                <Link to="/completed" style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline', marginTop: '12px', display: 'block', cursor: 'pointer' }}>
                  Click here for completed tasks
                </Link>
                <Link to="/calendar" style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline', marginTop: '12px', display: 'block', cursor: 'pointer' }}>
                  Go to calendar
                </Link>
              </>
            )}
          </div>
        </>
      )}
<div style={{ position: 'relative', width: '100%' }}>
  <span style={{
    position: 'absolute',
    top: 0,
    left: 0,
    color: '#FFD700',
    fontWeight: 700,
    fontSize: '2.8em',
    margin: '24px 0 0 32px',
    zIndex: 10,
    textShadow: '0 4px 16px #000',
    fontFamily: 'Monotype Corsiva, cursive',
    letterSpacing: '2px',
    background: 'rgba(35,37,38,0.5)',
    borderRadius: '12px',
    padding: '8px 24px',
    boxShadow: '0 2px 8px #222'
  }}>{greetings[greetingIdx]} Divya</span>
</div>
<div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', width: '100%', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
  {/* Weather widget and date/time on right side, only if not on /calendar */}
  {location.pathname !== '/calendar' && (
    <div style={{ position: 'absolute', top: 32, right: 32, background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)', borderRadius: '20px', boxShadow: '0 4px 16px #222', padding: '24px 32px', color: '#FFD700', minWidth: '240px', textAlign: 'center', zIndex: 20, border: '2px solid #FFD700', fontFamily: 'Monotype Corsiva, cursive' }}>
      <div style={{ fontSize: '1.1em', fontWeight: 700, marginBottom: '4px', color: '#FFD700', letterSpacing: '1px' }}>Berlin, Germany</div>
      <div style={{ fontSize: '2em', marginBottom: '8px' }}>{weather ? weather.icon : '⛅'}</div>
      <div style={{ fontSize: '1.2em', fontWeight: 700 }}>{weather ? `${weather.temp}°C` : 'Loading...'}</div>
      <div style={{ fontSize: '1em', marginBottom: '8px' }}>{weather ? weather.desc : ''}</div>
      <div style={{ fontSize: '1em', fontWeight: 500 }}>{dateTime.toLocaleDateString()}</div>
      <div style={{ fontSize: '1.1em', fontWeight: 700 }}>{dateTime.toLocaleTimeString()}</div>
    </div>
  )}
  <img src={require('./Logo/ToDoAppLogo.png')} alt="Todo App Logo" style={{ height: '96px', width: '96px', marginRight: '24px', borderRadius: '18px', boxShadow: '0 4px 16px #222', objectFit: 'cover' }} />
  <h1 style={{ color: '#1976d2', marginBottom: '0', fontWeight: 700, textAlign: 'left' }}>What's on your mind today?</h1>
</div>
      <Routes>
        <Route path="/" element={
          <>
            <AddTodoForm onAdd={handleAdd} />
            {editingTodo ? (
              <EditTodoForm todo={editingTodo} onUpdate={handleUpdate} onCancel={() => setEditingTodo(null)} />
            ) : null}
            <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} onComplete={handleComplete} />
          </>
        } />
        <Route path="/completed" element={<CompletedTasks todos={todos} />} />
  <Route path="/calendar" element={<FullCalendarNotes />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
