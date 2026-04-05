import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HeartPulse, Droplets, Activity, Thermometer } from 'lucide-react';

export default function KpiCards({ simState }) {
  const containerRef = useRef(null);
  
  // Create refs for number animations
  const hrRef = useRef(null);
  const bpRefSys = useRef(null);
  const bpRefDia = useRef(null);
  const o2Ref = useRef(null);
  const tempRef = useRef(null);

  const [kpiData, setKpiData] = useState({
    hr: 72,
    bps: 120,
    bpd: 80,
    o2: 98,
    temp: 98.6
  });

  // Intro animate panels once on mount
  useEffect(() => {
    gsap.fromTo(containerRef.current.children,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }
    );
  }, []);

  // Animate numbers smoothly based on simState
  useEffect(() => {
    // Generate derived targets based on simulation load
    const loadFactor = (simState.inflow / 100) + (simState.emergency / 100);
    
    // As load increases, average HR increases slightly, O2 drops slightly to simulate general trauma intensity
    const targetHR = Math.floor(72 + (loadFactor * 15) + (Math.random() * 5));
    const targetBps = Math.floor(120 + (loadFactor * 10) + (Math.random() * 4));
    const targetBpd = Math.floor(80 + (loadFactor * 5) + (Math.random() * 3));
    const targetO2 = Math.min(100, Math.max(88, Math.floor(98 - (loadFactor * 3) + (Math.random() * 2))));
    const targetTemp = parseFloat((98.6 + (loadFactor * 0.5) + (Math.random() * 0.4)).toFixed(1));

    // GSAP tween for the numeric objects to simulate smooth counting
    const tempObj = { ...kpiData }; // Starting state

    gsap.to(tempObj, {
      duration: 1.5,
      ease: "power2.out",
      hr: targetHR,
      bps: targetBps,
      bpd: targetBpd,
      o2: targetO2,
      temp: targetTemp,
      onUpdate: () => {
        if(hrRef.current) hrRef.current.innerText = Math.round(tempObj.hr);
        if(bpRefSys.current) bpRefSys.current.innerText = Math.round(tempObj.bps);
        if(bpRefDia.current) bpRefDia.current.innerText = Math.round(tempObj.bpd);
        if(o2Ref.current) o2Ref.current.innerText = Math.round(tempObj.o2) + '%';
        if(tempRef.current) tempRef.current.innerText = tempObj.temp.toFixed(1) + '°F';
      },
      onComplete: () => {
        setKpiData({
          hr: targetHR,
          bps: targetBps,
          bpd: targetBpd,
          o2: targetO2,
          temp: targetTemp
        });
      }
    });

  }, [simState]);

  const cards = [
    { title: 'Avg Heart Rate', icon: HeartPulse, color: 'var(--accent-alert)', suffix: ' bpm', ref1: hrRef, ref2: null, initialPrimary: kpiData.hr, initialSecondary: '' },
    { title: 'Avg Blood Pressure', icon: Activity, color: 'var(--accent-blue)', suffix: ' mmHg', ref1: bpRefSys, ref2: bpRefDia, initialPrimary: kpiData.bps, initialSecondary: kpiData.bpd },
    { title: 'O2 Saturation', icon: Droplets, color: 'var(--accent-green)', suffix: '', ref1: o2Ref, ref2: null, initialPrimary: kpiData.o2 + '%', initialSecondary: '' },
    { title: 'Avg Core Temp', icon: Thermometer, color: '#f59e0b', suffix: '', ref1: tempRef, ref2: null, initialPrimary: kpiData.temp.toFixed(1) + '°F', initialSecondary: '' },
  ];

  return (
    <div ref={containerRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="glass-panel hover-glow" 
          style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
        >
          {/* Subtle background glow element */}
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '60px', height: '60px', background: card.color, filter: 'blur(35px)', opacity: 0.15, borderRadius: '50%' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `rgba(255,255,255,0.05)`, border: `1px solid ${card.color}22`, display: 'grid', placeItems: 'center' }}>
              <card.icon size={18} color={card.color} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>{card.title}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <h2 ref={card.ref1} style={{ fontSize: '2rem', margin: 0, fontWeight: 700, color: 'var(--text-main)', textShadow: `0 0 10px ${card.color}44` }}>
              {card.initialPrimary}
            </h2>
            {card.ref2 && (
              <>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/</span>
                <h2 ref={card.ref2} style={{ fontSize: '2rem', margin: 0, fontWeight: 700, color: 'var(--text-main)', textShadow: `0 0 10px ${card.color}44` }}>
                  {card.initialSecondary}
                </h2>
              </>
            )}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.25rem' }}>{card.suffix}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
