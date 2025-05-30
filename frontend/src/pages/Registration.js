import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

const blueGradient = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';


export default function Registration() {
  const [form, setForm] = useState({ name: '', email: '', gstin: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setLoading(false);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registration failed');
        return;
      }
      navigate('/login');
    } catch {
      setLoading(false);
      setError('Network error');
    }
  };

  // Themed styles
  const card = {
    maxWidth: '500px',
    margin: '60px auto',
    padding: 32,
    borderRadius: 12,
    boxShadow: mode === 'dark' ? '0 2px 32px #0008' : '0 2px 24px #0002',
    background: mode === 'dark' ? '#f6f7fa' : 'rgba(22,32,55,0.97)',
    color: mode === 'dark' ? '#f2f2f2' : '#222',
    fontFamily: 'system-ui, sans-serif',
    position: 'relative'
  };
  const label = { display: 'block', margin: '16px 0 6px 2px', fontWeight: 500 };
  const input = {
    width: '450px',
    padding: '10px 12px',
    borderRadius: 6,
    border: '2px solid #1976d2',
    background: '#fff',
    color: mode === 'dark' ? '#f2f2f2' : '#222',
    marginBottom: 8,
    fontSize: 16
  };
  const button = {
    width: '475px',
    background: '#007bff',
    color: '#fff',
    border: 0,
    borderRadius: 6,
    padding: '12px 0',
    fontWeight: 600,
    fontSize: 17,
    cursor: 'pointer',
    marginTop: 10
  };
  const errorBox = {
    color: '#b00020',
    background: mode === 'dark' ? '#2a2430' : '#fff0f2',
    padding: '8px 10px',
    borderRadius: 6,
    marginTop: 10,
    fontSize: 15
  };
  const link = { color: '#007bff', textDecoration: 'none', marginLeft: 6 };
  const bgGradient = mode === 'dark'
    ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    : 'linear-gradient(135deg, #e3f0ff 0%, #b3d8fd 100%)';
  const bg = {
    minHeight: '100vh',
    width: '100%',
    background: bgGradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.5s'
  };
  const toggleBtn = {
    position: 'fixed',
    top: 22,
    right: 32,
    zIndex: 10,
    background: mode === 'dark' ? '#222b' : '#fff8',
    color: mode === 'dark' ? '#f2f2f2' : '#222',
    border: 'none',
    borderRadius: 20,
    padding: '8px 18px',
    fontWeight: 600,
    fontSize: 15,
    boxShadow: '0 2px 8px #0002',
    cursor: 'pointer',
    transition: 'background 0.3s, color 0.3s'
  };

  return (
    <>
      <div style={bg}>
        <div style={{ position: 'fixed', top: 22, right: 100, display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
        <button style={toggleBtn} onClick={toggleMode} aria-label="Toggle dark/light mode">
          {mode === 'dark' ? '🌙' : '☀️'}
        </button>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: mode === 'dark' ? '#222b' : '#fff8',
          color: mode === 'dark' ? '#f2f2f2' : '#222',
          border: 'none', borderRadius: 20, padding: '8px 18px', fontWeight: 600,
          fontSize: 18, boxShadow: '0 2px 8px #0002', cursor: 'pointer', textDecoration: 'none', transition: 'background 0.3s, color 0.3s'
        }} aria-label="Home">🏠 Home</a>
      </div>
        {/* Logo and app name in top left */}
        <div style={{ position: 'fixed', top: 0, left: 0, padding: '24px 0 0 48px', zIndex: 20, display: 'flex', alignItems: 'center' }}>
          <img src="/logo192.png" alt="Logo" style={{ width: 48, height: 48, marginRight: 16 }} />
            <span style={{
              fontFamily: `'Pacifico', 'Dancing Script', 'cursive'`,
              fontSize: 32,
              color: mode === 'dark' ? '#fff' : '#1e3c72',
              letterSpacing: 2,
              textShadow: '1px 2px 8px rgba(30,60,114,0.13)'
            }}>
              Customs On Board
            </span>
        </div>
        <div style={card}>
          <h2 style={{textAlign: 'center', marginBottom: 28, color: mode === 'dark' ? '#111' : '#fff', fontSize: '2.3rem', fontWeight: 800}}>Register As Exporter/Importer</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <label style={label} htmlFor="name">Name</label>
            <input style={input} name="name" id="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <label style={label} htmlFor="email">Email</label>
            <input style={input} name="email" id="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <label style={label} htmlFor="gstin">GSTIN</label>
            <input style={input} name="gstin" id="gstin" placeholder="GSTIN" value={form.gstin} onChange={handleChange} required />
            <label style={label} htmlFor="password">Password</label>
            <input style={input} name="password" id="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button style={button} type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            {error && <div style={errorBox}>{error}</div>}
          </form>
          <div style={{marginTop: 18, textAlign: 'center', fontSize: 15, color: mode === 'dark' ? '#111' : '#fff'}}>
            Already have an account?
            <a href="/login" style={link}>Login</a>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.07)', color: mode === 'dark' ? '#fff' : '#111', padding: '22px 0', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        <div style={{ marginBottom: 10 }}>
          <a href="mailto:support@customsonboard.com" style={{ color: mode === 'dark' ? '#fff' : '#111', margin: '0 14px', textDecoration: 'underline' }}>Contact Us</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: mode === 'dark' ? '#fff' : '#111', margin: '0 14px' }}>Twitter</a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: mode === 'dark' ? '#fff' : '#111', margin: '0 14px' }}>LinkedIn</a>
        </div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>&#169; {new Date().getFullYear()} CustomsOnboard. All rights reserved.</div>
      </footer>
    </>
  );
}
