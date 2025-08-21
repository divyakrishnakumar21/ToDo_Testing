import React, { useState } from 'react';


interface SignupProps {
  onSignup: (name: string, email: string, password: string) => void;
  onLoginLink: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onLoginLink }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    onSignup(name, email, password);
  };

  return (
    <div className="card-animate" style={{
      background: 'linear-gradient(135deg, #232526 60%, #1a1a1a 100%)',
      padding: '32px 28px',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      marginBottom: '40px',
      maxWidth: '420px',
      margin: '0 auto',
      border: '2.5px solid #FFD700',
      outline: '2px solid #444',
      outlineOffset: '-8px',
      position: 'relative',
      zIndex: 2,
      transition: 'box-shadow 0.3s, transform 0.3s',
    }}>
      <h2 style={{ color: '#FFD700', marginBottom: '18px', textAlign: 'center', fontWeight: 700, fontSize: '2em', letterSpacing: '1px' }}>Create Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', width: '100%' }}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em' }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em' }} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em' }} />
        {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}
        <button type="submit" className="button-animate" style={{ cursor: 'pointer', background: 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)', color: '#232526', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', letterSpacing: '1px', transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s' }}>Sign Up</button>
      </form>
      <div style={{ marginTop: '18px', textAlign: 'center' }}>
        <span style={{ color: '#FFD700' }}>Already have an account? </span>
        <button onClick={onLoginLink} style={{ background: 'none', border: 'none', color: '#1976d2', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: '1em' }}>Login</button>
      </div>
    </div>
  );
};

export default Signup;
