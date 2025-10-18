import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Protecting <span className="gold-accent">Families</span> & Their Future</h1>
        <p>Compassionate family law representation with personalized attention to your unique needs</p>
        <div className="hero-buttons">
          <a href="#about" className="btn btn-secondary" onClick={scrollToAbout}>Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;