const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Payment Schema
const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  method: {
    type: String,
    required: true,
    // enum: ['credit card', 'debit card', 'UPI', 'cash', 'wallet'],
    lowercase: true,
    trim: true,
  },
  status: {
    type: String,
    // enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
    lowercase: true,
    trim: true,
    required: true,
  },
  transactionId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
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
const validatePayment = (data) => {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),
    amount: Joi.number().min(0).required(),
    method: Joi.string().required(),
    status: Joi.string().optional(),
    transactionId: Joi.string().min(4).max(100).required(),
    products: Joi.array()
      .items(Joi.string().hex().length(24))
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

module.exports = {
  paymentModel: mongoose.model('payment', paymentSchema),
  validatePayment,
};
