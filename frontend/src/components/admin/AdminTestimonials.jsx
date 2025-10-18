import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminStyles.css';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for adding/editing testimonials
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: '',
    position: '',
    text: '',
    isActive: true
  });
  const [currentId, setCurrentId] = useState(null);
  
  // Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/testimonials`);
      setTestimonials(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTestimonial(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formMode === 'add') {
        await axios.post(`${import.meta.env.VITE_API_URL}/testimonials`, currentTestimonial);
      } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/testimonials/${currentId}`, currentTestimonial);
      }
      
      // Reset form and refresh testimonials
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setError('Failed to save testimonial. Please try again.');
    }
  };
  
  // Handle edit testimonial
  const handleEdit = (testimonial) => {
    setFormMode('edit');
    setCurrentTestimonial({
      name: testimonial.name,
      position: testimonial.position,
      text: testimonial.text,
      isActive: testimonial.isActive
    });
    setCurrentId(testimonial._id);
  };
  
  // Handle delete testimonial
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        setError('Failed to delete testimonial. Please try again.');
      }
    }
  };
  
  // Handle toggle active status
  const handleToggleActive = async (id, currentStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/testimonials/${id}`, {
        isActive: !currentStatus
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial status:', error);
      setError('Failed to update testimonial status. Please try again.');
    }
  };
  
  // Reset form to add mode
  const resetForm = () => {
    setFormMode('add');
    setCurrentTestimonial({
      name: '',
      position: '',
      text: '',
      isActive: true
    });
    setCurrentId(null);
  };
  
  return (
    <>
      <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Testimonials</h1>
        <div className="admin-breadcrumb">
          <Link to="/admin">Dashboard</Link> / Testimonials
        </div>
      </div>
      
      {error && <div className="admin-error">{error}</div>}
      
      <div className="admin-content">
        <div className="admin-form-container">
          <h2>{formMode === 'add' ? 'Add New Testimonial' : 'Edit Testimonial'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentTestimonial.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={currentTestimonial.position}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="text">Testimonial Text</label>
              <textarea
                id="text"
                name="text"
                value={currentTestimonial.text}
                onChange={handleInputChange}
                required
                rows="5"
              ></textarea>
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={currentTestimonial.isActive}
                onChange={handleInputChange}
              />
              <label htmlFor="isActive">Active</label>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                {formMode === 'add' ? 'Add Testimonial' : 'Update Testimonial'}
              </button>
              
              {formMode === 'edit' && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="admin-contacts-list">
          <h2>Existing Testimonials</h2>
          
          {loading ? (
            <div className="loading-spinner"></div>
          ) : testimonials.length === 0 ? (
            <p>No testimonials found. Add your first testimonial using the form.</p>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Testimonial</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map(testimonial => (
                    <tr key={testimonial._id} className={!testimonial.isActive ? 'inactive-row' : ''}>
                      <td><strong>{testimonial.name}</strong></td>
                      <td>{testimonial.position}</td>
                      <td>
                        <div className="testimonial-text-preview">
                          {testimonial.text.length > 100 ? 
                            `${testimonial.text.substring(0, 100)}...` : 
                            testimonial.text
                          }
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${testimonial.isActive ? 'status-active' : 'status-inactive'}`}>
                          {testimonial.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <button 
                            className="admin-action-btn edit-btn" 
                            onClick={() => handleEdit(testimonial)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          
                          <button 
                            className="admin-action-btn toggle-btn" 
                            onClick={() => handleToggleActive(testimonial._id, testimonial.isActive)}
                            title={testimonial.isActive ? "Deactivate" : "Activate"}
                          >
                            {testimonial.isActive ? 
                              <i className="fas fa-eye-slash"></i> : 
                              <i className="fas fa-eye"></i>
                            }
                          </button>
                          
                          <button 
                            className="admin-action-btn delete-btn" 
                            onClick={() => handleDelete(testimonial._id)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminTestimonials;
