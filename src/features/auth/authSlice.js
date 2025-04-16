import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';

// Async thunk for verifying mobile number
export const verifyMobileNumber = createAsyncThunk(
  'auth/verifyMobileNumber',
  async (mobileNumber, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.post('/auth/verify-mobile', { mobileNumber });
      // return response.data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Validate mobile number format (10 digits for India)
      const isValid = /^[0-9]{10}$/.test(mobileNumber);
      
      if (!isValid) {
        throw new Error('Invalid mobile number');
      }
      
      return { mobileNumber, success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ mobileNumber, otp }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.post('/auth/verify-otp', { mobileNumber, otp });
      // return response.data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo, let's assume any 6-digit OTP is valid
      const isValid = /^[0-9]{6}$/.test(otp);
      
      if (!isValid) {
        throw new Error('Invalid OTP');
      }
      
      return { 
        success: true,
        token: 'sample-auth-token-' + Math.random().toString(36).substring(2, 10),
        userId: 'user-' + Math.random().toString(36).substring(2, 10)
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  mobileNumber: '',
  verificationStatus: null, // 'pending', 'verified', 'failed'
  authToken: null,
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    resetAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.mobileNumber = '';
      state.verificationStatus = null;
      state.authToken = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Mobile verification
      .addCase(verifyMobileNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verificationStatus = 'pending';
      })
      .addCase(verifyMobileNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.mobileNumber = action.payload.mobileNumber;
        state.verificationStatus = 'initiated';
      })
      .addCase(verifyMobileNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verificationStatus = 'failed';
      })
      
      // OTP verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStatus = 'verified';
        state.authToken = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMobileNumber, resetAuthError, logout } = authSlice.actions;

export default authSlice.reducer;