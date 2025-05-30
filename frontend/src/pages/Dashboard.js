import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import logo from '../logo.svg';

const blueGradient = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';

export default function Dashboard() {
  const navigate = useNavigate();


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  // Listen for back/forward navigation and auto-logout
  useEffect(() => {
    const handlePopState = () => {
      handleLogout();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [profile, setProfile] = useState(null);
  const [dummy, setDummy] = useState(null);
  const [error, setError] = useState('');
  const { mode, toggleMode } = useTheme();


  // Themed styles
  const card = {
    width: '430px',
    margin: '90px auto 0 auto',
    padding: '38px 30px 32px 30px',
    borderRadius: 16,
    boxShadow: mode === 'dark' ? '0 2px 32px #0008' : '0 2px 32px #0002',
    background: mode === 'dark' ? 'rgba(22,32,55,0.97)' : '#fff',
    color: mode === 'dark' ? '#f2f2f2' : '#222',
    fontFamily: 'system-ui, sans-serif',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), color 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)',
  };
  const label = { display: 'block', margin: '16px 0 6px 2px', fontWeight: 500 };
  const input = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 6,
    border: mode === 'dark' ? '1px solid #444' : '1px solid #bbb',
    background: mode === 'dark' ? '#1a243a' : '#fff',
    color: mode === 'dark' ? '#f2f2f2' : '#222',
    marginBottom: 8,
    fontSize: 16
  };
  const button = {
    width: '100%',
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
  const bg = {
    minHeight: '100vh',
    width: '100vw',
    background: mode === 'dark' ? 'rgba(22,32,55,0.97)' : blueGradient,
    transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), color 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
    boxShadow: '0 2px 8px #0002',
    cursor: 'pointer',
    transition: 'background 0.3s, color 0.3s'
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch('http://localhost:4000/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        const data = await res.json();
        setProfile(data.profile);
        setDummy(data.dummyData);
      } catch {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, [navigate]);

  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <div style={bg}>
        {/* Logo and App Name in Top Right */}
        {/* Logo and App Name in Top Left, like Login/Register */}
        <div style={{
          position: 'fixed',
          top: 32,
          left: 44,
          display: 'flex',
          alignItems: 'center',
          zIndex: 20,
        }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: 44, marginRight: 16, background: 'white', borderRadius: 10, padding: 2, border: '1px solid #e0e0e0', objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <span style={{
            fontFamily: 'cursive',
            fontWeight: 600,
            fontSize: 32,
            letterSpacing: 0.5,
            color: '#fff',
            textShadow: '0 2px 8px #0008',
          }}>
            Customs On Board
          </span>
        </div>
        <button style={toggleBtn} onClick={toggleMode} aria-label="Toggle dark/light mode">
          {mode === 'dark' ? '🌙' : '☀️'}
        </button>
        <div style={{...card, position: 'relative'}}>
          <h2>Welcome, {profile.name}</h2>
          <p>Email: {profile.email}</p>
          <p>GSTIN: {profile.gstin}</p>
          <p>Role: {profile.role}</p>
          <div style={{ position: 'absolute', bottom: 24, right: 24 }}>
            <button
              onClick={handleLogout}
              style={{
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002',
                transition: 'background 0.2s'
              }}
            >
              Logout
            </button>
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
