import React from 'react';
import './LawyerSection.css';

const LawyerSection = () => {
  return (
    <section className="attorneys-section section" id="attorneys">
      <div className="container">
        <div className="section-header">
          <h2>About Sonali</h2>
          <p className="subtitle">Founder & Principal Attorney</p>
        </div>
        <div className="about-attorney">
          <div className="attorney-image">
            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Attorney Sonali Karwasra" />
          </div>
          <div className="attorney-content">
            <h3>Sonali Karwasra</h3>
            <p className="attorney-specialties">Family Law, Divorce, Child Custody, Adoption</p>
            <div className="attorney-bio">
              <p>With over 15 years of dedicated experience in family law, Sonali Karwasra has established herself as a compassionate advocate for families navigating difficult transitions. Her practice focuses exclusively on helping clients achieve positive outcomes in divorce, child custody, and adoption matters.</p>
              <p>Sonali understands that family legal issues are deeply personal and emotionally challenging. She approaches each case with empathy, providing personalized attention and developing strategies tailored to each family's unique circumstances and needs.</p>
              <p>As a certified family law specialist and mediator, Sonali is committed to finding amicable resolutions whenever possible, while always being prepared to vigorously advocate for her clients in court when necessary. Her balanced approach has helped hundreds of families move forward with dignity and hope.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LawyerSection;