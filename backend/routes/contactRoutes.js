const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../controllers/authController');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public routes (with rate limiting)
router.post('/submit', contactLimiter, contactController.submitContactForm);

// Admin routes (protected)
router.get('/', verifyToken, contactController.getAllContacts);
router.get('/:id', verifyToken, contactController.getContact);
router.put('/:id/status', verifyToken, contactController.updateContactStatus);
router.delete('/:id', verifyToken, contactController.deleteContact);

module.exports = router;
