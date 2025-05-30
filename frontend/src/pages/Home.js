import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

const blueGradient = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';

export default function Home() {
  // ...rest of code

  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  const cardBg = mode === 'dark' ? 'rgba(22,32,55,0.97)' : 'rgba(255,255,255,0.08)';
  const cardColor = mode === 'dark' ? '#f2f2f2' : '#222';
  const bgGradient = mode === 'dark'
    ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    : 'linear-gradient(135deg, #e3f0ff 0%, #b3d8fd 100%)';
  return (
    <div style={{ minHeight: '100vh', background: bgGradient, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px 8px 48px', color: mode === 'dark' ? '#fff' : '#111' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <div>
          <button onClick={() => navigate('/login')} style={{ marginRight: 18, padding: '10px 26px', borderRadius: 8, border: 0, background: '#fff', color: '#1e3c72', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ padding: '10px 26px', borderRadius: 8, border: 0, background: '#007bff', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0001', marginRight: 16 }}>Register</button>
          <button onClick={toggleMode} style={{
            background: mode === 'dark' ? '#222b' : '#fff8',
            color: mode === 'dark' ? '#f2f2f2' : '#222',
            border: 'none',
            borderRadius: 20,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 22,
            boxShadow: '0 2px 8px #0002',
            cursor: 'pointer'
          }} aria-label="Toggle dark/light mode">
            {mode === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: mode === 'dark' ? '#fff' : '#111', textAlign: 'center' }}>

        <h1 style={{ fontSize: 60, fontWeight: 800, margin: '40px 0 32px 0' }}>Welcome to CustomsOnboard</h1>
        <p style={{ fontSize: 20, maxWidth: 700, margin: '0 auto 30px auto', lineHeight: 1.5 }}>
          Simplifying customer onboarding for customs brokers, exporters, and importers.<br />
          Register, manage, and track your clients seamlessly with secure digital workflows.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24 }}>
          <div style={{ maxWidth: 220, background: cardBg, color: cardColor, borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0002', border: `2.5px solid ${mode === 'dark' ? '#4fc3f7' : '#1976d2'}` }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Fast Onboarding</h3>
            <p style={{ fontSize: 15 }}>Register new customers in minutes with a simple, secure workflow.</p>
          </div>
          <div style={{ maxWidth: 220, background: cardBg, color: cardColor, borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0002', border: `2.5px solid ${mode === 'dark' ? '#4fc3f7' : '#1976d2'}` }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Secure Profiles</h3>
            <p style={{ fontSize: 15 }}>All customer data is encrypted and safely stored in our system.</p>
          </div>
          <div style={{ maxWidth: 220, background: cardBg, color: cardColor, borderRadius: 12, padding: 24, boxShadow: '0 1px 8px #0002', border: `2.5px solid ${mode === 'dark' ? '#4fc3f7' : '#1976d2'}` }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Broker Dashboard</h3>
            <p style={{ fontSize: 15 }}>Manage, view, and track all your customers and filings in one place.</p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.07)', color: mode === 'dark' ? '#fff' : '#111', padding: '22px 0', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        <div style={{ marginBottom: 10 }}>
          <a href="mailto:support@customsonboard.com" style={{ color: mode === 'dark' ? '#fff' : '#111', margin: '0 14px', textDecoration: 'underline' }}>Contact Us</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: mode === 'dark' ? '#fff' : '#111', margin: '0 14px' }}>Twitter</a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: mode === 'dark' ? '#fff' : '#111', margin: '0 14px' }}>LinkedIn</a>
        </div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>© {new Date().getFullYear()} CustomsOnboard. All rights reserved.</div>
      </footer>
    </div>
  );
}
