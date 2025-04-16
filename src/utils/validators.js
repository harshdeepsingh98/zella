import { VALIDATION } from '@config/constants';

// Validate mobile number
export const validateMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return false;
  
  // Check if it's a string
  if (typeof mobileNumber !== 'string') {
    mobileNumber = String(mobileNumber);
  }
  
  // Remove any spaces or special characters
  mobileNumber = mobileNumber.replace(/\s+/g, '');
  
  // Check if it matches the pattern
  return VALIDATION.MOBILE.PATTERN.test(mobileNumber);
};

// Validate OTP
export const validateOtp = (otp) => {
  if (!otp) return false;
  
  // Check if it's a string
  if (typeof otp !== 'string') {
    otp = String(otp);
  }
  
  // Remove any spaces
  otp = otp.replace(/\s+/g, '');
  
  // Check if it matches the pattern
  return VALIDATION.OTP.PATTERN.test(otp);
};

// Validate name
export const validateName = (name) => {
  if (!name) return false;
  
  // Check if it's a string
  if (typeof name !== 'string') return false;
  
  // Trim the name
  name = name.trim();
  
  // Check length
  if (name.length < VALIDATION.NAME.MIN_LENGTH || name.length > VALIDATION.NAME.MAX_LENGTH) {
    return false;
  }
  
  return true;
};

// Validate email
export const validateEmail = (email) => {
  if (!email) return false;
  
  // Check if it's a string
  if (typeof email !== 'string') return false;
  
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
};

// Generic field length validator
export const validateFieldLength = (value, minLength, maxLength) => {
  if (!value) return minLength === 0;
  
  // Check if it's a string
  if (typeof value !== 'string') {
    value = String(value);
  }
  
  // Check length
  const length = value.trim().length;
  
  if (minLength !== undefined && length < minLength) {
    return false;
  }
  
  if (maxLength !== undefined && length > maxLength) {
    return false;
  }
  
  return true;
};

// Validate by type
export const validateByType = (value, type, options = {}) => {
  switch (type) {
    case 'mobileNumber':
      return validateMobileNumber(value);
      
    case 'otp':
      return validateOtp(value);
      
    case 'name':
      return validateName(value);
      
    case 'email':
      return validateEmail(value);
      
    case 'text':
      return validateFieldLength(value, options.minLength, options.maxLength);
      
    default:
      return true;
  }
};