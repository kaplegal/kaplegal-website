const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/me', authController.verifyToken, authController.getCurrentAdmin);
router.post('/change-passkey', authController.verifyToken, authController.changePasskey);

module.exports = router;
