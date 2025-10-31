const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { verifyToken } = require('../controllers/authController');

// Public routes
router.get('/active', testimonialController.getActiveTestimonials);

// Admin routes (protected)
router.get('/', verifyToken, testimonialController.getAllTestimonials);
router.get('/:id', verifyToken, testimonialController.getTestimonial);
router.post('/', verifyToken, testimonialController.createTestimonial);
router.put('/:id', verifyToken, testimonialController.updateTestimonial);
router.delete('/:id', verifyToken, testimonialController.deleteTestimonial);

module.exports = router;
