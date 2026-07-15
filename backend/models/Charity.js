const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['food_bank', 'charity', 'shelter', 'community_center', 'ngo'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  website: String,
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  operatingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  description: String,
  acceptedItems: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  donationsReceived: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

charitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Charity', charitySchema);
