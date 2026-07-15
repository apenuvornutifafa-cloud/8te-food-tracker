import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set, get) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ isAuthenticated: true, user, loading: false });
      return user;
    } catch (err) {
      const error = err.response?.data?.error || 'Login failed';
      set({ error, loading: false });
      throw new Error(error);
    }
  },

  signup: async (name, email, password, phone = '') => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        phone
      });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ isAuthenticated: true, user, loading: false });
      return user;
    } catch (err) {
      const error = err.response?.data?.error || 'Signup failed';
      set({ error, loading: false });
      throw new Error(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      set({ isAuthenticated: true, user: JSON.parse(user) });
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axios.put('/api/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ user: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Update failed');
    }
  }
}));
