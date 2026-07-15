/**
 * Utility functions for 8te application
 */

export const calculateDaysUntilExpiry = (expiryDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

export const getDaysUntilExpiryLabel = (expiryDate) => {
  const days = calculateDaysUntilExpiry(expiryDate);
  
  if (days < 0) return `Expired ${Math.abs(days)} days ago`;
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  if (days <= 7) return `Expires in ${days} days`;
  if (days <= 30) return `Expires in ${Math.floor(days / 7)} weeks`;
  return `Expires in ${Math.floor(days / 30)} months`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateWasteSavings = (donatedItems) => {
  // Simple calculation: average item weight * count
  const averageWeight = 0.5; // kg
  return (donatedItems * averageWeight).toFixed(2);
};

export const getCategoryEmoji = (category) => {
  const emojis = {
    fruits: '🍎',
    vegetables: '🥕',
    dairy: '🥛',
    meat: '🍗',
    bakery: '🍞',
    pantry: '🥫',
    frozen: '🧊',
    beverages: '🧃',
    other: '📦'
  };
  return emojis[category] || '📦';
};

export const getLocationEmoji = (location) => {
  const emojis = {
    fridge: '❄️',
    freezer: '🧊',
    pantry: '🗄️',
    counter: '🪑',
    other: '📍'
  };
  return emojis[location] || '📍';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const localStorage_get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return null;
  }
};

export const localStorage_set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
};
