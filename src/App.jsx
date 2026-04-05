import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vitals from './pages/Vitals';
import Patients from './pages/Patients';
import AlertsPage from './pages/AlertsPage';
import DataHub from './pages/DataHub';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Routes>
          {/* Unprotected Auth Gateway */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="vitals" element={<Vitals />} />
            <Route path="patients" element={<Patients />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="data" element={<DataHub />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
