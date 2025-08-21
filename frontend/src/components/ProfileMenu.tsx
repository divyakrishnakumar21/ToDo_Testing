import React, { useState } from 'react';

interface ProfileMenuProps {
	user: { name: string; email: string };
	onUpdate: (updates: { name?: string; email?: string; password?: string }) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, onUpdate }) => {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [showModal, setShowModal] = useState(false);

	const handleSave = () => {
		onUpdate({ name, email, password: password || undefined });
		setShowModal(false);
	};

		return (
			<div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 48 }}>
				<div style={{ background: '#232526', borderRadius: '18px', padding: '32px', minWidth: '340px', boxShadow: '0 4px 24px #222', color: '#FFD700', position: 'relative', maxWidth: 400 }}>
					<h2 style={{ marginBottom: '18px', textAlign: 'center', fontWeight: 700 }}>Profile Settings</h2>
					<label style={{ display: 'block', marginBottom: '12px' }}>
						Name:
						<input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em', marginTop: '4px' }} />
					</label>
					<label style={{ display: 'block', marginBottom: '12px' }}>
						Email:
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em', marginTop: '4px' }} />
					</label>
					<label style={{ display: 'block', marginBottom: '18px' }}>
						New Password:
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #FFD700', fontSize: '1em', marginTop: '4px' }} />
					</label>
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
						<button onClick={handleSave} style={{ background: 'linear-gradient(90deg, #FFD700 60%, #1976d2 100%)', color: '#232526', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', boxShadow: '0 2px 8px #222', letterSpacing: '1px', cursor: 'pointer' }}>Save</button>
						<button onClick={() => setShowModal(false)} style={{ background: 'none', border: '1px solid #FFD700', color: '#FFD700', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, fontSize: '1.1em', cursor: 'pointer' }}>Cancel</button>
					</div>
				</div>
			</div>
		);
};

export default ProfileMenu;
