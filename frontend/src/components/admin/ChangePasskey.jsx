import React, { useState } from 'react';
import { changePasskey } from '../../utils/authUtils';
import './AdminStyles.css';

const ChangePasskey = () => {
  const [currentPasskey, setCurrentPasskey] = useState('');
  const [newPasskey, setNewPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Password visibility states
  const [showCurrentPasskey, setShowCurrentPasskey] = useState(false);
  const [showNewPasskey, setShowNewPasskey] = useState(false);
  const [showConfirmPasskey, setShowConfirmPasskey] = useState(false);
  
  // Toggle password visibility functions
  const toggleCurrentPasskeyVisibility = () => setShowCurrentPasskey(!showCurrentPasskey);
  const toggleNewPasskeyVisibility = () => setShowNewPasskey(!showNewPasskey);
  const toggleConfirmPasskeyVisibility = () => setShowConfirmPasskey(!showConfirmPasskey);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validation
    if (!currentPasskey || !newPasskey || !confirmPasskey) {
      setError('All fields are required');
      return;
    }
    
    if (newPasskey !== confirmPasskey) {
      setError('New passkey and confirmation do not match');
      return;
    }
    
    if (newPasskey.length < 8) {
      setError('New passkey must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await changePasskey(currentPasskey, newPasskey);
      
      if (result.success) {
        setSuccess(result.message || 'Passkey updated successfully');
        // Clear the form
        setCurrentPasskey('');
        setNewPasskey('');
        setConfirmPasskey('');
      } else {
        setError(result.message || 'Failed to update passkey');
      }
    } catch (error) {
      console.error('Change passkey error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-form-container change-passkey-container">
      <h2>Change Admin Passkey</h2>
      
      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="currentPasskey">Current Passkey</label>
          <div className="password-input-container">
            <input
              type={showCurrentPasskey ? "text" : "password"}
              id="currentPasskey"
              value={currentPasskey}
              onChange={(e) => setCurrentPasskey(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={toggleCurrentPasskeyVisibility}
              tabIndex="-1"
            >
              <i className={`password-toggle-icon ${showCurrentPasskey ? 'visible' : 'hidden'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="newPasskey">New Passkey</label>
          <div className="password-input-container">
            <input
              type={showNewPasskey ? "text" : "password"}
              id="newPasskey"
              value={newPasskey}
              onChange={(e) => setNewPasskey(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={toggleNewPasskeyVisibility}
              tabIndex="-1"
            >
              <i className={`password-toggle-icon ${showNewPasskey ? 'visible' : 'hidden'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPasskey">Confirm New Passkey</label>
          <div className="password-input-container">
            <input
              type={showConfirmPasskey ? "text" : "password"}
              id="confirmPasskey"
              value={confirmPasskey}
              onChange={(e) => setConfirmPasskey(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={toggleConfirmPasskeyVisibility}
              tabIndex="-1"
            >
              <i className={`password-toggle-icon ${showConfirmPasskey ? 'visible' : 'hidden'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Passkey'}
          </button>
        </div>
      </form>
      
      <div className="passkey-info">
        <p>For security reasons, passkeys should:</p>
        <ul>
          <li>Be at least 8 characters long</li>
          <li>Include a mix of letters, numbers, and special characters</li>
          <li>Not be reused from other services</li>
          <li>Be changed periodically</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePasskey;
