import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateWithPasskey, isAuthenticated } from '../../utils/authUtils';
import './AdminStyles.css';

const AdminLogin = () => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasskey, setShowPasskey] = useState(false);
  const navigate = useNavigate();
  
  // Toggle passkey visibility
  const togglePasskeyVisibility = () => {
    setShowPasskey(!showPasskey);
  };
  
  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!passkey) {
      setError('Please enter the admin passkey');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Attempt to authenticate with the provided passkey
      const isAuthenticated = await authenticateWithPasskey(passkey);
      
      if (isAuthenticated) {
        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        setError('Invalid passkey. Access denied.');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>KAP LEGAL LLP Administration</p>
          <div className="admin-login-info">
            <p>Enter the secure passkey to access the admin panel.</p>
            <p>This passkey is pre-configured and cannot be changed from the interface.</p>
          </div>
        </div>
        
        {error && <div className="admin-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="passkey">Admin Passkey</label>
            <div className="password-input-container">
              <input
                type={showPasskey ? "text" : "password"}
                id="passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                disabled={loading}
                placeholder="Enter secure passkey"
                autoComplete="off"
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={togglePasskeyVisibility}
                tabIndex="-1"
                title={showPasskey ? "Hide passkey" : "Show passkey"}
              >
                <i className={`password-toggle-icon ${showPasskey ? 'visible' : 'hidden'}`}></i>
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>© {new Date().getFullYear()} KAP LEGAL LLP</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
