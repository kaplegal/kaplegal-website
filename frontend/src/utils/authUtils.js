/**
 * Authentication utilities for secure passkey handling using backend API
 */

import axios from 'axios';

// API URL from environment variables
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if the user is authenticated
 */
export const isAuthenticated = () => {
  return localStorage.getItem('adminAuthToken') !== null;
};

/**
 * Get the authentication token
 * @returns {string|null} - The authentication token or null if not authenticated
 */
export const getAuthToken = () => {
  return localStorage.getItem('adminAuthToken');
};

/**
 * Set up axios headers for authenticated requests
 * @returns {object} - Axios config object with auth headers
 */
export const getAuthConfig = () => {
  const token = getAuthToken();
  return {
    headers: {
      'x-auth-token': token
    }
  };
};

/**
 * Authenticate a user with a passkey
 * @param {string} passkey - The passkey to authenticate with
 * @returns {Promise<boolean>} - Promise resolving to true if authentication was successful
 */
export const authenticateWithPasskey = async (passkey) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { passkey });
    
    if (response.data && response.data.token) {
      // Store the token in localStorage
      localStorage.setItem('adminAuthToken', response.data.token);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

/**
 * Log out the authenticated user
 */
export const logout = () => {
  localStorage.removeItem('adminAuthToken');
};

/**
 * Change the admin passkey
 * @param {string} currentPasskey - The current passkey
 * @param {string} newPasskey - The new passkey
 * @returns {Promise<{success: boolean, message: string}>} - Result of the operation
 */
export const changePasskey = async (currentPasskey, newPasskey) => {
  try {
    const response = await axios.post(
      `${API_URL}/change-passkey`,
      { currentPasskey, newPasskey },
      getAuthConfig()
    );
    
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error('Change passkey error:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to change passkey' 
    };
  }
};

/**
 * Get current admin user information
 * @returns {Promise<object|null>} - Admin user object or null if error
 */
export const getCurrentAdmin = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Get admin error:', error);
    return null;
  }
};
