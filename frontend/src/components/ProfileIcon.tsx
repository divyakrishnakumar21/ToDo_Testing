import React from 'react';

const ProfileIcon: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD700 60%, #1976d2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px #222',
      cursor: 'pointer',
      marginLeft: 16,
      position: 'relative',
    }}
    title="Profile"
  >
    <span style={{ fontSize: '1.7em', color: '#232526', fontWeight: 700 }}>👤</span>
  </div>
);

export default ProfileIcon;
