import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Jika tidak ada user, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  return children; // Jika ada user, tampilkan halaman yang diminta
};

export default ProtectedRoute;