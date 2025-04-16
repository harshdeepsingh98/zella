import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.zella.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    // Add token to headers if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    const { response } = error;
    
    if (response && response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

// API Methods
export const apiClient = {
  // Auth Endpoints
  auth: {
    sendOtp: (mobileNumber) => api.post('/auth/send-otp', { mobileNumber }),
    verifyOtp: (mobileNumber, otp) => api.post('/auth/verify-otp', { mobileNumber, otp }),
    logout: () => api.post('/auth/logout'),
  },
  
  // User Profile Endpoints
  profile: {
    getProfile: () => api.get('/profile'),
    updateProfile: (data) => api.post('/profile/update', data),
  },
  
  // App Configuration
  app: {
    getConfig: () => api.get('/app/config'),
  },
};