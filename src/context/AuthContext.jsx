import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate checking for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('vitalops_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (provider, email = '') => {
    // Mock login profile
    const mockProfile = {
      name: provider === 'google' ? 'Dr. Elizabeth Shaw' : (email.split('@')[0] || 'Medical Officer'),
      role: 'Chief Medical AI Director',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    };
    setUser(mockProfile);
    localStorage.setItem('vitalops_user', JSON.stringify(mockProfile));
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vitalops_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
