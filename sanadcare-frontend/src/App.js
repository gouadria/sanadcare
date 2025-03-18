import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { CssBaseline } from '@mui/material';
import Template from './components/template';
import Staff from './pages/Staff';

// Layout Admin (si vous souhaitez conserver une mise en page différente pour l'admin)
import Sidebar from './components/layout/Sidebar';
import DashboardHeader from './components/layout/DashboardHeader';

// Pages Admin
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';

// Pages Publiques
import Login from './pages/Login';
import DoctorDetails from './pages/DoctorDetails';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Template />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/staff" element={<Staff />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/admin/staff/:id" element={<DoctorDetails />} />

        {/* Exemple de route admin sans authentification (layout simple) */}
        <Route
          path="/admin/*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <DashboardHeader />
                {/* Vous pouvez ajouter ici des sous-routes si nécessaire */}
              </div>
            </div>
          }
        />

        {/* Redirection pour les routes inconnues */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
