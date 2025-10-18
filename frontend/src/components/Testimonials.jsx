import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Get fallback testimonials
  const getFallbackTestimonials = () => [
    {
      _id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      text: "KAP LEGAL LLP provided exceptional counsel during our company's merger. Their attention to detail and strategic approach saved us from potential regulatory issues and ensured a smooth transition."
    },
    {
      _id: 2,
      name: "Michael Rodriguez",
      position: "Small Business Owner",
      text: "When my business faced a complex contract dispute, Alexandra and her team provided clear guidance and strong representation. Their expertise was invaluable in reaching a favorable settlement."
    },
    {
      _id: 3,
      name: "Emily Thompson",
      position: "Family Client",
      text: "During a difficult divorce and custody case, Sophia Martinez showed exceptional compassion while fiercely advocating for my rights. I couldn't have navigated this challenging time without their support."
    },
    {
      _id: 4,
      name: "David Wilson",
      position: "Real Estate Developer",
      text: "The real estate team at KAP LEGAL LLP has been instrumental in our development projects. Their proactive approach to potential legal issues has repeatedly saved us time and resources."
    },
    {
      _id: 5,
      name: "Jennifer Lee",
      position: "Healthcare Professional",
      text: "The medical malpractice team at KAP LEGAL LLP was thorough, professional, and genuinely caring throughout my case. Their expertise in healthcare law made all the difference in reaching a fair resolution."
    }
  ];

  // Fetch testimonials from the backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/testimonials/active`);
        
        // Use fallback data if API returns empty results
        if (response.data.length === 0) {
          setTestimonials(getFallbackTestimonials());
        } else {
          setTestimonials(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials. Please try again later.');
        setLoading(false);
        
        // Fallback to sample testimonials if API fails
        setTestimonials(getFallbackTestimonials());
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Create three columns of testimonials for the scrolling effect
  const createTestimonialColumn = (startIndex, count) => {
    // If there are no testimonials, return empty array
    if (!testimonials.length) return [];
    
    const columnItems = [];
    for (let i = 0; i < count; i++) {
      const index = (startIndex + i) % testimonials.length;
      columnItems.push(testimonials[index]);
    }
    return columnItems;
  };

  // Create duplicate testimonials for continuous scrolling
  const column1Items = testimonials.length ? createTestimonialColumn(0, 4) : [];
  const column2Items = testimonials.length ? createTestimonialColumn(2, 4) : [];
  const column3Items = testimonials.length ? createTestimonialColumn(4, 4) : [];

  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Client Testimonials</h2>
          <p className="subtitle">What Our Clients Say</p>
        </div>
        
        {loading ? (
          <div className="testimonials-loading">
            <div className="loading-spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        ) : error ? (
          <div className="testimonials-error">
            <p>{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="testimonials-empty">
            <p>No testimonials available at the moment.</p>
          </div>
        ) : isMobile ? (
          <div className="testimonial-carousel">
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonials[currentSlide]?.text || 'No testimonial text available'}"</p>
                  <div className="testimonial-author">
                    <h4>{testimonials[currentSlide]?.name || 'Anonymous'}</h4>
                    <p>{testimonials[currentSlide]?.position || 'Client'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-controls">
              <button className="carousel-control prev" onClick={prevSlide}>&larr;</button>
              <div className="carousel-indicators">
                {testimonials.map((_, index) => (
                  <span 
                    key={index} 
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  ></span>
                ))}
              </div>
              <button className="carousel-control next" onClick={nextSlide}>&rarr;</button>
            </div>
          </div>
        ) : (
          <div className="testimonials-columns">
            {/* First column - scrolls up */}
            <div className="testimonials-column">
              <div className="testimonial-card-wrapper column-up">
                {column1Items.map((testimonial, idx) => (
                  <div className="testimonial-card" key={`col1-${testimonial._id || idx}`}>
                    <div className="quote-icon">❝</div>
                    <p>{testimonial.text || 'No testimonial text available'}</p>
                    <div className="client-info">
                      <h4>{testimonial.name || 'Anonymous'}</h4>
                      <p>{testimonial.position || 'Client'}</p>
                    </div>
                  </div>
                ))}
                {column1Items.map((testimonial, idx) => (
                  <div className="testimonial-card" key={`col1-dup-${testimonial._id || idx}`}>
                    <div className="quote-icon">❝</div>
                    <p>{testimonial.text || 'No testimonial text available'}</p>
                    <div className="client-info">
                      <h4>{testimonial.name || 'Anonymous'}</h4>
                      <p>{testimonial.position || 'Client'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Middle column - scrolls down */}
            <div className="testimonials-column">
              <div className="testimonial-card-wrapper column-down">
                {column2Items.map((testimonial, idx) => (
                  <div className="testimonial-card" key={`col2-${testimonial._id || idx}`}>
                    <div className="quote-icon">❝</div>
                    <p>{testimonial.text || 'No testimonial text available'}</p>
                    <div className="client-info">
                      <h4>{testimonial.name || 'Anonymous'}</h4>
                      <p>{testimonial.position || 'Client'}</p>
                    </div>
                  </div>
                ))}
                {column2Items.map((testimonial, idx) => (
                  <div className="testimonial-card" key={`col2-dup-${testimonial._id || idx}`}>
                    <div className="quote-icon">❝</div>
                    <p>{testimonial.text || 'No testimonial text available'}</p>
                    <div className="client-info">
                      <h4>{testimonial.name || 'Anonymous'}</h4>
                      <p>{testimonial.position || 'Client'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Third column - scrolls up */}
            <div className="testimonials-column">
              <div className="testimonial-card-wrapper column-up">
                {column3Items.map((testimonial, idx) => (
                  <div className="testimonial-card" key={`col3-${testimonial._id || idx}`}>
                    <div className="quote-icon">❝</div>
                    <p>{testimonial.text || 'No testimonial text available'}</p>
                    <div className="client-info">
                      <h4>{testimonial.name || 'Anonymous'}</h4>
                      <p>{testimonial.position || 'Client'}</p>
                    </div>
                  </div>
                ))}
                {column3Items.map((testimonial, idx) => (
                  <div className="testimonial-card" key={`col3-dup-${testimonial._id || idx}`}>
                    <div className="quote-icon">❝</div>
                    <p>{testimonial.text || 'No testimonial text available'}</p>
                    <div className="client-info">
                      <h4>{testimonial.name || 'Anonymous'}</h4>
                      <p>{testimonial.position || 'Client'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;