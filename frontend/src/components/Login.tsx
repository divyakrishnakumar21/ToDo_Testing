import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onCreateAccount: () => void;
  loginError?: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCreateAccount, loginError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #232526 60%, #1976d2 100%)' }}>
  <div className="login-card" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #222', padding: 32, minWidth: 320, textAlign: 'center' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Login</h2>
  <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
            required
          />
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', marginBottom: 8 }}>Login</button>
          {loginError && <div style={{ color: '#d32f2f', fontWeight: 700, marginTop: 12, fontSize: '1.1em', background: '#fff', borderRadius: 8, padding: '12px 24px', boxShadow: '0 2px 8px #222' }}>{loginError}</div>}
        </form>
        <button onClick={onCreateAccount} style={{ background: 'none', color: '#1976d2', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginTop: 8 }}>
          Create Account
        </button>
      </div>
      {/* World Clock and Weather widgets will be added here */}
    </div>
  );
};

export default Login;
