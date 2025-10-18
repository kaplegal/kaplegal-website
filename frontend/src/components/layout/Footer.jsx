import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Footer.css';
import logoImage from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  // Handle navigation to home page
  const goToHomePage = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle navigation to specific sections
  const handleSectionNavigation = (e, section) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = `/#${section}`;
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Handle navigation to blogs page
  const goToBlogs = (e) => {
    e.preventDefault();
    window.location.href = '/blogs';
  };
  
  // Handle navigation to privacy policy page
  const goToPrivacyPolicy = (e) => {
    e.preventDefault();
    window.location.href = '/privacy-policy';
  };
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <div className="footer-logo">
              <img src={logoImage} alt="KAP LEGAL LLP Logo" className="footer-logo-image" />
              <div className="footer-logo-text">
                <p className="footer-logo-name">KAP LEGAL LLP</p>
              </div>
            </div>
            <p>Dedicated to providing exceptional legal services with integrity, professionalism, and a commitment to client success since 1995.</p>
            <div className="contact-details" style={{ textAlign: 'left', margin: '15px 0' }}>
              <p className="contact-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px' }}>
                <span style={{ color: '#D4AF37', marginRight: '5px', fontSize: '18px' }}>📍</span> 
                <span>123 Legal Avenue, Suite 500</span>
              </p>
              <p className="contact-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px' }}>
                <span style={{ color: '#D4AF37', marginRight: '5px', fontSize: '18px' }}>📞</span> 
                <span>(555) 123-4567</span>
              </p>
              <p className="contact-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px' }}>
                <span style={{ color: '#D4AF37', marginRight: '5px', fontSize: '18px' }}>✉️</span> 
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kaplegalllp@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#D4AF37'} onMouseOut={(e) => e.target.style.color = 'inherit'}>kaplegalllp@gmail.com</a>
              </p>
            </div>
            <div className="social-icons">
              <a href="https://www.youtube.com/@FamilyMatters_AdvocateSonali" className="social-icon" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold' }}>YT</span></a>
              <a href="https://www.instagram.com/familymatters_advocatesonali/reels/" className="social-icon" target="_blank" rel="noopener noreferrer"><span>𝓘</span></a>
              <a href="https://in.linkedin.com/company/kj-law-partners-llp" className="social-icon" target="_blank" rel="noopener noreferrer"><span>𝕃</span></a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kaplegalllp@gmail.com" className="social-icon" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold' }}>G</span></a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={goToHomePage}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleSectionNavigation(e, 'about')}>About Us</a></li>
              <li><a href="#" onClick={goToBlogs}>Legal Insights</a></li>
              <li><a href="#attorneys" onClick={(e) => handleSectionNavigation(e, 'attorneys')}>Our Attorneys</a></li>
              <li><a href="#testimonials" onClick={(e) => handleSectionNavigation(e, 'testimonials')}>Testimonials</a></li>
              <li><a href="#contact" onClick={(e) => handleSectionNavigation(e, 'contact')}>Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section blog-categories">
            <h3>Legal Insights</h3>
            <ul>
              <li><a href="#" onClick={goToBlogs}>Corporate Law</a></li>
              <li><a href="#" onClick={goToBlogs}>Family Law</a></li>
              <li><a href="#" onClick={goToBlogs}>Criminal Defense</a></li>
              <li><a href="#" onClick={goToBlogs}>Real Estate</a></li>
              <li><a href="#" onClick={goToBlogs}>Litigation</a></li>
              <li><a href="#" onClick={goToBlogs}>Estate Planning</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} KJ LAW PARTNERS. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={goToPrivacyPolicy}>Privacy Policy</a>
            <a href="#" onClick={goToPrivacyPolicy}>Terms of Service</a>
            <a href="#" onClick={goToPrivacyPolicy}>Legal Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
