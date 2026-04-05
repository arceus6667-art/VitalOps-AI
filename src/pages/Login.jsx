import React, { useContext, useEffect, useRef, useState } from 'react';
import { Activity, Mail, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import gsap from 'gsap';

export default function Login() {
  const { login } = useContext(AuthContext);
  const containerRef = useRef(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    gsap.fromTo(containerRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if(email && password) login('email', email);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(0, 243, 255, 0.05), var(--bg-dark))' }}>
      
      <div ref={containerRef} className="glass-panel" style={{ width: '400px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent-blue)', boxShadow: 'var(--glow-blue)', display: 'grid', placeItems: 'center', marginBottom: '1.5rem' }}>
          <Activity size={32} color="#0a0e17" />
        </div>
        
        <h1 className="text-neon-blue" style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0', textAlign: 'center' }}>VitalOps AI</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem', textAlign: 'center' }}>Secure Medical Authorization</p>
        
        <button 
          onClick={() => login('google')}
          style={{ width: '100%', padding: '0.85rem', background: '#fff', color: '#000', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 15px rgba(255,255,255,0.1)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.1)'; }}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} />
          Sign In with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        <form onSubmit={handleEmailSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              placeholder="Medical ID / Email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }} 
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="password" 
              placeholder="Authorization Key" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }} 
            />
          </div>
          <button 
            type="submit"
            style={{ width: '100%', padding: '0.85rem', background: 'var(--accent-blue)', color: '#000', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.5rem', transition: 'box-shadow 0.2s', boxShadow: 'var(--glow-blue)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,243,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--glow-blue)'}
          >
            Access Terminal
          </button>
        </form>

      </div>
    </div>
  );
}
