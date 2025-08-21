import React, { useState } from 'react';

interface ForgotPasswordProps {
  onSubmit: (email: string) => void;
  onCancel: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    setMessage('');
    onSubmit(email);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #222', padding: 32, minWidth: 320, textAlign: 'center', position: 'relative' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', marginBottom: 8 }}>Send Reset Link</button>
        {message && <div style={{ color: '#d32f2f', fontWeight: 700, marginTop: 12 }}>{message}</div>}
      </form>
      <button onClick={onCancel} style={{ background: 'none', color: '#1976d2', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginTop: 8 }}>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
