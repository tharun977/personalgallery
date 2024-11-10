import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Ensure this file exists and is correctly implemented
import NotFoundPage from './pages/NotFoundPage'; // Optional: If you want a custom 404 page

// Create a PrivateRoute component to handle authentication checks
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Register Route */}

        {/* Protected Routes (Require Authentication) */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} /> {/* Optional: Custom 404 page */}
      </Routes>
    </Router>
  );
}

export default App;
