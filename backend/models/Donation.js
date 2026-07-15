const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem',
    required: true
  },
  charityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity',
    required: true
  },
  quantity: Number,
  unit: String,
  status: {
    type: String,
    enum: ['scheduled', 'delivered', 'cancelled'],
    default: 'scheduled'
  },
  scheduledDate: Date,
  deliveredDate: Date,
  notes: String,
  impactEstimate: {
    itemsCount: Number,
    estimatedValue: Number // in currency units
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

donationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Donation', donationSchema);
