import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const useFoodStore = create((set, get) => ({
  foods: [],
  loading: false,
  error: null,

  fetchFoods: async (filters = {}) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/foods?${params}`, getAuthHeader());
      set({ foods: response.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.error, loading: false });
    }
  },

  addFood: async (foodData) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${API_URL}/foods`, foodData, getAuthHeader());
      set(state => ({
        foods: [...state.foods, response.data],
        loading: false
      }));
      return response.data;
    } catch (err) {
      set({ error: err.response?.data?.error, loading: false });
      throw err;
    }
  },

  updateFood: async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/foods/${id}`, updates, getAuthHeader());
      set(state => ({
        foods: state.foods.map(f => f._id === id ? response.data : f)
      }));
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  deleteFood: async (id) => {
    try {
      await axios.delete(`${API_URL}/foods/${id}`, getAuthHeader());
      set(state => ({
        foods: state.foods.filter(f => f._id !== id)
      }));
    } catch (err) {
      throw err;
    }
  },

  scanReceipt: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await axios.post(`${API_URL}/foods/scan/image`, formData, {
        ...getAuthHeader(),
        headers: {
          ...getAuthHeader().headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.extractedItems;
    } catch (err) {
      throw err;
    }
  }
}));

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async (unreadOnly = false) => {
    set({ loading: true });
    try {
      const params = unreadOnly ? '?unreadOnly=true' : '';
      const response = await axios.get(`${API_URL}/notifications${params}`, getAuthHeader());
      const unreadCount = response.data.filter(n => !n.isRead).length;
      set({ notifications: response.data, unreadCount, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  markAsRead: async (notificationId) => {
    try {
      await axios.put(`${API_URL}/notifications/${notificationId}/read`, {}, getAuthHeader());
      set(state => ({
        notifications: state.notifications.map(n =>
          n._id === notificationId ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (err) {
      console.error(err);
    }
  },

  subscribeToPush: async (subscription) => {
    try {
      await axios.post(`${API_URL}/notifications/subscribe`, { subscription }, getAuthHeader());
    } catch (err) {
      console.error('Push subscription failed:', err);
    }
  }
}));

export const useDashboardStore = create((set) => ({
  stats: null,
  summary: null,
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`, getAuthHeader());
      set({ stats: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  fetchSummary: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/dashboard/summary`, getAuthHeader());
      set({ summary: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  }
}));

export const useDonationStore = create((set) => ({
  donations: [],
  charities: [],
  loading: false,

  fetchCharitiesNearby: async (latitude, longitude, radius = 5) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${API_URL}/donations/charities/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        getAuthHeader()
      );
      set({ charities: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  createDonation: async (foodItemId, charityId, quantity) => {
    try {
      const response = await axios.post(
        `${API_URL}/donations`,
        { foodItemId, charityId, quantity },
        getAuthHeader()
      );
      set(state => ({
        donations: [...state.donations, response.data]
      }));
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  fetchDonations: async () => {
    try {
      const response = await axios.get(`${API_URL}/donations`, getAuthHeader());
      set({ donations: response.data });
    } catch (err) {
      console.error(err);
    }
  }
}));

export const useSettingsStore = create((set) => ({
  settings: null,
  loading: false,

  fetchSettings: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/settings`, getAuthHeader());
      set({ settings: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  updateNotificationPreferences: async (preferences) => {
    try {
      const response = await axios.put(
        `${API_URL}/settings/notifications`,
        preferences,
        getAuthHeader()
      );
      set(state => ({
        settings: { ...state.settings, preferences: response.data.preferences }
      }));
    } catch (err) {
      throw err;
    }
  },

  updateLocation: async (address, latitude, longitude) => {
    try {
      const response = await axios.put(
        `${API_URL}/settings/location`,
        { address, latitude, longitude },
        getAuthHeader()
      );
      set(state => ({
        settings: { ...state.settings, location: response.data.location }
      }));
    } catch (err) {
      throw err;
    }
  }
}));
