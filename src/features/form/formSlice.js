import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';

// Async thunk for submitting form data
export const submitFormData = createAsyncThunk(
  'form/submitFormData',
  async (formData, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await api.post('/profile/update', formData);
      // return response.data;

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, validate required fields
      const requiredFields = ['fullName', 'mobileNumber'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`Field ${field} is required`);
        }
      }
      
      return { 
        success: true,
        profile: {
          ...formData,
          id: 'profile-' + Math.random().toString(36).substring(2, 10)
        }
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  formData: {},
  currentStep: 1,
  totalSteps: 2,
  isCompleted: false,
  loading: false,
  error: null,
  validationErrors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData = {
        ...state.formData,
        [field]: value,
      };
      
      // Clear validation error for this field if any
      if (state.validationErrors[field]) {
        state.validationErrors = {
          ...state.validationErrors,
          [field]: null,
        };
      }
    },
    setValidationError: (state, action) => {
      const { field, error } = action.payload;
      state.validationErrors = {
        ...state.validationErrors,
        [field]: error,
      };
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setTotalSteps: (state, action) => {
      state.totalSteps = action.payload;
    },
    resetForm: (state) => {
      state.formData = {};
      state.currentStep = 1;
      state.isCompleted = false;
      state.error = null;
      state.validationErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.loading = false;
        state.isCompleted = true;
        state.formData = action.payload.profile;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateFormField,
  setValidationError,
  nextStep,
  prevStep,
  setTotalSteps,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;