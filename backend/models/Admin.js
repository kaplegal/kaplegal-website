const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super-admin']
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to compare password
adminSchema.methods.comparePassword = async function(password) {
  console.log('comparePassword called with:', password);
  console.log('Stored hash:', this.passwordHash);
  const result = await bcrypt.compare(password, this.passwordHash);
  console.log('bcrypt.compare result:', result);
  return result;
};

// Static method to create admin with hashed password
adminSchema.statics.createAdmin = async function(username, password) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Create new admin
    const admin = new this({
      username,
      passwordHash
    });
    
    // Save and return admin
    return await admin.save();
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('Admin', adminSchema);
