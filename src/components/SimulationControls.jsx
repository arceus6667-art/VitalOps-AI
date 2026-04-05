import React, { useRef } from 'react';
import { Settings2, Activity, Users } from 'lucide-react';
import gsap from 'gsap';

export default function SimulationControls({ simState, setSimState }) {
  const containerRef = useRef(null);

  const handleInflowChange = (e) => {
    setSimState(prev => ({ ...prev, inflow: parseInt(e.target.value) }));
  };

  const handleEmergencyChange = (e) => {
    setSimState(prev => ({ ...prev, emergency: parseInt(e.target.value) }));
  };

  return (
    <div ref={containerRef} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Settings2 size={18} color="var(--accent-blue)" />
        <h3 style={{ margin: 0, fontSize: '1rem' }}>AI Simulation Controls</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Patient Inflow Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={14}/> Patient Inflow</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{simState.inflow}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={simState.inflow}
            onChange={handleInflowChange}
            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}
          />
        </div>

        {/* Emergency Trauma Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={14}/> Emergency Volatility</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: simState.emergency > 70 ? 'var(--accent-alert)' : 'var(--text-main)' }}>{simState.emergency}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={simState.emergency}
            onChange={handleEmergencyChange}
            style={{ width: '100%', cursor: 'pointer', accentColor: simState.emergency > 70 ? 'var(--accent-alert)' : 'var(--accent-blue)' }}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 243, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 243, 255, 0.1)' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Adjust sliders to simulate real-time hospital overload. Matrix alerts and 3D sector mapping will react instantly to mathematical thresholds.
        </p>
      </div>
    </div>
  );
}
