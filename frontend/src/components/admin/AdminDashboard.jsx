import React from 'react';
import { Link } from 'react-router-dom';
import AdminAuthStatus from './AdminAuthStatus';
import './AdminStyles.css';

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the KAP LEGAL LLP admin dashboard</p>
      </div>
      
      <AdminAuthStatus />
      
      <div className="admin-menu">
        <Link to="/admin/testimonials" className="admin-menu-item">
          <div className="admin-menu-icon">
            <i className="fas fa-comment-dots"></i>
          </div>
          <div className="admin-menu-content">
            <h3>Testimonials</h3>
            <p>Manage client testimonials</p>
          </div>
        </Link>
        
        <Link to="/admin/blogs" className="admin-menu-item">
          <div className="admin-menu-icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <div className="admin-menu-content">
            <h3>Blog Posts</h3>
            <p>Manage legal insights and articles</p>
          </div>
        </Link>
        
        <Link to="/admin/contacts" className="admin-menu-item">
          <div className="admin-menu-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="admin-menu-content">
            <h3>Contact Submissions</h3>
            <p>View and manage contact form submissions</p>
          </div>
        </Link>
      </div>
      
    </div>
    </>
  );
};

export default AdminDashboard;
