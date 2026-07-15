/**
 * 8te - Food Expiry Tracking Application
 * 
 * This is a comprehensive web application designed to help users:
 * - Track food expiry dates
 * - Reduce food waste
 * - Get smart reminders and AI suggestions
 * - Donate items to charities
 * - Monitor their environmental impact
 */

export const APP_CONFIG = {
  name: '8te',
  version: '1.0.0',
  tagline: 'Track Food, Save Waste',
  
  colors: {
    primary: '#FFD700',     // Yellow
    dark: '#1a1a1a',        // Black
    light: '#f5f5f5',       // Light gray
    success: '#10b981',     // Green
    warning: '#f59e0b',     // Amber
    danger: '#ef4444'       // Red
  },

  categories: [
    'fruits',
    'vegetables',
    'dairy',
    'meat',
    'bakery',
    'pantry',
    'frozen',
    'beverages',
    'other'
  ],

  locations: [
    'fridge',
    'freezer',
    'pantry',
    'counter',
    'other'
  ],

  units: [
    'pieces',
    'kg',
    'lb',
    'liters',
    'ml',
    'cups',
    'oz'
  ],

  reminderDays: [30, 14, 7, 3],

  foodStatus: {
    FRESH: 'fresh',
    EXPIRING_SOON: 'expiring_soon',
    EXPIRED: 'expired',
    DONATED: 'donated',
    USED: 'used',
    DISCARDED: 'discarded'
  },

  notificationTypes: {
    REMINDER: 'reminder',
    EXPIRING_SOON: 'expiring_soon',
    EXPIRED: 'expired',
    DONATION_SUGGESTION: 'donation_suggestion',
    RECIPE_SUGGESTION: 'recipe_suggestion',
    DONATION_CONFIRMED: 'donation_confirmed'
  },

  charityTypes: [
    'food_bank',
    'charity',
    'shelter',
    'community_center',
    'ngo'
  ],

  donationStatus: [
    'scheduled',
    'delivered',
    'cancelled'
  ],

  // Freshness determination logic
  getFreshnessStatus: (expiryDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 7) return 'expiring_soon';
    return 'fresh';
  },

  // Format days remaining
  formatDaysRemaining: (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  }
};

export default APP_CONFIG;
