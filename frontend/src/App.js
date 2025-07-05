import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import UploadDashboard from './components/UploadDashboard';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import './App.css';

// 🔁 Inner component to handle login and navigation
function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/admin-dashboard");
  };

  return (
    <Routes>
      <Route path="/" element={<UploadDashboard />} />
      <Route path="/admin" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/admin-dashboard" element={<AdminDashboard isLoggedIn={isLoggedIn} />} />
    </Routes>
  );
}

// 🔁 Outer wrapper for routing context
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
