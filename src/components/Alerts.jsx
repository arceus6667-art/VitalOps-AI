import React, { useEffect, useRef } from 'react';
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function Alerts({ alerts = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (alerts.length > 0 && containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [alerts]);

  const getStyleProps = (severity) => {
    switch (severity) {
      case 'critical': 
        return { 
          bg: 'rgba(255, 51, 102, 0.1)', 
          border: 'var(--accent-alert)', 
          color: 'var(--accent-alert)', 
          icon: AlertTriangle,
          glow: 'pulse-critical' 
        };
      case 'medium': 
        return { 
          bg: 'rgba(245, 158, 11, 0.1)', 
          border: '#f59e0b', 
          color: '#f59e0b', 
          icon: AlertCircle,
          glow: '' 
        };
      case 'low': 
      default:
        return { 
          bg: 'rgba(0, 243, 255, 0.05)', 
          border: 'var(--border-glass)', 
          color: 'var(--accent-blue)', 
          icon: Info,
          glow: '' 
        };
    }
  };

  return (
    <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes pulseCritical {
          0% { box-shadow: 0 0 0 0 rgba(255, 51, 102, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 51, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 51, 102, 0); }
        }
        .pulse-critical {
          animation: pulseCritical 1.5s infinite;
          border-left: 3px solid var(--accent-alert) !important;
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>Active Alerts</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alerts.length} Items</span>
      </div>

      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        {alerts.map((alert) => {
          const props = getStyleProps(alert.severity);
          const isCritical = alert.severity === 'critical';
          return (
            <div 
              key={alert.id} 
              className={isCritical ? 'pulse-critical' : ''}
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '0.5rem', 
                padding: '1rem', 
                background: props.bg, 
                borderRadius: '8px',
                border: `1px solid ${props.border}`,
                transition: 'background 0.2s, transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <props.icon size={16} color={props.color} />
                  <span style={{ fontSize: '0.7rem', color: props.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {alert.severity} • {alert.ward}
                  </span>
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{alert.time}</span>
              </div>
              
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>{alert.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{alert.suggestion}</p>
              </div>

              {isCritical && (
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.25rem', 
                    fontSize: '0.7rem', fontWeight: 600, color: '#fff', 
                    background: 'var(--accent-alert)', padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', border: 'none', cursor: 'pointer' 
                  }}>
                    Deploy SRT <ChevronRight size={12} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {alerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            <p>No active alerts. System stable.</p>
          </div>
        )}
      </div>
    </div>
  );
}
