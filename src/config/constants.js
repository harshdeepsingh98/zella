// App Constants
export const APP_NAME = 'Zella';
export const APP_DESCRIPTION = 'Take control of your credentials!';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile/update',
  },
  APP: {
    CONFIG: '/app/config',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'zella-auth-token',
  USER_ID: 'zella-user-id',
  LANGUAGE: 'zella-language',
};

// Validation Rules
export const VALIDATION = {
  MOBILE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^[0-9]{10}$/,
  },
  OTP: {
    LENGTH: 6,
    PATTERN: /^[0-9]{6}$/,
  },
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    MOBILE: '/auth/mobile',
    OTP: '/auth/otp',
    PERSONAL_INFO: '/auth/personal-info',
  },
};