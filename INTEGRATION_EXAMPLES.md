// Example integration of reminder service in server.js

// Add this to backend/server.js after creating the Express app:

/*
// Import reminder service
const { scheduleReminders } = require('./services/reminderService');

// Start reminder scheduler
scheduleReminders();

// Example: Manual reminder trigger endpoint (for testing)
app.post('/api/test/send-reminder', auth, async (req, res) => {
  try {
    const { foodItemId } = req.body;
    const foodItem = await FoodItem.findById(foodItemId);
    
    if (!foodItem || foodItem.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const user = await User.findById(req.userId);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((new Date(foodItem.expiryDate) - today) / (1000 * 60 * 60 * 24));

    // Send test reminder
    const { sendReminderEmail, sendReminderSMS, createNotification } = require('./services/reminderService');
    
    if (user.preferences.emailNotifications) {
      await sendReminderEmail(user, foodItem, daysUntilExpiry);
    }
    if (user.preferences.smsNotifications) {
      await sendReminderSMS(user, foodItem, daysUntilExpiry);
    }
    
    const notification = await createNotification(
      req.userId,
      'reminder',
      `${foodItem.name} expires in ${daysUntilExpiry} days`,
      `Your ${foodItem.name} will expire soon!`,
      foodItemId
    );

    res.json({ message: 'Test reminder sent', notification });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send test reminder' });
  }
});
*/

// Example: Generate AI suggestions endpoint

/*
app.post('/api/foods/:id/ai-suggestions', auth, async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (!foodItem || foodItem.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const { generateRecipeSuggestions } = require('./services/aiService');
    const suggestions = await generateRecipeSuggestions(
      foodItem.name,
      foodItem.quantity,
      foodItem.unit
    );

    if (suggestions) {
      foodItem.aiSuggestions = suggestions;
      await foodItem.save();
    }

    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});
*/

// Example: Frontend integration

/*
// In a React component

import { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeSuggestions({ foodId }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `/api/foods/${foodId}/ai-suggestions`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setSuggestions(response.data.suggestions || []);
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [foodId]);

  return (
    <div>
      {loading && <p>Loading suggestions...</p>}
      {suggestions.map((recipe, idx) => (
        <div key={idx} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <ol>
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default RecipeSuggestions;
*/

// Example: Push notification setup on frontend

/*
// In App.jsx or main initialization file

import { useEffect } from 'react';
import { registerServiceWorker, requestNotificationPermission, subscribeToPushNotifications } from './utils/notifications';
import { useNotificationStore } from './store/foodStore';

export function setupNotifications() {
  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Request notification permission
    requestNotificationPermission().then(granted => {
      if (granted) {
        // Subscribe to push notifications
        subscribeToPushNotifications().then(subscription => {
          if (subscription) {
            // Send subscription to backend
            const { subscribeToPush } = useNotificationStore.getState();
            subscribeToPush(subscription);
          }
        });
      }
    });
  }, []);
}
*/

module.exports = {
  // Placeholder for integration examples
};
