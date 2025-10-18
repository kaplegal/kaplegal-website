import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import logoImage from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Apply scrolled class after scrolling 100px
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'attorneys', 'blogs', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100; // Reduced offset for better detection
      
      let currentSection = 'home'; // Default to home
      
      // Check each section from top to bottom
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          
          // If we've scrolled past the start of this section, it's the current one
          if (scrollPosition >= offsetTop - 50) {
            currentSection = section;
          }
        }
      }
      
      // Special case for contact section at the bottom
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const contactTop = contactElement.offsetTop;
        const isNearContact = scrollPosition >= contactTop - 100;
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
        
        if (isNearContact || isAtBottom) {
          currentSection = 'contact';
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking a link (for mobile)
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };
  
  // Handle navigation to specific sections
  const handleSectionNavigation = (e, section) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = `/#${section}`;
    } else {
      // If already on home page, just scroll to the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };
  
  // Handle navigation to home page
  const goToHomePage = (e) => {
    e.preventDefault();
    // Force a full page reload to ensure proper navigation
    window.location.href = '/';
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Overlay for mobile menu */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
      
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo desktop-only">
            <img src={logoImage} alt="KAP LEGAL LLP Logo" className="logo-image" />
            <div className="logo-text">
              <p className="logo-name">KAP LEGAL LLP</p>
            </div>
          </div>
          
          <div className="mobile-logo-container">
            <img src={logoImage} alt="KAP LEGAL LLP Logo" className="mobile-logo-image" />
          </div>
          
          <div className="mobile-title">KAP LEGAL LLP</div>
          
          <div className={`mobile-menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <div className="mobile-nav-header">
              <div className="mobile-logo">
                <h2>KAP LEGAL LLP</h2>
              </div>
              <div className="mobile-close" onClick={toggleMenu}>
                <div className="close-icon">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname !== '/') {
                    window.location.href = '/';
                  } else {
                    // If already on home page, scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}>HOME</a>
              </li>
              <li>
                <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleSectionNavigation(e, 'about')}>ABOUT US</a>
              </li>
              <li>
                <a href="#blogs" className={activeSection === 'blogs' ? 'active' : ''} onClick={(e) => handleSectionNavigation(e, 'blogs')}>LEGAL INSIGHTS</a>
              </li>
              <li>
                <a href="#testimonials" className={activeSection === 'testimonials' ? 'active' : ''} onClick={(e) => handleSectionNavigation(e, 'testimonials')}>TESTIMONIALS</a>
              </li>
              <li>
                <a href="#contact" className={`contact-btn ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleSectionNavigation(e, 'contact')}>CONTACT US</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
