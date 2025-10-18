import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated using the auth utility
    setAuthStatus(isAuthenticated());
  }, []);

  // Show loading while checking authentication
  if (authStatus === null) {
    return <div className="loading-spinner"></div>;
  }

  // Redirect to login if not authenticated
  if (!authStatus) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
