import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';

const menuItems = [
  { label: 'Main', link: '/main' },
  { label: 'Completed Tasks', link: '/completed' },
  { label: 'Calendar', link: '/calendar' },
  { label: 'Notes', link: '/notes' },
];

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={{
      width: 110,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)',
      borderRight: '3px solid #FFD700',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '32px 0 24px 0',
      boxShadow: '0 4px 24px #222',
      position: 'relative',
      zIndex: 100,
    }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <img src={require('../Logo/ToDoAppLogo.png')} alt="Logo" style={{ width: 54, height: 54, borderRadius: 14, boxShadow: '0 2px 8px #FFD700', marginBottom: 16 }} />
        {menuItems.map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.link)}
            style={{
              width: 80,
              height: 48,
              borderRadius: 12,
              background: location.pathname === item.link ? 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)' : 'rgba(25,118,210,0.18)',
              color: location.pathname === item.link ? '#232526' : '#FFD700',
              fontWeight: 700,
              fontSize: '1.08em',
              border: location.pathname === item.link ? '2.5px solid #1976d2' : '2px solid #FFD700',
              boxShadow: location.pathname === item.link ? '0 4px 16px #1976d2' : '0 2px 8px #222',
              marginBottom: 8,
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
            {item.label === 'Main' && <span style={{ fontSize: '1.4em', marginRight: 2 }}>🏠</span>}
            {item.label === 'Completed Tasks' && <span style={{ fontSize: '1.4em', marginRight: 2 }}>✅</span>}
            {item.label === 'Calendar' && <span style={{ fontSize: '1.4em', marginRight: 2 }}>📅</span>}
            {item.label === 'Notes' && <span style={{ fontSize: '1.4em', marginRight: 2 }}>📝</span>}
            <span style={{ flex: 1 }}>{item.label}</span>
            {/* Animated underline */}
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
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProfileIcon />
      </div>
    </nav>
  );
};

export default SidebarMenu;
