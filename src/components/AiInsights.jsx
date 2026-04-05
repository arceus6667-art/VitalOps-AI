import React, { useRef, useEffect, useMemo } from 'react';
import { Lightbulb, AlertTriangle, ArrowRightCircle, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

export default function AiInsights({ simState }) {
  const containerRef = useRef(null);

  // Generate predictive AI intelligence context based on current parameters
  const insights = useMemo(() => {
    const list = [];
    
    if (simState.emergency > 85) {
      list.push({ id: 1, type: 'critical', text: 'Imminent ICU Overflow expected within 45 minutes.', action: 'Initiate Transfer Protocol Alpha.' });
    }
    
    if (simState.inflow > 80) {
      list.push({ id: 2, type: 'warning', text: 'Triage bottleneck predicted. Staffing ratio suboptimal.', action: 'Redistribute 4 nurses from Gen Ward to ER.' });
    } else if (simState.inflow > 60 && simState.emergency <= 50) {
      list.push({ id: 3, type: 'info', text: 'Moderate bed scarcity approaching. Surgery Wing under-utilized.', action: 'Convert 10 Surgery beds to General Intake.' });
    }

    if (simState.inflow < 40 && simState.emergency < 30) {
      list.push({ id: 4, type: 'success', text: 'System load optimal. All critical metrics stable.', action: 'Resume standard maintenance schedules.' });
    }
    
    return list;
  }, [simState.inflow, simState.emergency]);

  // Execute entrance animations automatically when insights update
  useEffect(() => {
    if (containerRef.current) {
      // Small pulse flash to draw attention
      gsap.fromTo(containerRef.current,
        { boxShadow: '0 0 30px rgba(0, 243, 255, 0.4)' },
        { boxShadow: '0 0 0px rgba(0,0,0,0)', duration: 1.5, ease: 'power2.out', clearProps: 'boxShadow' }
      );
      
      // Cascade list animation
      const items = containerRef.current.querySelectorAll('.insight-item');
      if (items.length > 0) {
        gsap.fromTo(items, 
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
        );
      }
    }
  }, [insights]);

  const getStyleProps = (type) => {
    switch(type) {
      case 'critical': return { icon: AlertTriangle, color: 'var(--accent-alert)' };
      case 'warning': return { icon: Lightbulb, color: '#f59e0b' };
      case 'success': return { icon: ShieldCheck, color: 'var(--accent-green)' };
      default: return { icon: Lightbulb, color: 'var(--accent-blue)' };
    }
  };

  return (
    <div ref={containerRef} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
        <div style={{ width: '28px', height: '28px', background: 'rgba(0,243,255,0.1)', borderRadius: '6px', display: 'grid', placeItems: 'center', border: '1px solid rgba(0,243,255,0.3)' }}>
          <Lightbulb size={16} color="var(--accent-blue)" />
        </div>
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>AI Predictive Insights</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {insights.map(insight => {
          const props = getStyleProps(insight.type);
          return (
            <div key={insight.id} className="insight-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: `3px solid ${props.color}`, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <props.icon size={16} color={props.color} style={{ marginTop: '0.1rem' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{insight.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <ArrowRightCircle size={12} color={props.color} />
                    <span style={{ fontSize: '0.75rem', color: props.color, fontWeight: 600 }}>{insight.action}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
