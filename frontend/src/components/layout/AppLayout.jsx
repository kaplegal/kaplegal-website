import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdminNav from '../admin/AdminNav';
import ScrollManager from '../ScrollManager';
import DisclaimerPopup from '../DisclaimerPopup';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.includes('/admin');
  
  // Check if current route is the admin login page
  const isAdminLoginPage = location.pathname === '/admin/login';
  
  // Check localStorage on component mount
  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted');
    setShowDisclaimer(!hasAcceptedDisclaimer);
  }, []);
  
  // Save acceptance to localStorage
  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };
  
  return (
    <>
      {/* Only show disclaimer, header, footer on non-admin routes */}
      {!isAdminRoute && showDisclaimer && <DisclaimerPopup onAccept={handleAcceptDisclaimer} />}
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <ScrollManager />}
      
      {/* Show AdminNav on admin pages except login page */}
      {isAdminRoute && !isAdminLoginPage && <AdminNav />}
      
      <main>
        {children}
      </main>
      
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppLayout;
