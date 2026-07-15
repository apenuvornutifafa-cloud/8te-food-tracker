/**
 * Notification scheduler and reminder system
 * This runs on the backend to send reminders at specified intervals
 */

const cron = require('node-cron');
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Initialize email service
const emailService = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

// Initialize Twilio (for SMS)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send reminder emails
const sendReminderEmail = async (user, foodItem, daysUntilExpiry) => {
  const subject = `🍎 ${foodItem.name} expires in ${daysUntilExpiry} days!`;
  const html = `
    <h2>Hey ${user.name}!</h2>
    <p>Your <strong>${foodItem.name}</strong> will expire in <strong>${daysUntilExpiry} days</strong>!</p>
    <p>Location: ${foodItem.location}</p>
    <p>Quantity: ${foodItem.quantity} ${foodItem.unit}</p>
    <a href="${process.env.CLIENT_URL}/food/${foodItem._id}" style="background-color: #FFD700; color: #1a1a1a; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      View Details
    </a>
  `;

  try {
    await emailService.sendMail({
      from: process.env.GMAIL_USER,
      to: user.email,
      subject,
      html
    });
    return true;
  } catch (err) {
    console.error('Email sending failed:', err);
    return false;
  }
};

// Send SMS reminders
const sendReminderSMS = async (user, foodItem, daysUntilExpiry) => {
  if (!user.phone) return false;

  const message = `8te: Your ${foodItem.name} expires in ${daysUntilExpiry} days! Check your pantry: ${process.env.CLIENT_URL}`;

  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: user.phone
    });
    return true;
  } catch (err) {
    console.error('SMS sending failed:', err);
    return false;
  }
};

// Send push notifications
const sendPushNotification = async (user, foodItem, daysUntilExpiry) => {
  if (!user.pushSubscription) return false;

  // This would integrate with Firebase Cloud Messaging or Web Push API
  // Implementation depends on your push notification service
  console.log('Push notification would be sent here');
  return true;
};

// Create in-app notification
const createNotification = async (userId, type, title, message, foodItemId = null) => {
  try {
    const notification = new Notification({
      userId,
      foodItemId,
      type,
      title,
      message
    });
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Notification creation failed:', err);
    return null;
  }
};

// Main reminder scheduler
const scheduleReminders = () => {
  // Run every day at 9 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('Running reminder scheduler...');

    try {
      // Get all users
      const users = await User.find();

      for (const user of users) {
        if (!user.preferences.notificationsEnabled) continue;

        const reminderDays = user.preferences.reminderDays || [30, 14, 7, 3];

        // Check for each reminder interval
        for (const days of reminderDays) {
          const targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + days);
          targetDate.setHours(0, 0, 0, 0);

          const nextDay = new Date(targetDate);
          nextDay.setDate(nextDay.getDate() + 1);

          // Find items expiring on this date
          const items = await FoodItem.find({
            userId: user._id,
            expiryDate: {
              $gte: targetDate,
              $lt: nextDay
            },
            status: { $nin: ['donated', 'discarded'] }
          });

          for (const item of items) {
            // Check if reminder already sent today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const alreadySent = item.remindersSent?.some(date => {
              const sentDate = new Date(date);
              sentDate.setHours(0, 0, 0, 0);
              return sentDate.getTime() === today.getTime();
            });

            if (alreadySent) continue;

            const title = `${item.name} expires in ${days} days`;
            const message = `Your ${item.name} (${item.quantity} ${item.unit}) in the ${item.location} will expire in ${days} days!`;

            // Send notifications
            if (user.preferences.emailNotifications) {
              await sendReminderEmail(user, item, days);
            }
            if (user.preferences.smsNotifications) {
              await sendReminderSMS(user, item, days);
            }
            if (user.preferences.pushNotifications) {
              await sendPushNotification(user, item, days);
            }

            // Create in-app notification
            await createNotification(user._id, 'reminder', title, message, item._id);

            // Mark as sent
            item.remindersSent.push(new Date());
            await item.save();
          }
        }
      }
    } catch (err) {
      console.error('Reminder scheduler error:', err);
    }
  });

  console.log('Reminder scheduler initialized');
};

module.exports = {
  scheduleReminders,
  sendReminderEmail,
  sendReminderSMS,
  sendPushNotification,
  createNotification
};
