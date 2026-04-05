import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Patients() {
  const listRef = useRef(null);

  useEffect(() => {
    // Staggered list loading using ScrollTrigger
    gsap.fromTo(".patient-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1, 
        stagger: 0.1, 
        ease: "back.out(1.2)", 
        duration: 0.6,
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
      <h2 style={{ color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Users color="var(--accent-blue)"/> Patient Roster
      </h2>
      
      <div ref={listRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="patient-card glass-panel hover-glow" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,243,255,0.1)', display: 'grid', placeItems: 'center', border: '1px solid rgba(0,243,255,0.3)' }}>
                    <span style={{ color: 'var(--text-main)' }}>PT</span>
                 </div>
                 <span style={{ background: i % 3 === 0 ? 'rgba(255,51,102,0.1)' : 'rgba(0,255,102,0.1)', color: i % 3 === 0 ? 'var(--accent-alert)' : 'var(--accent-green)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', border: `1px solid ${i % 3 === 0 ? 'var(--accent-alert)' : 'var(--accent-green)'}` }}>
                    {i % 3 === 0 ? 'Critical' : 'Stable'}
                 </span>
             </div>
             <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: 'var(--text-main)' }}>Patient #{10048 + i}</p>
             <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Activity size={14}/> Heart Rate: {70 + Math.floor(Math.random() * 30)} bpm
             </p>
          </div>
        ))}
      </div>
    </div>
  );
}
