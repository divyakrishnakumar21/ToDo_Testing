import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onCreateAccount: () => void;
  onForgotPassword: () => void;
  loginError?: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCreateAccount, onForgotPassword, loginError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 19c-5 0-9.27-3.11-10.44-7.44a1.94 1.94 0 0 1 0-1.12A10.06 10.06 0 0 1 6.06 6.06M1 1l22 22" /><circle cx="12" cy="12" r="3" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12C1 12 5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </button>
          </div>
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', marginBottom: 8 }}>Login</button>
          {loginError && <div style={{ color: '#d32f2f', fontWeight: 700, marginTop: 12, fontSize: '1.1em', background: '#fff', borderRadius: 8, padding: '12px 24px', boxShadow: '0 2px 8px #222' }}>{loginError}</div>}
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: 8 }}>
          <button onClick={onCreateAccount} style={{ background: 'none', color: '#1976d2', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Create Account
          </button>
          <span style={{ color: '#888' }}>|</span>
          <button onClick={onForgotPassword} style={{ background: 'none', color: '#1976d2', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Forgot Password?
          </button>
        </div>
      </div>
      {/* World Clock and Weather widgets will be added here */}
    </div>
  );
};

export default Login;
