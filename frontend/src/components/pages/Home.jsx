import React from 'react';
import '../../styles/Home.css';

// Import all section components
import HeroSection from '../HeroSection';
import AboutSection from '../AboutSection';
import BlogSection from '../BlogSection';
import Testimonials from '../Testimonials';
import Contact from '../Contact';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Blogs Section (Legal Insights) */}
      <BlogSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
