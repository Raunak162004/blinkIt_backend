// models/cart.js
const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema with validation
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });


// Joi Validation Function
const validateCart = (data) => {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(), // MongoDB ObjectId format
    products: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

module.exports = {
  cartModel: mongoose.model('cart', cartSchema),
  validateCart,
};
