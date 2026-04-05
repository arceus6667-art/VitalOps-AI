import React, { useEffect, useRef } from 'react';
import { Activity, LayoutDashboard, Users, AlertTriangle, Settings, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(sidebarRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Activity, label: 'Vitals AI', path: '/vitals' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: AlertTriangle, label: 'Alerts', path: '/alerts' },
    { icon: Database, label: 'Data Hub', path: '/data' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside ref={sidebarRef} className="glass-panel" style={{ width: '250px', height: '100%', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', borderRadius: '0 16px 16px 0', borderLeft: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-blue)', boxShadow: 'var(--glow-blue)', display: 'grid', placeItems: 'center' }}>
          <Activity size={20} color="#0a0e17" />
        </div>
        <h2 className="text-neon-blue" style={{ fontSize: '1.25rem', margin: 0 }}>VitalOps AI</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              to={item.path}
              key={idx}
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '0.75rem 1rem', 
                borderRadius: '8px', 
                transition: 'all 0.3s ease',
                background: isActive ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                borderLeft: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(0, 243, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <item.icon size={20} />
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,51,102,0.1)', borderRadius: '8px', border: '1px solid rgba(255,51,102,0.2)' }}>
        <p style={{ color: 'var(--accent-alert)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>System Status</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-alert)', boxShadow: 'var(--glow-alert)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-main)' }}>AI Anomaly Detect: Active</span>
        </div>
      </div>
    </aside>
  );
}
