

import React, { useState } from 'react';

interface ForgotPasswordProps {
  onValidateEmail: (email: string) => Promise<boolean>;
  onResetPassword: (email: string, password: string) => void;
  onCancel: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onValidateEmail, onResetPassword, onCancel }) => {
  const [email, setEmail] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email');
      return;
    }
    setMessage('');
    const exists = await onValidateEmail(email);
    if (exists) {
      setShowPasswordModal(true);
    } else {
      setMessage('User not found');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setMessage('Please enter your new password');
      return;
    }
    setMessage('');
    onResetPassword(email, password);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #222', padding: 32, minWidth: 320, textAlign: 'center', position: 'relative' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Forgot Password</h2>
      {!showPasswordModal ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
            required
          />
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', marginBottom: 8 }}>Next</button>
          {message && <div style={{ color: '#d32f2f', fontWeight: 700, marginTop: 12 }}>{message}</div>}
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 8, border: '1px solid #1976d2' }}
            required
          />
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', marginBottom: 8 }}>Reset Password</button>
          {message && <div style={{ color: '#d32f2f', fontWeight: 700, marginTop: 12 }}>{message}</div>}
        </form>
      )}
      <button onClick={onCancel} style={{ background: 'none', color: '#1976d2', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginTop: 8 }}>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
