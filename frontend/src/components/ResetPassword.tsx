import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      setMessage('Invalid or expired reset link. Please request a new one.');
      return;
    }
    if (!password || !confirm) {
      setMessage('Please enter and confirm your new password.');
      return;
    }
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    setMessage('');
    const res = await fetch('http://localhost:3000/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.message === 'Password reset successful') {
      setMessage('Password reset successful! You can now log in.');
      setTimeout(() => navigate('/'), 2500);
    } else {
      setMessage(data.message || 'Error resetting password.');
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #222', padding: 32, minWidth: 320, textAlign: 'center', position: 'relative', margin: '48px auto', maxWidth: 400 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
          required
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', marginBottom: 8 }}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {message && <div style={{ color: message.includes('successful') ? '#1976d2' : '#d32f2f', fontWeight: 700, marginTop: 12 }}>{message}</div>}
      </form>
    </div>
  );
};

export default ResetPassword;
