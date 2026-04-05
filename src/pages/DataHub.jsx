import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Database } from 'lucide-react';

export default function DataHub() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current.children,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, stagger: 0.15, duration: 0.7, ease: "back.out(1.2)" }
    );
  }, []);

  return (
    <div ref={containerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Database color="var(--accent-blue)"/> Central Data Hub
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div className="glass-panel hover-glow" style={{ padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer' }}>
             <h3 style={{ color: 'var(--text-main)' }}>Historical Records</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Access archived patient matrices.</p>
          </div>
          <div className="glass-panel hover-glow" style={{ padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer' }}>
             <h3 style={{ color: 'var(--text-main)' }}>Staff Rosters</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>View active HR deployments.</p>
          </div>
          <div className="glass-panel hover-glow" style={{ padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer' }}>
             <h3 style={{ color: 'var(--text-main)' }}>Audit Logs</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Security and system overrides.</p>
          </div>
      </div>
    </div>
  );
}
