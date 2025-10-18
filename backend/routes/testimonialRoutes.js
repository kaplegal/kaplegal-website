const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Public routes
router.get('/active', testimonialController.getActiveTestimonials);

// Admin routes
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonial);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
