import { STORAGE_KEYS } from '@config/constants';

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// Authentication helpers
export const auth = {
  getToken: () => storage.get(STORAGE_KEYS.AUTH_TOKEN),
  
  setToken: (token) => storage.set(STORAGE_KEYS.AUTH_TOKEN, token),
  
  removeToken: () => storage.remove(STORAGE_KEYS.AUTH_TOKEN),
  
  isAuthenticated: () => !!storage.get(STORAGE_KEYS.AUTH_TOKEN),
  
  getUserId: () => storage.get(STORAGE_KEYS.USER_ID),
  
  setUserId: (userId) => storage.set(STORAGE_KEYS.USER_ID, userId),
  
  logout: () => {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_ID);
  },
};

// Language helpers
export const language = {
  getLanguage: () => storage.get(STORAGE_KEYS.LANGUAGE) || 'en',
  
  setLanguage: (lang) => storage.set(STORAGE_KEYS.LANGUAGE, lang),
};

// Debounce function
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

// Generate random ID
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error('Error cloning object:', error);
    return obj;
  }
};