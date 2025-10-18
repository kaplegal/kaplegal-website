import React, { useState, useEffect } from 'react';
import { getCurrentAdmin } from '../../utils/authUtils';
import './AdminStyles.css';

const AdminAuthStatus = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const adminData = await getCurrentAdmin();
        
        if (adminData) {
          setAdmin(adminData);
          setError(null);
        } else {
          setError('Could not retrieve admin information');
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load admin information');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-auth-status">
      <h3>Authentication Status</h3>
      
      {loading ? (
        <div className="loading-spinner small"></div>
      ) : error ? (
        <div className="admin-error small">{error}</div>
      ) : admin ? (
        <div className="admin-status-details">
          <div className="admin-status-item">
            <span className="status-label">Username:</span>
            <span className="status-value">{admin.username}</span>
          </div>
          
          <div className="admin-status-item">
            <span className="status-label">Role:</span>
            <span className="status-value">{admin.role}</span>
          </div>
          
          <div className="admin-status-item">
            <span className="status-label">Last Login:</span>
            <span className="status-value">{formatDate(admin.lastLogin)}</span>
          </div>
          
          <div className="admin-status-item">
            <span className="status-label">Account Created:</span>
            <span className="status-value">{formatDate(admin.createdAt)}</span>
          </div>
          
          <div className="admin-status-badge">
            <span className="status-active">Active Session</span>
          </div>
        </div>
      ) : (
        <div className="admin-status-not-authenticated">
          Not authenticated
        </div>
      )}
    </div>
  );
};

export default AdminAuthStatus;
