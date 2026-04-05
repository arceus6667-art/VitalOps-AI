import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Bell, Monitor, Shield, Key, Sliders, Smartphone, Mail, Moon, Sun, Layers } from 'lucide-react';
import gsap from 'gsap';

export default function Settings() {
  const { user, logout } = useContext(AuthContext);
  const containerRef = useRef(null);

  const [themePrefs, setThemePrefs] = useState('glass');
  const [notifyPrefs, setNotifyPrefs] = useState({ push: true, email: false, sms: true });

  useEffect(() => {
    if(containerRef.current) {
        gsap.fromTo(containerRef.current.children, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
    }
  }, []);

  if (!user) return null;

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minHeight: 0 }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--text-main)' }}>System Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Configuration & Profile Management</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
        {/* Left Column (Profile & Security) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <div style={{ position: 'absolute', top: -5, left: -5, right: -5, bottom: -5, background: 'var(--accent-blue)', borderRadius: '50%', filter: 'blur(10px)', opacity: 0.3 }}></div>
                {user.avatar ? (
                <img src={user.avatar} alt="Avatar" style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', border: '2px solid var(--accent-blue)', objectFit: 'cover' }} />
                ) : (
                <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-alert))', display: 'grid', placeItems: 'center' }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '2.5rem' }}>{user.name.charAt(0)}</span>
                </div>
                )}
            </div>
            
            <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.5rem' }}>{user.name}</h2>
            <p style={{ margin: '0.25rem 0 1.5rem 0', color: 'var(--accent-blue)', fontWeight: 500 }}>{user.role}</p>
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Network ID</span>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600 }}>VO-7889A</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Clearance Level</span>
                    <span style={{ color: 'var(--accent-alert)', fontSize: '0.85rem', fontWeight: 600 }}>Level 5 (Admin)</span>
                </div>
            </div>

            <button 
              onClick={logout}
              style={{ width: '100%', marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '0.85rem', background: 'rgba(255, 51, 102, 0.1)', color: 'var(--accent-alert)', border: '1px solid var(--accent-alert)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', boxShadow: 'var(--glow-alert)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 51, 102, 0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 51, 102, 0.1)'}
            >
              <LogOut size={18} /> Terminate Secure Session
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
             <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} color="var(--accent-blue)"/> Security Controls</h3>
             <button style={{ width: '100%', padding: '1rem', background: 'rgba(0,243,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,243,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='rgba(0,243,255,0.05)'}>
                 <Key size={18} color="var(--accent-blue)"/>
                 <div style={{ textAlign: 'left' }}>
                     <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Update Authorization Key</p>
                     <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Rotate your biometric/password phrase.</p>
                 </div>
             </button>
          </div>

        </div>

        {/* Right Column (Theme & System Config) */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Theme Block */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
             <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Monitor size={18} color="var(--accent-blue)"/> Interface Theming</h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                 <div onClick={() => setThemePrefs('dark')} style={{ padding: '1rem', background: themePrefs === 'dark' ? 'rgba(0,243,255,0.1)' : 'rgba(255,255,255,0.02)', border: themePrefs === 'dark' ? '1px solid var(--accent-blue)' : '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', boxShadow: themePrefs === 'dark' ? 'var(--glow-blue)': 'none' }}>
                     <Moon size={24} color={themePrefs === 'dark' ? 'var(--accent-blue)' : 'var(--text-muted)'} style={{ margin: '0 auto 0.5rem auto' }}/>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, color: themePrefs === 'dark' ? 'var(--accent-blue)' : 'var(--text-muted)' }}>Void Dark</span>
                 </div>
                 <div onClick={() => setThemePrefs('glass')} style={{ padding: '1rem', background: themePrefs === 'glass' ? 'rgba(0,255,102,0.1)' : 'rgba(255,255,255,0.02)', border: themePrefs === 'glass' ? '1px solid var(--accent-green)' : '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', boxShadow: themePrefs === 'glass' ? 'var(--glow-green)': 'none' }}>
                     <Layers size={24} color={themePrefs === 'glass' ? 'var(--accent-green)' : 'var(--text-muted)'} style={{ margin: '0 auto 0.5rem auto' }}/>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, color: themePrefs === 'glass' ? 'var(--accent-green)' : 'var(--text-muted)' }}>Optic Glass</span>
                 </div>
                 <div onClick={() => setThemePrefs('light')} style={{ padding: '1rem', background: themePrefs === 'light' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)', border: themePrefs === 'light' ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', boxShadow: themePrefs === 'light' ? '0 0 15px rgba(245,158,11,0.3)': 'none' }}>
                     <Sun size={24} color={themePrefs === 'light' ? '#f59e0b' : 'var(--text-muted)'} style={{ margin: '0 auto 0.5rem auto' }}/>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, color: themePrefs === 'light' ? '#f59e0b' : 'var(--text-muted)' }}>High Contrast</span>
                 </div>
             </div>
          </div>

          {/* Notifications Block */}
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
             <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bell size={18} color="var(--accent-blue)"/> Global Notification Deliveries</h3>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Monitor size={20} color="var(--text-muted)"/>
                        <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Dashboard Push Alerts</p>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Receive popups strictly inside the interface.</p>
                        </div>
                    </div>
                    <div onClick={() => setNotifyPrefs(p => ({...p, push: !p.push}))} style={{ width: '44px', height: '24px', background: notifyPrefs.push ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                        <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: notifyPrefs.push ? '23px' : '3px', transition: 'left 0.3s' }}></div>
                    </div>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Smartphone size={20} color="var(--text-muted)"/>
                        <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>SMS Emergency Overrides</p>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Direct text dispatches for CRITICAL statuses only.</p>
                        </div>
                    </div>
                    <div onClick={() => setNotifyPrefs(p => ({...p, sms: !p.sms}))} style={{ width: '44px', height: '24px', background: notifyPrefs.sms ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                        <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: notifyPrefs.sms ? '23px' : '3px', transition: 'left 0.3s' }}></div>
                    </div>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Mail size={20} color="var(--text-muted)"/>
                        <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>Email Briefings</p>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Receive daily summary analytics to registered email.</p>
                        </div>
                    </div>
                    <div onClick={() => setNotifyPrefs(p => ({...p, email: !p.email}))} style={{ width: '44px', height: '24px', background: notifyPrefs.email ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                        <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: notifyPrefs.email ? '23px' : '3px', transition: 'left 0.3s' }}></div>
                    </div>
                 </div>
             </div>

          </div>

        </div>

      </div>
    </div>
  );
}
