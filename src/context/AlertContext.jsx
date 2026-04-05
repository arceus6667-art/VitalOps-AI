import React, { createContext, useState, useEffect } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addAlerts = (newAlerts) => {
    setAlerts(prev => {
      // Merge unique alerts by ID or just replace if dictated by sim
      // To simulate continuous flow, just replace for simplicity here with timestamping
      return newAlerts;
    });
  };

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const markAllRead = () => {
    setUnreadCount(0);
  };

  useEffect(() => {
    // Whenever alerts increase, update unread count
    setUnreadCount(alerts.length);
  }, [alerts]);

  return (
    <AlertContext.Provider value={{ alerts, unreadCount, addAlerts, dismissAlert, markAllRead }}>
      {children}
    </AlertContext.Provider>
  );
}
