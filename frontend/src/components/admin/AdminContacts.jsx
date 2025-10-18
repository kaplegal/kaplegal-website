import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminStyles.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Status options
  const statusOptions = [
    { value: 'new', label: 'New', color: '#f44336' },
    { value: 'read', label: 'Read', color: '#2196F3' },
    { value: 'replied', label: 'Replied', color: '#4CAF50' },
    { value: 'archived', label: 'Archived', color: '#9E9E9E' }
  ];
  
  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact`);
      setContacts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Load contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);
  
  // Handle view contact details
  const handleViewContact = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact/${id}`);
      setSelectedContact(response.data);
      setShowModal(true);
      // Refresh the list to update status if it was changed from 'new' to 'read'
      fetchContacts();
    } catch (error) {
      console.error('Error fetching contact details:', error);
      setError('Failed to load contact details. Please try again.');
    }
  };
  
  // Handle update contact status
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/contact/${id}/status`, { status });
      
      // If we're updating the currently selected contact, update its status in the modal
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(prev => ({ ...prev, status }));
      }
      
      // Refresh the contacts list
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
      setError('Failed to update contact status. Please try again.');
    }
  };
  
  // Handle delete contact
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`);
        
        // If we're deleting the currently selected contact, close the modal
        if (selectedContact && selectedContact._id === id) {
          setShowModal(false);
          setSelectedContact(null);
        }
        
        // Refresh the contacts list
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        setError('Failed to delete contact. Please try again.');
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : '#9E9E9E';
  };
  
  return (
    <>
      <div className="admin-container">
      <div className="admin-header">
        <h1>Contact Submissions</h1>
        <div className="admin-breadcrumb">
          <Link to="/admin">Dashboard</Link> / Contact Submissions
        </div>
      </div>
      
      {error && <div className="admin-error">{error}</div>}
      
      <div className="admin-contacts-list">
        <h2>All Contact Submissions</h2>
        
        {loading ? (
          <div className="loading-spinner"></div>
        ) : contacts.length === 0 ? (
          <p>No contact submissions found.</p>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact._id} className={contact.status === 'new' ? 'new-item' : ''}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.subject}</td>
                    <td>{formatDate(contact.createdAt)}</td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(contact.status) }}
                      >
                        {statusOptions.find(option => option.value === contact.status)?.label}
                      </span>
                    </td>
                    <td className="admin-table-actions">
                      <button 
                        className="admin-action-btn view-btn" 
                        onClick={() => handleViewContact(contact._id)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="admin-action-btn delete-btn" 
                        onClick={() => handleDelete(contact._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Contact Details</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="contact-detail-header">
                <div>
                  <h3>{selectedContact.name}</h3>
                  <p className="contact-email">{selectedContact.email}</p>
                  {selectedContact.phone && (
                    <p className="contact-phone">{selectedContact.phone}</p>
                  )}
                </div>
                <div className="contact-date">
                  {formatDate(selectedContact.createdAt)}
                </div>
              </div>
              
              <div className="contact-subject">
                <strong>Subject:</strong> {selectedContact.subject}
              </div>
              
              <div className="contact-message">
                <strong>Message:</strong>
                <p>{selectedContact.message}</p>
              </div>
              
              <div className="contact-status">
                <strong>Status:</strong>
                <div className="status-dropdown">
                  <select 
                    value={selectedContact.status}
                    onChange={(e) => handleUpdateStatus(selectedContact._id, e.target.value)}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button 
                className="btn btn-danger" 
                onClick={() => {
                  handleDelete(selectedContact._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default AdminContacts;
