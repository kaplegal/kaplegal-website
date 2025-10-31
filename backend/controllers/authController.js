const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Login with passkey
exports.login = async (req, res) => {
  try {
    const { passkey } = req.body;
    
    if (!passkey) {
      return res.status(400).json({ message: 'Passkey is required' });
    }
    
    // Find admin user (we expect only one admin in this simple system)
    const admin = await Admin.findOne({ username: 'admin' });
    
    // If no admin exists yet, create one with the default passkey
    if (!admin && passkey === process.env.DEFAULT_ADMIN_PASSKEY) {
      const newAdmin = await Admin.createAdmin('admin', passkey);
      
      // Generate token
      const token = jwt.sign(
        { id: newAdmin._id, role: newAdmin.role },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );
      
      // Update last login
      newAdmin.lastLogin = Date.now();
      await newAdmin.save();
      
      return res.status(200).json({
        message: 'Admin account created and authenticated',
        token
      });
    }
    
    // If admin exists, verify passkey
    if (admin) {
      const isMatch = await admin.comparePassword(passkey);
      
      if (isMatch) {
        // Generate token
        const token = jwt.sign(
          { id: admin._id, role: admin.role },
          JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRATION }
        );
        
        // Update last login
        admin.lastLogin = Date.now();
        await admin.save();
        
        return res.status(200).json({
          message: 'Authentication successful',
          token
        });
      }
    }
    
    // If we get here, authentication failed
    return res.status(401).json({ message: 'Invalid passkey' });
    
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Server error during authentication' });
  }
};

// Verify token middleware
exports.verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Change passkey
exports.changePasskey = async (req, res) => {
  try {
    const { currentPasskey, newPasskey } = req.body;
    
    if (!currentPasskey || !newPasskey) {
      return res.status(400).json({ message: 'Current and new passkeys are required' });
    }
    
    // Find admin user
    const admin = await Admin.findById(req.user.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Verify current passkey
    const isMatch = await admin.comparePassword(currentPasskey);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Current passkey is incorrect' });
    }
    
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash new passkey
    admin.passwordHash = await bcrypt.hash(newPasskey, salt);
    
    // Save admin with new passkey
    await admin.save();
    
    return res.status(200).json({ message: 'Passkey updated successfully' });
    
  } catch (error) {
    console.error('Change passkey error:', error);
    return res.status(500).json({ message: 'Server error during passkey change' });
  }
};

// Get current admin
exports.getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-passwordHash');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    return res.status(200).json(admin);
  } catch (error) {
    console.error('Get admin error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
