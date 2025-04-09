const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema with validation
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
}, { timestamps: true });

// Joi Validation Function
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(data);
};

module.exports = {
  categoryModel: mongoose.model('category', categorySchema),
  validateCategory,
};
