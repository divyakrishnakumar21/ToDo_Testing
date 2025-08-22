
import React, { useEffect, useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import AnimatedDrawerMenu from './components/AnimatedDrawerMenu';
import ProfileMenu from './components/ProfileMenu';
import HamburgerMenu from './components/HamburgerMenu';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import WorldClock from './components/WorldClock';
import WeatherWidget from './components/WeatherWidget';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { EditTodoForm } from './components/EditTodoForm';
import { TodoCardProps } from './components/TodoCard';
import { CompletedTasks as CompletedTasksTable } from './components/CompletedTasks';
import FullCalendarNotes from './components/FullCalendarNotes';
import NotesMenu from './components/NotesMenu';

import ForgotPassword from './components/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './components/ResetPassword';

function LoginPage({ setUser }: { setUser: (user: { name: string; email: string }) => void }) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  useEffect(() => {
    const storedUser = localStorage.getItem('todo_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.email) {
        navigate('/main', { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = (email: string, password: string) => {
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Login successful') {
          setLoginError(null);
          localStorage.setItem('todo_user', JSON.stringify(data.user));
          setUser(data.user);
          navigate('/main');
        } else {
          setLoginError(data.message || 'Login failed');
        }
      })
      .catch(() => setLoginError('Network error'));
  };

  const validateEmail = async (email: string) => {
    const res = await fetch('http://localhost:3000/auth/check-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    return data.exists;
  };

  const handleResetPassword = (email: string, password: string) => {
    fetch('http://localhost:3000/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setForgotMsg(data.message);
        setTimeout(() => {
          setShowForgot(false);
          setForgotMsg('');
        }, 3500);
      })
      .catch(() => {
        setForgotMsg('Error resetting password.');
        setTimeout(() => setForgotMsg(''), 2500);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)' }}>
      {!showForgot ? (
        <Login
          onLogin={handleLogin}
          onCreateAccount={() => navigate('/signup')}
          onForgotPassword={() => setShowForgot(true)}
          loginError={showForgot ? null : loginError}
        />
      ) : (
        <ForgotPassword
          onValidateEmail={validateEmail}
          onResetPassword={handleResetPassword}
          onCancel={() => setShowForgot(false)}
        />
      )}
      {forgotMsg && (
        <div style={{ color: '#1976d2', fontWeight: 700, marginTop: 16, background: '#fff', borderRadius: 8, padding: '12px 24px', boxShadow: '0 2px 8px #222' }}>{forgotMsg}</div>
      )}
      <WorldClock />
      <WeatherWidget />
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleSignup = (name: string, email: string, password: string) => {
    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Signup successful') {
          setShowModal(true);
        } else {
          alert(data.message || 'Signup failed');
        }
      })
      .catch(() => alert('Signup error'));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)' }}>
      <Signup onSignup={handleSignup} onLoginLink={() => navigate('/')} />
      <WorldClock />
      <WeatherWidget />
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 24px #222',
            padding: '40px 32px',
            minWidth: 320,
            textAlign: 'center',
            color: '#1976d2',
            fontWeight: 700
          }}>
            <h2 style={{ marginBottom: 16 }}>Sign Up Successful!</h2>
            <p style={{ marginBottom: 24 }}>Your account has been created.</p>
            <button onClick={() => { setShowModal(false); navigate('/'); }} style={{ background: '#FFD700', color: '#1976d2', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: '1.1em', cursor: 'pointer', boxShadow: '0 2px 8px #222' }}>Go to Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

const API_URL = 'http://localhost:3000/tasks';

function AppContent() {
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodoCardProps | null>(null);
  const greetings = [
    'Hi', 'Hola', 'Bonjour', 'Hallo', 'Ciao', 'Olá', 'Привет', 'नमस्ते', 'こんにちは', '你好', '안녕하세요', 'Salam', 'Merhaba', 'Hej', 'Ahoj', 'Sveiki', 'Halo', 'Sawasdee', 'Shalom', 'Yassou', 'Selam', 'Hallo', 'Hei', 'Hei', 'Hei'
  ];
  const [greetingIdx, setGreetingIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIdx(idx => (idx + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('todo_user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (user && user.email) {
      fetch(`${API_URL}?user=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => setTodos(data));
    }
  }, []);

  const handleAdd = (todo: { title: string; description?: string; dueDate?: string }) => {
    const storedUser = localStorage.getItem('todo_user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: false, user: user?.email })
    })
      .then(res => res.json())
      .then(newTodo => setTodos(prev => [...prev, newTodo]));
  };

  const handleEdit = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) setEditingTodo(todo);
  };

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

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)));
  };

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
    <div style={{
      width: '100%',
      maxWidth: 900,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 36,
      padding: '32px 32px 32px 32px',
      boxSizing: 'border-box',
      minHeight: 'calc(100vh - 64px)',
      position: 'relative',
    }}>
      {/* Top bar: logo, greeting, profile icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 36,
        width: '100%',
        gap: 24,
      }}>
  <img src={require('./Logo/ToDoAppLogo.png')} alt="Todo App Logo" style={{ height: 88, width: 88, borderRadius: 18, boxShadow: '0 4px 16px #222', objectFit: 'cover', marginRight: 16 }} />
        <div>
          <div style={{ fontSize: '2em', fontWeight: 700, color: '#FFD700', marginBottom: 4, textShadow: '0 2px 12px #1976d2' }}>{greetings[greetingIdx]} {localStorage.getItem('todo_user') ? JSON.parse(localStorage.getItem('todo_user') || '{}').name : ''}!</div>
          <div style={{ color: '#1976d2', fontWeight: 700, fontSize: '1.5em', marginBottom: 4, textShadow: '0 2px 12px #FFD700' }}>What's on your mind today?</div>
        </div>
      </div>
      {/* Todo card and list, center and beautify tables */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <AddTodoForm onAdd={handleAdd} />
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} onComplete={handleComplete} />
        </div>
      </div>
      {editingTodo && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <EditTodoForm todo={editingTodo as TodoCardProps} onUpdate={handleUpdate} onCancel={() => setEditingTodo(null)} />
        </div>
      )}
    </div>
  );
}

function SignupScreen() {
  const navigate = useNavigate();
  const handleSignup = (name: string, email: string, password: string) => {
    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Signup successful') {
          alert('Account created! Please login.');
          navigate('/');
        } else {
          alert(data.message || 'Signup failed');
        }
      })
      .catch(() => alert('Signup error'));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)' }}>
      <Signup onSignup={handleSignup} onLoginLink={() => navigate('/')} />
      <WorldClock />
      <WeatherWidget />
    </div>
  );
}



function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #1976d2 100%)', color: '#FFD700', fontFamily: 'Monotype Corsiva, cursive', border: '8px solid #FFD700', borderRadius: '24px', boxSizing: 'border-box', gap: '48px', padding: '32px 0' }}>
  <AnimatedDrawerMenu />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '340px', margin: '0 32px' }}>
        {children}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', marginTop: '48px', minWidth: '240px' }}>
        <div style={{ width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px #222', borderRadius: '18px', background: 'rgba(35,37,38,0.85)', marginBottom: '16px' }}>
          <WeatherWidget />
        </div>
        <div style={{ width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px #222', borderRadius: '18px', background: 'rgba(35,37,38,0.85)' }}>
          <WorldClock />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('todo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);


  return (
    <Router>
      <Routes>
  <Route path="/" element={<LoginPage setUser={setUser} />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/main" element={
          <PrivateRoute user={user}>
            <AppLayout><AppContent /></AppLayout>
          </PrivateRoute>
        } />
        <Route path="/completed" element={
          <PrivateRoute user={user}>
            <AppLayout><CompletedTasksTable todos={todos} /></AppLayout>
          </PrivateRoute>
        } />
        <Route path="/calendar" element={
          <PrivateRoute user={user}>
            <AppLayout><FullCalendarNotes /></AppLayout>
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute user={user}>
            <AppLayout>
              <ProfileMenu
                user={user || { name: '', email: '' }}
                onUpdate={() => {}}
              />
            </AppLayout>
          </PrivateRoute>
        } />
        <Route path="/notes" element={
          <PrivateRoute user={user}>
            <AppLayout><NotesMenu /></AppLayout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
