import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact/submit`, formData);
      
      setSubmitStatus({
        type: 'success',
        message: response.data.message || 'Thank you for your message. We will contact you shortly.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'There was an error submitting your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section section" id="contact">
      <div className="contact-header">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p className="subtitle">Get in touch with our team</p>
        </div>
      </div>
      
      <div className="contact-split-layout">
        {/* Left side - Contact Form */}
        <div className="contact-form-side">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Your Phone" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                required 
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Your Message" 
                required 
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {submitStatus && (
              <div className={`form-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            <button 
              type="submit" 
              className="gold-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        {/* Right side - Image */}
        <div className="contact-image-side">
          {/* Using a stock image */}
        </div>
      </div>
    </section>
  );
};

export default Contact;