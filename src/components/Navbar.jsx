import React, { useContext, useEffect, useRef, useState } from 'react';
import { Search, Bell, Zap, LogOut, ChevronRight, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { AlertContext } from '../context/AlertContext';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { unreadCount, alerts, markAllRead, dismissAlert } = useContext(AlertContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const toggleDropdown = () => {
    if (!showDropdown) {
      markAllRead();
    }
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [showDropdown]);

  const getStyleProps = (severity) => {
    switch (severity) {
      case 'critical': return { icon: AlertTriangle, color: 'var(--accent-alert)' };
      case 'medium': return { icon: AlertCircle, color: '#f59e0b' };
      default: return { icon: Info, color: 'var(--accent-blue)' };
    }
  };

  return (
    <header ref={navRef} className="glass-panel" style={{ position: 'relative', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', borderRadius: '0 0 16px 16px', borderTop: 'none', margin: '0 1.5rem', marginBottom: '1.5rem', zIndex: 100 }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search patients, alerts, AI logs..."
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', background: 'rgba(10, 14, 23, 0.4)', border: '1px solid var(--border-glass)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none', transition: 'border-color 0.3s ease' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 255, 102, 0.1)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(0, 255, 102, 0.2)' }}>
          <Zap size={16} className="text-neon-green" />
          <span className="text-neon-green" style={{ fontSize: '0.8rem', fontWeight: 600 }}>100% Core Efficiency</span>
        </div>
        
        <div style={{ position: 'relative' }}>
          <button onClick={toggleDropdown} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color={unreadCount > 0 ? "var(--text-main)" : "var(--text-muted)"} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, width: '10px', height: '10px', background: 'var(--accent-alert)', borderRadius: '50%', boxShadow: 'var(--glow-alert)' }}></span>
            )}
          </button>
          
          {/* Dropdown Panel */}
          {showDropdown && (
            <div ref={dropdownRef} style={{ position: 'absolute', top: '40px', right: '-10px', width: '350px', background: 'rgba(10, 14, 23, 0.95)', border: '1px solid var(--border-glass)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Global Notifications</span>
                {unreadCount > 0 && <span style={{ background: 'var(--accent-alert)', color: '#fff', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '12px' }}>{unreadCount} New</span>}
              </div>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {alerts.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No active alerts.</div>
                ) : (
                  alerts.map(alert => {
                    const props = getStyleProps(alert.severity);
                    const isCritical = alert.severity === 'critical';
                    return (
                      <div key={alert.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.02)', position: 'relative', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        <div style={{ marginTop: '0.2rem' }}>
                          <props.icon size={16} color={props.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: isCritical ? 'var(--accent-alert)' : 'var(--text-main)', textShadow: isCritical ? 'var(--glow-alert)' : 'none' }}>{alert.title}</p>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                          </div>
                          <p style={{ margin: '0.25rem 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.suggestion}</p>
                        </div>
                        <button onClick={() => dismissAlert(alert.id)} style={{ position: 'absolute', top: '1rem', right: '0.5rem', color: 'var(--text-muted)' }}>
                          <X size={14} />
                        </button>
                      </div>
                    )
                  })
                )}
              </div>
              <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: 'var(--accent-blue)', cursor: 'pointer' }}>
                View All Notification History
              </div>
            </div>
          )}
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-glass)' }}></div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{user.name}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>{user.role}</p>
            </div>
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--accent-blue)' }} />
            ) : (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-alert))', display: 'grid', placeItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>{user.name.charAt(0)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
