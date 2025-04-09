const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema with validation
const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: true,
  },
  deliveryBoy: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['pending', 'in transit', 'delivered', 'cancelled'],
    required: true,
    lowercase: true,
    trim: true,
  },
  trackingURL: {
    type: String,
    trim: true,
  },
  estimatedDeliveryTime: {
    type: Number,
    min: 0,
  },
  totalPrice: {
    type: Number,
    min: 0,
  },
}, { timestamps: true });

// Joi Validation Function
const validateDelivery = (data) => {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),
    deliveryBoy: Joi.string().min(2).max(100).required(),
    status: Joi.string()
      .valid('pending', 'in transit', 'delivered', 'cancelled')
      .required(),
    trackingURL: Joi.string().uri().optional().allow(''),
    estimatedDeliveryTime: Joi.number().min(0).optional(),
    totalPrice: Joi.number().min(0).optional(),
  });

  return schema.validate(data);
};

module.exports = {
  deliveryModel: mongoose.model('delivery', deliverySchema),
  validateDelivery,
};
