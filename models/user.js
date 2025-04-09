// models/user.js
const mongoose = require('mongoose');
const Joi = require('joi');

// Email Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mongoose Address Sub-Schema
const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: Number,
    required: true,
    min: 10000,
    max: 999999,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

// Mongoose User Schema with regex and built-in validation
const userSchema = new mongoose.Schema(
  {
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
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: [addressSchema],
      required: true,
      validate: [arrayLimit, '{PATH} must have at least one address'],
    },
  },
  { timestamps: true }
);

// Address array validator
function arrayLimit(val) {
  return val.length > 0;
}

// Joi Validation Function
const validateUser = (data) => {
  const addressJoiSchema = Joi.object({
    state: Joi.string().required(),
    zip: Joi.number().min(10000).max(999999).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
  });

  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().pattern(emailRegex).required().messages({
      'string.pattern.base': 'Email must be a valid email address',
    }),
    password: Joi.string().min(6).required(),
    phone: Joi.number().required(),
    address: Joi.array().items(addressJoiSchema).min(1).required(),
  });

  return schema.validate(data);
};

module.exports = {
  userModel: mongoose.model('user', userSchema),
  validateUser,
};
