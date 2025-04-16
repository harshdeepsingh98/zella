// Basic selectors
export const selectMobileNumber = (state) => state.auth.mobileNumber;
export const selectVerificationStatus = (state) => state.auth.verificationStatus;
export const selectAuthToken = (state) => state.auth.authToken;
export const selectUserId = (state) => state.auth.userId;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Derived selectors
export const selectFormattedMobileNumber = (state) => {
  const mobileNumber = selectMobileNumber(state);
  if (!mobileNumber) return '';
  
  // Format: +91 98765 43210
  if (mobileNumber.length === 10) {
    return `+91 ${mobileNumber.substring(0, 5)} ${mobileNumber.substring(5)}`;
  }
  
  return `+91 ${mobileNumber}`;
};

export const selectCanResendOtp = (state) => {
  // Logic to determine if user can resend OTP based on timer or attempts
  return true; // Simplified for now
};