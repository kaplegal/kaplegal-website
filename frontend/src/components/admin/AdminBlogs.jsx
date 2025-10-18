import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminStyles.css';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for adding/editing blogs
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentBlog, setCurrentBlog] = useState({
    title: '',
    category: '',
    summary: '',
    content: '',
    image: '',
    author: 'KAP LEGAL LLP',
    isPublished: true
  });
  const [currentId, setCurrentId] = useState(null);
  
  // Categories for dropdown
  const categories = [
    'Corporate Law',
    'Family Law',
    'Criminal Defense',
    'Real Estate',
    'Litigation',
    'Estate Planning'
  ];
  
  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Load blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentBlog(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formMode === 'add') {
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, currentBlog);
      } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${currentId}`, currentBlog);
      }
      
      // Reset form and refresh blogs
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      setError('Failed to save blog. Please try again.');
    }
  };
  
  // Handle edit blog
  const handleEdit = (blog) => {
    setFormMode('edit');
    setCurrentBlog({
      title: blog.title,
      category: blog.category,
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      isPublished: blog.isPublished
    });
    setCurrentId(blog._id);
  };
  
  // Handle delete blog
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        setError('Failed to delete blog. Please try again.');
      }
    }
  };
  
  // Handle toggle published status
  const handleTogglePublished = async (id, currentStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        isPublished: !currentStatus
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog status:', error);
      setError('Failed to update blog status. Please try again.');
    }
  };
  
  // Reset form to add mode
  const resetForm = () => {
    setFormMode('add');
    setCurrentBlog({
      title: '',
      category: '',
      summary: '',
      content: '',
      image: '',
      author: 'KAP LEGAL LLP',
      isPublished: true
    });
    setCurrentId(null);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <>
      <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Blog Posts</h1>
        <div className="admin-breadcrumb">
          <Link to="/admin">Dashboard</Link> / Blog Posts
        </div>
      </div>
      
      {error && <div className="admin-error">{error}</div>}
      
      <div className="admin-content">
        <div className="admin-form-container">
          <h2>{formMode === 'add' ? 'Add New Blog Post' : 'Edit Blog Post'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={currentBlog.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                name="summary"
                value={currentBlog.summary}
                onChange={handleInputChange}
                required
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={currentBlog.content}
                onChange={handleInputChange}
                required
                rows="10"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={currentBlog.image}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={currentBlog.author}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={currentBlog.isPublished}
                onChange={handleInputChange}
              />
              <label htmlFor="isPublished">Published</label>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                {formMode === 'add' ? 'Add Blog Post' : 'Update Blog Post'}
              </button>
              
              {formMode === 'edit' && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="admin-list-container">
          <h2>Existing Blog Posts</h2>
          
          {loading ? (
            <div className="loading-spinner"></div>
          ) : blogs.length === 0 ? (
            <p>No blog posts found. Add your first blog post using the form.</p>
          ) : (
            <div className="admin-list">
              {blogs.map(blog => (
                <div key={blog._id} className={`admin-list-item ${!blog.isPublished ? 'inactive' : ''}`}>
                  <div className="admin-list-content">
                    <h3>{blog.title}</h3>
                    <p className="admin-list-subtitle">{blog.category} • {formatDate(blog.publishedAt)}</p>
                    <p className="admin-list-text">{blog.summary}</p>
                  </div>
                  
                  <div className="admin-list-actions">
                    <button 
                      className="admin-action-btn edit-btn" 
                      onClick={() => handleEdit(blog)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    
                    <button 
                      className="admin-action-btn toggle-btn" 
                      onClick={() => handleTogglePublished(blog._id, blog.isPublished)}
                    >
                      {blog.isPublished ? 
                        <i className="fas fa-eye-slash"></i> : 
                        <i className="fas fa-eye"></i>
                      }
                    </button>
                    
                    <button 
                      className="admin-action-btn delete-btn" 
                      onClick={() => handleDelete(blog._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminBlogs;
