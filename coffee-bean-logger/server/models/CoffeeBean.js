const mongoose = require('mongoose');

const coffeeBeanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    value: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: ['oz', 'g', 'lb', 'kg'],
      default: 'oz'
    }
  },
  flavorProfile: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Index for search functionality
coffeeBeanSchema.index({ brand: 'text', origin: 'text', flavorProfile: 'text' });

module.exports = mongoose.model('CoffeeBean', coffeeBeanSchema);