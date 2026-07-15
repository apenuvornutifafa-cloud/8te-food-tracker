const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a placeholder for reminders route
router.get('/', auth, (req, res) => {
  res.json({ message: 'Reminders endpoint' });
});

router.post('/', auth, (req, res) => {
  res.status(201).json({ message: 'Reminder created' });
});

module.exports = router;
