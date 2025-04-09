const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Product Schema with validation
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

// Joi Validation Function
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(2).max(100).required(),
    stock: Joi.boolean().required(),
    description: Joi.string().optional().allow(''),
    image: Joi.string().uri().optional().allow(''),
  });

  return schema.validate(data);
};

module.exports = {
  productModel: mongoose.model('product', productSchema),
  validateProduct,
};
