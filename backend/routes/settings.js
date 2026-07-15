const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user settings
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('preferences location');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update notification preferences
router.put('/notifications', auth, async (req, res) => {
  try {
    const { 
      notificationsEnabled, 
      emailNotifications, 
      pushNotifications, 
      smsNotifications,
      reminderDays 
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'preferences.notificationsEnabled': notificationsEnabled,
        'preferences.emailNotifications': emailNotifications,
        'preferences.pushNotifications': pushNotifications,
        'preferences.smsNotifications': smsNotifications,
        'preferences.reminderDays': reminderDays || [30, 14, 7, 3]
      },
      { new: true }
    ).select('preferences');

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update location
router.put('/location', auth, async (req, res) => {
  try {
    const { address, latitude, longitude } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'location.address': address,
        'location.latitude': latitude,
        'location.longitude': longitude
      },
      { new: true }
    ).select('location');

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
