import React from 'react';

const clocks = [
  { label: 'Bangalore', tz: 'Asia/Kolkata', emoji: '🇮🇳' },
  { label: 'Berlin', tz: 'Europe/Berlin', emoji: '🇩🇪' },
  { label: 'Redmond', tz: 'America/Los_Angeles', emoji: '🇺🇸' },
  { label: 'Toronto', tz: 'America/Toronto', emoji: '🇨🇦' },
];

function getTimeString(timezone: string) {
  return new Date().toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const WorldClock: React.FC = () => (
  <div style={{
    background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)',
    color: '#FFD700',
    borderRadius: '18px',
    boxShadow: '0 4px 16px #222',
    padding: '18px',
    width: '240px',
    height: '240px',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '1em',
    marginBottom: '8px',
    position: 'relative',
    zIndex: 2,
    animation: 'cardFadeIn 0.7s cubic-bezier(.4,0,.2,1)'
  }}>
    <div style={{ fontSize: '1.35em', fontWeight: 700, marginBottom: 12, color: '#FFD700', letterSpacing: 2, textAlign: 'center', textShadow: '0 2px 8px #000' }}>World Clocks</div>
    {clocks.map(clock => (
      <div key={clock.label} style={{ display: 'flex', alignItems: 'center', marginBottom: 10, justifyContent: 'center' }}>
        <span style={{ fontSize: '1.15em', fontWeight: 700, marginRight: 10 }}>{clock.emoji}</span>
        <span style={{ fontSize: '1.1em', fontWeight: 700, marginRight: 10 }}>{clock.label}</span>
        <span style={{ fontSize: '1.15em', fontWeight: 700 }}>{getTimeString(clock.tz)}</span>
      </div>
    ))}
  </div>
);

export default WorldClock;
