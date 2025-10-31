const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken } = require('../controllers/authController');

// Public routes
router.get('/published', blogController.getPublishedBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/slug/:slug', blogController.getBlogBySlug);

// Admin routes (protected)
router.get('/', verifyToken, blogController.getAllBlogs);
router.get('/:id', verifyToken, blogController.getBlogById);
router.post('/', verifyToken, blogController.createBlog);
router.put('/:id', verifyToken, blogController.updateBlog);
router.delete('/:id', verifyToken, blogController.deleteBlog);

module.exports = router;
