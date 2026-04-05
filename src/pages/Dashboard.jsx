import React, { useContext, useEffect, useState } from 'react';
import KpiCards from '../components/KpiCards';
import AnimatedCharts from '../components/AnimatedCharts';
import Hospital3D from '../components/Hospital3D';
import SimulationControls from '../components/SimulationControls';
import Alerts from '../components/Alerts';
import AnalyticsPanel from '../components/AnalyticsPanel';
import AiInsights from '../components/AiInsights';
import { AlertContext } from '../context/AlertContext';

export default function Dashboard() {
  const { addAlerts, alerts: globalAlerts } = useContext(AlertContext);
  const [simState, setSimState] = useState({ inflow: 20, emergency: 10 });
  const [activeTab, setActiveTab] = useState('live');

  useEffect(() => {
    const newAlerts = [];
    if (simState.emergency > 80) {
      newAlerts.push({ id: `c1-${Date.now()}`, title: 'Mass Casualty Protocol Initiated', severity: 'critical', ward: 'Triage F1', time: 'Just now', suggestion: 'Divert ambulances, prep ORs.' });
      newAlerts.push({ id: `c2-${Date.now()}`, title: 'ICU Capacity Exceeded', severity: 'critical', ward: 'ICU F2', time: '1m ago', suggestion: 'Deploy overflow beds to recovery wing.' });
    } else if (simState.emergency > 50) {
      newAlerts.push({ id: `m1-${Date.now()}`, title: 'Elevated Trauma Influx', severity: 'medium', ward: 'Triage F1', time: '2m ago', suggestion: 'Call in standby trauma team.' });
    }
    if (simState.inflow > 85) {
      newAlerts.push({ id: `c3-${Date.now()}`, title: 'Severe Ward Congestion', severity: 'critical', ward: 'Surgery F3', time: '5m ago', suggestion: 'Delay elective procedures.' });
    } else if (simState.inflow > 60) {
      newAlerts.push({ id: `m2-${Date.now()}`, title: 'High Patient Volume', severity: 'medium', ward: 'Gen Ward F2', time: '10m ago', suggestion: 'Accelerate discharge processes.' });
    }
    if (newAlerts.length === 0) {
      newAlerts.push({ id: `l1-norm`, title: 'System Operations Normal', severity: 'low', ward: 'All Systems', time: '15m ago', suggestion: 'Maintain standard monitoring.' });
    }
    addAlerts(newAlerts);
  }, [simState.inflow, simState.emergency]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Command Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>AI-Assisted Operations & 3D Facility Mapping</p>
        </div>
        
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px' }}>
          <button 
            onClick={() => setActiveTab('live')}
            style={{ 
              padding: '0.5rem 1.5rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s',
              background: activeTab === 'live' ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
              color: activeTab === 'live' ? 'var(--accent-blue)' : 'var(--text-muted)'
            }}
          >
            Live Map
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            style={{ 
              padding: '0.5rem 1.5rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s',
              background: activeTab === 'analytics' ? 'rgba(0, 255, 102, 0.15)' : 'transparent',
              color: activeTab === 'analytics' ? 'var(--accent-green)' : 'var(--text-muted)'
            }}
          >
            Analytics
          </button>
        </div>
      </div>

      <KpiCards simState={simState} />

      {activeTab === 'live' ? (
        <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
              <Hospital3D simState={simState} />
            </div>
            {/* The AI Insights logic takes over the old simple charts space in Live view */}
            <div style={{ flexShrink: 0 }}>
              <AiInsights simState={simState} />
            </div>
          </div>
          <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SimulationControls simState={simState} setSimState={setSimState} />
            <Alerts alerts={globalAlerts} />
          </div>
        </div>
      ) : (
        <AnalyticsPanel simState={simState} />
      )}
    </>
  );
}
