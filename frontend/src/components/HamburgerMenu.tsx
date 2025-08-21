import React, { useState } from 'react';
import ProfileIcon from './ProfileIcon';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Main', link: '/main' },
  { label: 'Completed Tasks', link: '/completed' },
  { label: 'Calendar', link: '/calendar' },
  { label: 'Notes', link: '/notes' },
];

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Close menu on outside click
  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.hamburger-menu-dropdown') && !(e.target as HTMLElement).closest('.hamburger-menu-btn')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      <button
        className="hamburger-menu-btn"
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          margin: 0,
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          boxShadow: open ? '0 0 0 4px #FFD700' : 'none',
          outline: open ? '2px solid #1976d2' : 'none',
          transition: 'box-shadow 0.3s, outline 0.3s',
        }}
        aria-label="Open menu"
      >
        <div style={{ width: 40, height: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ width: 36, height: 5, background: open ? '#1976d2' : '#FFD700', borderRadius: 3, marginBottom: 7, transition: 'all 0.3s' }}></span>
          <span style={{ width: 36, height: 5, background: open ? '#1976d2' : '#FFD700', borderRadius: 3, marginBottom: 7, transition: 'all 0.3s' }}></span>
          <span style={{ width: 36, height: 5, background: open ? '#1976d2' : '#FFD700', borderRadius: 3, transition: 'all 0.3s' }}></span>
        </div>
      </button>
      {open && (
        <>
          {/* Backdrop for mobile UX */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.25)',
            zIndex: 99,
          }} />
          <div
            className="hamburger-menu-dropdown"
            style={{
              position: 'absolute',
              top: 56,
              left: 0,
              background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)',
              borderRadius: 20,
              boxShadow: '0 8px 32px #222',
              padding: '32px 0',
              minWidth: 220,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
              animation: 'menuFadeIn 0.4s cubic-bezier(.4,0,.2,1)',
              border: '2px solid #FFD700',
            }}
          >
            {menuItems.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  console.log('Navigating to:', item.link);
                  setOpen(false);
                  navigate(item.link);
                }}
                style={{
                  color: '#FFD700',
                  fontWeight: 700,
                  fontSize: '1.15em',
                  textDecoration: 'none',
                  padding: '14px 32px',
                  borderRadius: 12,
                  background: 'rgba(25,118,210,0.18)',
                  boxShadow: '0 2px 8px #222',
                  transition: 'background 0.3s, color 0.3s',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center',
                  display: 'block',
                  outline: 'none',
                  userSelect: 'none',
                  border: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(25,118,210,0.35)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.cursor = 'pointer';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(25,118,210,0.18)';
                  e.currentTarget.style.color = '#FFD700';
                  e.currentTarget.style.cursor = 'pointer';
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ marginTop: '24px' }}>
              <ProfileIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HamburgerMenu;
