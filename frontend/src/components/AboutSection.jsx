import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';
import justiceImage from '../assets/justice.jpg';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({ years: 0, families: 0, satisfaction: 0 });
  const [animatedItems, setAnimatedItems] = useState([false, false, false]);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const targetNumbers = { years: 15, families: 800, satisfaction: 98 };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
          animateCircles();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);
  
  const animateCircles = () => {
    // Animate each circle with a slight delay between them
    setTimeout(() => setAnimatedItems([true, false, false]), 100);
    setTimeout(() => setAnimatedItems([true, true, false]), 300);
    setTimeout(() => setAnimatedItems([true, true, true]), 500);
  };

  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function

      setAnimatedNumbers({
        years: Math.floor(targetNumbers.years * easeOut),
        families: Math.floor(targetNumbers.families * easeOut),
        satisfaction: Math.floor(targetNumbers.satisfaction * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedNumbers(targetNumbers); // Ensure final values are exact
      }
    }, stepTime);
  };

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>About Our Firm</h2>
          <p className="subtitle">Compassionate Advocacy for Families</p>
        </div>
      </div>
      <div className="about-content">
        <div className="about-left">
          <div className="about-title-container">
            <h3 className="about-title-line">Our Lawyers Provide</h3>
            <h3 className="about-title-line">Expert Legal Advice</h3>
            <h3 className="about-title-line"> For Families</h3>
          </div>
          <p className="bold-text">
            Dedicated to protecting your rights and interests
            with integrity, expertise and personalized attention.
          </p>
          
          <div className="about-stats" ref={statsRef}>
            <div className={`stat-item ${animatedItems[0] ? 'animate' : ''}`}>
              <div className="circle-container">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle className="circle-bg" cx="45" cy="45" r="40" />
                  <circle className={`circle-progress ${animatedItems[0] ? 'animate' : ''}`} cx="45" cy="45" r="40" />
                </svg>
                <h3>{animatedNumbers.years}+</h3>
              </div>
              <p>Years in Family Law</p>
            </div>
            <div className={`stat-item ${animatedItems[1] ? 'animate' : ''}`}>
              <div className="circle-container">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle className="circle-bg" cx="45" cy="45" r="40" />
                  <circle className={`circle-progress ${animatedItems[1] ? 'animate' : ''}`} cx="45" cy="45" r="40" />
                </svg>
                <h3>{animatedNumbers.families}+</h3>
              </div>
              <p>Families Helped</p>
            </div>
            <div className={`stat-item ${animatedItems[2] ? 'animate' : ''}`}>
              <div className="circle-container">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle className="circle-bg" cx="45" cy="45" r="40" />
                  <circle className={`circle-progress ${animatedItems[2] ? 'animate' : ''}`} cx="45" cy="45" r="40" />
                </svg>
                <h3>{animatedNumbers.satisfaction}%</h3>
              </div>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
        
        <div className="about-image-container">
          <img src={justiceImage} alt="Justice Scales" className="about-center-image" />
        </div>
        
        <div className="about-right">
          <h3 className="about-subtitle"></h3>
          
          <div className="feature-points">
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="feature-text">
                <h4>Personalized Strategy</h4>
                <p>Tailored legal solutions for your unique situation</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="feature-text">
                <h4>Strong Advocacy</h4>
                <p>Vigorous representation in and out of court</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="feature-text">
                <h4 className="nowrap-heading">Clear Communication</h4>
                <p>Regular updates and transparent legal advice</p>
              </div>
            </div>
          </div>
          
          <div className="about-button-container">
            <Link to="/our-approach" className="btn btn-primary">Our Approach</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;