import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../utils/authUtils';
import './AdminStyles.css';

const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    // Use the logout function from authUtils
    logout();
    // Redirect to login page
    navigate('/admin/login');
  };
  
  return (
    <div className="admin-nav">
      <div className="admin-nav-brand">
        <Link to="/admin">KAP LEGAL LLP Admin</Link>
      </div>
      
      <button className="admin-nav-toggle" onClick={toggleMobileMenu}>
        <span className="toggle-icon"></span>
      </button>
      
      <div className={`admin-nav-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-nav-links">
          <Link 
            to="/admin" 
            className={`admin-nav-link ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/testimonials" 
            className={`admin-nav-link ${isActive('/admin/testimonials') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            to="/admin/blogs" 
            className={`admin-nav-link ${isActive('/admin/blogs') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog Posts
          </Link>
          <Link 
            to="/admin/contacts" 
            className={`admin-nav-link ${isActive('/admin/contacts') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacts
          </Link>
          <Link 
            to="/admin/change-passkey" 
            className={`admin-nav-link ${isActive('/admin/change-passkey') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Change Passkey
          </Link>
        </div>
        
        <div className="admin-nav-actions">
          <Link to="/" className="admin-nav-link" onClick={() => setMobileMenuOpen(false)}>View Site</Link>
          <button onClick={handleLogout} className="admin-nav-logout">Logout</button>
        </div>
      </div>
      
      {mobileMenuOpen && <div className="admin-nav-backdrop" onClick={toggleMobileMenu}></div>}
    </div>
  );
};

export default AdminNav;
