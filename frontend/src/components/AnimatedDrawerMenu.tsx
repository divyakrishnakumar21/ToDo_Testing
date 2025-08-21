import React, { useState, useRef, useEffect } from 'react';
import ProfileIcon from './ProfileIcon';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Home', link: '/main', icon: '🏠' },
  { label: 'Completed Tasks', link: '/completed', icon: '✅' },
  { label: 'Calendar', link: '/calendar', icon: '📅' },
  { label: 'Notes', link: '/notes', icon: '📝' },
  { label: 'Profile', link: '/profile', icon: '👤' },
];

const AnimatedDrawerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close drawer on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <>
      {/* Floating 3 dots button, hidden when menu is open */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            top: 24,
            left: 24,
            zIndex: 2000,
            background: 'rgba(35,37,38,0.95)',
            border: '2px solid #FFD700',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #222',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s',
          }}
          aria-label="Open menu"
        >
          <span style={{ fontSize: '2em', color: '#FFD700' }}>⋮</span>
        </button>
      )}
      {/* Animated Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : -220,
          width: 220,
          height: '100vh',
          background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)',
          borderRight: '3px solid #FFD700',
          boxShadow: open ? '0 4px 24px #222' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 0 24px 0',
          zIndex: 1999,
          transition: 'left 0.35s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => { setOpen(false); navigate('/profile'); }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Profile"
          >
            <span style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #FFD700 60%, #1976d2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px #FFD700',
              fontSize: '2.2em',
              color: '#232526',
              fontWeight: 700,
            }}>
              👤
            </span>
          </button>
        </div>
        {menuItems.map(item => (
          <button
            key={item.label}
            onClick={() => { setOpen(false); navigate(item.link); }}
            style={{
              width: '90%',
              height: 48,
              borderRadius: 12,
              background: location.pathname === item.link ? 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)' : 'rgba(25,118,210,0.18)',
              color: location.pathname === item.link ? '#232526' : '#FFD700',
              fontWeight: 700,
              fontSize: '1.08em',
              border: location.pathname === item.link ? '2.5px solid #1976d2' : '2px solid #FFD700',
              boxShadow: location.pathname === item.link ? '0 4px 16px #1976d2' : '0 2px 8px #222',
              marginBottom: 12,
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 10,
              letterSpacing: '1px',
              paddingLeft: 12,
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)';
              e.currentTarget.style.color = '#232526';
              e.currentTarget.style.border = '2.5px solid #1976d2';
              e.currentTarget.style.boxShadow = '0 4px 16px #1976d2';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              if (location.pathname !== item.link) {
                e.currentTarget.style.background = 'rgba(25,118,210,0.18)';
                e.currentTarget.style.color = '#FFD700';
                e.currentTarget.style.border = '2px solid #FFD700';
                e.currentTarget.style.boxShadow = '0 2px 8px #222';
              }
            }}
          >
            <span style={{ fontSize: '1.4em', marginRight: 2 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: location.pathname === item.link ? '100%' : '0',
              height: 3,
              background: '#FFD700',
              borderRadius: 2,
              transition: 'width 0.3s cubic-bezier(.4,0,.2,1)',
            }} />
          </button>
        ))}
        {/* Logout button */}
        <button
          onClick={() => { setOpen(false); navigate('/'); }}
          style={{
            width: '90%',
            height: 48,
            borderRadius: 12,
            background: 'rgba(25,118,210,0.18)',
            color: '#FFD700',
            fontWeight: 700,
            fontSize: '1.08em',
            border: '2px solid #FFD700',
            boxShadow: '0 2px 8px #222',
            marginBottom: 12,
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 10,
            letterSpacing: '1px',
            paddingLeft: 12,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: '1.4em', marginRight: 2 }}>🚪</span>
          <span style={{ flex: 1 }}>Logout</span>
        </button>
  {/* Removed profile icon at the bottom */}
      </div>
    </>
  );
};

export default AnimatedDrawerMenu;
