const express = require('express');
const Donation = require('../models/Donation');
const Charity = require('../models/Charity');
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get nearby charities/food banks
router.get('/charities/nearby', auth, async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Location coordinates required' });
    }

    const charities = await Charity.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    });

    res.json(charities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all charities
router.get('/charities', auth, async (req, res) => {
  try {
    const charities = await Charity.find().limit(50);
    res.json(charities);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a donation
router.post('/', auth, async (req, res) => {
  try {
    const { foodItemId, charityId, quantity, scheduledDate } = req.body;

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem || foodItem.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const donation = new Donation({
      userId: req.userId,
      foodItemId,
      charityId,
      quantity: quantity || foodItem.quantity,
      unit: foodItem.unit,
      scheduledDate: scheduledDate || new Date(),
      impactEstimate: {
        itemsCount: quantity || foodItem.quantity
      }
    });

    await donation.save();

    // Update food item status
    await FoodItem.findByIdAndUpdate(foodItemId, {
      status: 'donated',
      'donations.isDonated': true,
      'donations.donatedDate': new Date(),
      'donations.charityId': charityId
    });

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.totalItemsDonated': 1 }
    });

    // Increment charity donations received
    await Charity.findByIdAndUpdate(charityId, {
      $inc: { donationsReceived: 1 }
    });

    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get donations for user
router.get('/', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.userId })
      .populate('charityId')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update donation status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status,
        deliveredDate: status === 'delivered' ? new Date() : undefined,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!donation || donation.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
