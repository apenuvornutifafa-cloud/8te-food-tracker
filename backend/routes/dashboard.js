const express = require('express');
const auth = require('../middleware/auth');
const FoodItem = require('../models/FoodItem');
const Donation = require('../models/Donation');
const User = require('../models/User');

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Food items expiring soon (next 7 days)
    const expiringSoon = await FoodItem.countDocuments({
      userId: req.userId,
      expiryDate: {
        $gte: today,
        $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      },
      status: { $nin: ['donated', 'discarded'] }
    });

    // Expired items
    const expired = await FoodItem.countDocuments({
      userId: req.userId,
      expiryDate: { $lt: today },
      status: { $nin: ['donated', 'discarded'] }
    });

    // Total items
    const totalItems = await FoodItem.countDocuments({
      userId: req.userId,
      status: { $nin: ['donated', 'discarded'] }
    });

    // Get user stats
    const user = await User.findById(req.userId);

    // Donations this month
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthDonations = await Donation.countDocuments({
      userId: req.userId,
      createdAt: { $gte: monthStart }
    });

    res.json({
      totalItems,
      expiringSoon,
      expired,
      itemsDonated: user.stats.totalItemsDonated,
      monthlyDonations: monthDonations,
      estimatedWasteSaved: user.stats.estimatedWasteSaved
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get items for reminder - items expiring soon
router.get('/reminders-due', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const reminderDays = user.preferences.reminderDays || [30, 14, 7, 3];

    const items = [];
    for (const days of reminderDays) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + days);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const foodItems = await FoodItem.find({
        userId: req.userId,
        expiryDate: {
          $gte: targetDate,
          $lt: nextDay
        },
        status: { $nin: ['donated', 'discarded'] }
      });

      items.push(...foodItems);
    }

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get summary for dashboard
router.get('/summary', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const freshItems = await FoodItem.find({
      userId: req.userId,
      expiryDate: { $gt: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000) },
      status: 'fresh'
    }).select('name expiryDate category quantity unit');

    const expiringItems = await FoodItem.find({
      userId: req.userId,
      expiryDate: {
        $gte: today,
        $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      },
      status: 'expiring_soon'
    }).select('name expiryDate category quantity unit');

    const expiredItems = await FoodItem.find({
      userId: req.userId,
      expiryDate: { $lt: today },
      status: 'expired'
    }).limit(5).select('name expiryDate category quantity unit');

    const user = await User.findById(req.userId);

    res.json({
      freshItems,
      expiringItems,
      expiredItems,
      userStats: user.stats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
