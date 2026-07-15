const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'pantry', 'frozen', 'beverages', 'other'],
    default: 'other'
  },
  quantity: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    enum: ['pieces', 'kg', 'lb', 'liters', 'ml', 'cups', 'oz'],
    default: 'pieces'
  },
  expiryDate: {
    type: Date,
    required: true
  },
  addedDate: {
    type: Date,
    default: Date.now
  },
  purchaseDate: Date,
  imageUrl: String,
  location: {
    type: String,
    enum: ['fridge', 'freezer', 'pantry', 'counter', 'other'],
    default: 'fridge'
  },
  status: {
    type: String,
    enum: ['fresh', 'expiring_soon', 'expired', 'donated', 'used', 'discarded'],
    default: 'fresh'
  },
  notes: String,
  remindersSent: {
    type: [Date],
    default: []
  },
  donations: {
    isDonated: {
      type: Boolean,
      default: false
    },
    donatedDate: Date,
    charityId: mongoose.Schema.Types.ObjectId,
    charityName: String
  },
  aiSuggestions: [
    {
      title: String,
      description: String,
      recipe: String,
      ingredients: [String],
      instructions: [String],
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for frequently queried fields
foodItemSchema.index({ userId: 1, expiryDate: 1 });
foodItemSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('FoodItem', foodItemSchema);
