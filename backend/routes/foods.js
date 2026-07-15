const express = require('express');
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const sharp = require('sharp');
const Tesseract = require('tesseract.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Add new food item
router.post('/', auth, [
  body('name').notEmpty(),
  body('expiryDate').isISO8601(),
  body('category').optional().isIn(['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'pantry', 'frozen', 'beverages', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, expiryDate, quantity, unit, category, location, notes } = req.body;

    const foodItem = new FoodItem({
      userId: req.userId,
      name,
      expiryDate,
      quantity: quantity || 1,
      unit: unit || 'pieces',
      category: category || 'other',
      location: location || 'fridge',
      notes
    });

    await foodItem.save();

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.totalItemsAdded': 1 }
    });

    // Determine status based on expiry date
    const today = new Date();
    const daysUntilExpiry = Math.floor((new Date(expiryDate) - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      foodItem.status = 'expired';
    } else if (daysUntilExpiry <= 7) {
      foodItem.status = 'expiring_soon';
    }

    await foodItem.save();

    res.status(201).json(foodItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all food items for user
router.get('/', auth, async (req, res) => {
  try {
    const { status, category, sort } = req.query;
    
    let query = { userId: req.userId };
    
    if (status) query.status = status;
    if (category) query.category = category;

    let foodItems = await FoodItem.find(query);

    // Sort by expiry date by default
    if (sort === 'quantity') {
      foodItems.sort((a, b) => b.quantity - a.quantity);
    } else {
      foodItems.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    }

    res.json(foodItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single food item
router.get('/:id', auth, async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem || foodItem.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json(foodItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update food item
router.put('/:id', auth, async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem || foodItem.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const { name, expiryDate, quantity, unit, category, location, notes, status } = req.body;

    foodItem.name = name || foodItem.name;
    foodItem.expiryDate = expiryDate || foodItem.expiryDate;
    foodItem.quantity = quantity !== undefined ? quantity : foodItem.quantity;
    foodItem.unit = unit || foodItem.unit;
    foodItem.category = category || foodItem.category;
    foodItem.location = location || foodItem.location;
    foodItem.notes = notes || foodItem.notes;
    if (status) foodItem.status = status;
    foodItem.updatedAt = new Date();

    await foodItem.save();
    res.json(foodItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete food item
router.delete('/:id', auth, async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem || foodItem.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Scan receipt/photo to extract food items
router.post('/scan/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Process image with Tesseract OCR
    const { data: { text } } = await Tesseract.recognize(
      req.file.buffer,
      'eng'
    );

    // Parse text to extract potential food items (simplified - in production use AI)
    const items = text.split('\n').filter(line => line.trim().length > 0).slice(0, 5);

    res.json({
      extractedItems: items.map(item => ({
        name: item.trim(),
        category: 'other',
        quantity: 1,
        unit: 'pieces',
        estimatedExpiryDays: 7 // Default estimate
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

module.exports = router;
