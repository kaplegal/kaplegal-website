import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Blogs.css';

const Blogs = () => {
  // State for filtered posts, active category, and search query
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Removed carousel state and ref
  
  // Sample blog data - in a real application, this would come from an API or database
  const blogPosts = [
    {
      id: 1,
      title: "Navigating Corporate Compliance in 2025",
      category: "Corporate Law",
      date: "15 JUL 2025",
      excerpt: "New regulations are reshaping how businesses approach compliance. Our experts break down what you need to know to stay ahead.",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Modern Approaches to Child Custody Arrangements",
      category: "Family Law",
      date: "28 JUN 2025",
      excerpt: "Courts are increasingly favoring collaborative parenting plans. Learn how these changes might affect your family situation.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Digital Assets in Your Estate Plan: What You Need to Know",
      category: "Estate Planning",
      date: "03 AUG 2025",
      excerpt: "From cryptocurrency to online accounts, digital assets are becoming an important consideration in modern estate planning.",
      image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Digital Evidence in Modern Criminal Cases",
      category: "Criminal Defense",
      date: "05 AUG 2025",
      excerpt: "The role of digital forensics is transforming criminal defense strategies. Our attorneys discuss key considerations for defendants.",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      id: 5,
      title: "Understanding Prenuptial Agreements",
      category: "Family Law",
      date: "12 JUL 2025",
      excerpt: "Prenuptial agreements are becoming more common. Learn about their benefits and how they can protect both parties in a marriage.",
      image: "https://images.unsplash.com/photo-1565619624098-cf4168a7cd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "Business Succession Planning for Family Businesses",
      category: "Corporate Law",
      date: "20 JUN 2025",
      excerpt: "Family businesses face unique challenges when planning for succession. Our guide helps navigate this complex process.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 7,
      title: "Intellectual Property Protection in the Digital Age",
      category: "Intellectual Property",
      date: "18 JUL 2025",
      excerpt: "Protecting your intellectual property has become more complex in our digital world. Learn the latest strategies and legal frameworks.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
    },
    {
      id: 8,
      title: "Employment Law Updates: Remote Work Regulations",
      category: "Employment Law",
      date: "25 JUL 2025",
      excerpt: "New regulations are shaping the future of remote work. Stay compliant with the latest employment law changes affecting your business.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    }
  ];

  // Extract unique categories from blog posts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on active category and search query
  useEffect(() => {
    let result = [...blogPosts];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      result = result.filter(post => post.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) || 
        post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(result);
  }, [activeCategory, searchQuery, blogPosts]);

  // Handle category filter click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    // The search is already applied through the useEffect
    // This is just to handle the button click event if needed
  };

  // Removed carousel navigation functions

  return (
    <section className="blogs-page section">
      {/* Add a spacer div to push content below navbar */}
      <div className="header-spacer"></div>
      
      <div className="container">
        <div className="section-header">
          <h1>Legal Insights</h1>
          <p className="subtitle">Expert Perspectives on Law</p>
        </div>

        <div className="blogs-filter">
          <div className="filter-categories">
            {categories.map(category => (
              <button 
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-btn" onClick={handleSearchClick}>
              <i className="fas fa-search"></i>
              Search
            </button>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="no-results">
            <h3>No articles found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="btn btn-primary" onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}>Reset Filters</button>
          </div>
        ) : (
          <div className="blogs-container">
            <div className="blogs-grid-full">
              {filteredPosts.map(post => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-header">
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-footer">
                    <div className="blog-date">
                      <span>{post.date}</span>
                    </div>
                    <Link to={`/blogs/${post.id}`} className="read-more">Continue Reading <span>&rarr;</span></Link>
                  </div>
                </div>
              </div>
            ))}
            </div>
            
            {/* Removed carousel controls */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
