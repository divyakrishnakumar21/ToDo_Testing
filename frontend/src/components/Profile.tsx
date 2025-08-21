import React, { useState } from 'react';

const Profile: React.FC<{ user: { name: string; email: string }; onUpdate: (name: string, email: string) => void }> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onUpdate(name, email);
    setEditing(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#232526', color: '#FFD700', padding: 32, borderRadius: 18 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Profile</h2>
      {editing ? (
        <>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6 }} />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 6 }} />
          <button onClick={handleSave} style={{ width: '100%', padding: 12, borderRadius: 6, background: '#FFD700', color: '#232526', fontWeight: 700 }}>Save</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>Name: {name}</div>
          <div style={{ marginBottom: 16 }}>Email: {email}</div>
          <button onClick={() => setEditing(true)} style={{ width: '100%', padding: 12, borderRadius: 6, background: '#FFD700', color: '#232526', fontWeight: 700 }}>Edit</button>
        </>
      )}
    </div>
  );
};
export default Profile;
