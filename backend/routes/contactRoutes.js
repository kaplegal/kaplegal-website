const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public routes
router.post('/submit', contactController.submitContactForm);

// Admin routes
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContact);
router.put('/:id/status', contactController.updateContactStatus);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
