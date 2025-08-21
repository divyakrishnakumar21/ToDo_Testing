import React, { useEffect, useState } from 'react';

// Dummy weather widget for UI
const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon: string } | null>(null);
  const [berlinTime, setBerlinTime] = useState<string>('');
  useEffect(() => {
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
    const timer = setInterval(() => {
      const now = new Date();
      setBerlinTime(now.toLocaleTimeString('en-US', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{
      background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)',
      color: '#FFD700',
      borderRadius: '18px',
      boxShadow: '0 4px 16px #222',
      padding: '18px',
      width: '220px',
      height: '220px',
      textAlign: 'center',
      fontWeight: 500,
      fontSize: '1em',
      marginBottom: '8px',
      position: 'relative',
      zIndex: 2,
      animation: 'cardFadeIn 0.7s cubic-bezier(.4,0,.2,1)'
    }}>
      <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>Berlin Weather</div>
    <div style={{ fontSize: '1.1em', marginBottom: '6px' }}>Berlin Weather</div>
    <div style={{ fontSize: '1.5em', marginBottom: '6px' }}>{weather ? weather.icon : '⏳'}</div>
    <div style={{ fontSize: '1em', fontWeight: 500 }}>{weather ? `${weather.temp}°C` : 'Loading...'}</div>
    <div style={{ fontSize: '0.9em', marginBottom: '6px' }}>{weather ? weather.desc : ''}</div>
    <div style={{ fontSize: '1em', fontWeight: 500, color: '#1976d2', marginTop: '6px' }}>Berlin Time: {berlinTime}</div>
    </div>
  );
};

export default WeatherWidget;
