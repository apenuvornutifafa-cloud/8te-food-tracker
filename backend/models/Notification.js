const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem'
  },
  type: {
    type: String,
    enum: ['reminder', 'expiring_soon', 'expired', 'donation_suggestion', 'recipe_suggestion', 'donation_confirmed'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  actionUrl: String,
  isRead: {
    type: Boolean,
    default: false
  },
  deliveryMethod: {
    type: [String],
    enum: ['push', 'email', 'sms'],
    default: ['push']
  },
  deliveryStatus: {
    push: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending'
    },
    email: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending'
    },
    sms: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  readAt: Date,
  sentAt: Date
});

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
