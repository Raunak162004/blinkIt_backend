const mongoose = require('mongoose');
const Joi = require('joi');

// Email regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mongoose Admin Schema with validation
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegex, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'superadmin'], // Optional: control roles
    lowercase: true,
    trim: true,
  },
});

// Joi Validation Function
const validateAdmin = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().pattern(emailRegex).required().messages({
      'string.pattern.base': 'Email must be a valid email address',
    }),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'superadmin').required(),
  });

  return schema.validate(data);
};

module.exports = {
  adminModel: mongoose.model('admin', adminSchema),
  validateAdmin,
};
