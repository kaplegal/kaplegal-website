const Blog = require('../models/Blog');

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// Get all published blogs (public)
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .select('title slug category summary image publishedAt');
    
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get featured blogs for homepage (public)
exports.getFeaturedBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    
    console.log('Fetching featured blogs with limit:', limit);
    
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('title slug category summary image publishedAt');
    
    console.log('Found blogs:', blogs.length);
    
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error in getFeaturedBlogs:', error);
    res.status(500).json({ message: 'Error fetching featured blogs', error: error.message });
  }
};

// Get a single blog by slug (public)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Get all blogs (admin)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get a single blog by ID (admin)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, category, content, summary, image, author, isPublished } = req.body;
    
    if (!title || !category || !content || !summary || !image) {
      return res.status(400).json({ message: 'Title, category, content, summary and image are required' });
    }
    
    // Create a slug from the title
    let slug = createSlug(title);
    
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      // Add a timestamp to make the slug unique
      slug = `${slug}-${Date.now()}`;
    }
    
    const newBlog = new Blog({
      title,
      slug,
      category,
      content,
      summary,
      image,
      author: author || 'KAP LEGAL LLP',
      isPublished: isPublished !== undefined ? isPublished : true
    });
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, category, content, summary, image, author, isPublished } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Update fields if provided
    if (title) {
      blog.title = title;
      
      // Update slug if title changes
      let newSlug = createSlug(title);
      
      // Check if new slug already exists (excluding current blog)
      const existingBlog = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
      if (existingBlog) {
        // Add a timestamp to make the slug unique
        newSlug = `${newSlug}-${Date.now()}`;
      }
      
      blog.slug = newSlug;
    }
    
    if (category) blog.category = category;
    if (content) blog.content = content;
    if (summary) blog.summary = summary;
    if (image) blog.image = image;
    if (author) blog.author = author;
    if (isPublished !== undefined) blog.isPublished = isPublished;
    
    // Update the updatedAt field
    blog.updatedAt = Date.now();
    
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};
