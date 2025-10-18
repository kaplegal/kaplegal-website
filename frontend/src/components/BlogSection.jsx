import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Blogs.css';

const BlogSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get fallback blog posts
  const getFallbackBlogs = () => [
    {
      id: 1,
      title: "Modern Approaches to Child Custody Arrangements",
      category: "Family Law",
      date: "28 JUN 2025",
      content: "Courts are increasingly favoring collaborative parenting plans. Learn how these changes might affect your family situation.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      slug: "modern-approaches-to-child-custody-arrangements"
    },
    {
      id: 2,
      title: "Digital Assets in Your Estate Plan",
      category: "Estate Planning",
      date: "03 AUG 2025",
      content: "From cryptocurrency to online accounts, digital assets are becoming an important consideration in modern estate planning.",
      image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      slug: "digital-assets-in-your-estate-plan"
    },
    {
      id: 3,
      title: "Navigating Business Contracts in Uncertain Times",
      category: "Corporate Law",
      date: "15 JUL 2025",
      content: "The pandemic has changed how businesses approach contracts. Learn about force majeure clauses and other important considerations.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      slug: "navigating-business-contracts-in-uncertain-times"
    }
  ];

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Fetch featured blog posts from the backend
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/featured?limit=2`);
        
        // Transform the data to match our component's expected format
        const formattedPosts = response.data.map(post => ({
          id: post._id,
          title: post.title,
          category: post.category,
          date: formatDate(post.publishedAt),
          content: post.summary,
          image: post.image,
          slug: post.slug
        }));
        
        // Use fallback data if API returns empty results
        if (formattedPosts.length === 0) {
          setFeaturedPosts(getFallbackBlogs());
        } else {
          setFeaturedPosts(formattedPosts);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
        
        // Fallback to sample blog posts if API fails
        setFeaturedPosts(getFallbackBlogs());
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return (
    <section className="blogs-section section" id="blogs">
      <div className="container">
        <div className="section-header">
          <h2>Legal Insights</h2>
          <p className="subtitle">Expert Perspectives on Law</p>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <div className="featured-blog-cards">
            {featuredPosts.map(post => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-header">
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="blog-footer">
                    <div className="blog-date">
                      <span>{post.date}</span>
                    </div>
                    <a href={`/blogs/slug/${post.slug}`} className="read-more">Continue Reading <span>&rarr;</span></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="blogs-cta">
          <a href="/blogs" className="btn btn-primary">View All Articles</a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;