import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity } from 'lucide-react';

export default function Vitals() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current.children,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Activity color="var(--accent-blue)"/> Global Vitals Matrix
      </h2>
      <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Vitals stream API securely connecting...</p>
      </div>
    </div>
  );
}
