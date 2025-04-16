import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';

// This is a mock API call that will be replaced with a real API call
// Initially, we're using the pasted JSON data for mocking
const mockAppData = {
  app: {
    metadata: {
      name: 'ICICI Bank',
      description: 'Some description of app',
      logo: {
        lg: 'https://logo-url-lg.png',
        md: 'https://logo-url-md.png',
        sm: 'https://logo-url-sm.png',
      },
      language: 'en',
      theme: {
        colors: {
          primary: '',
          secondary: '',
          tertiary: '',
        },
      },
    },
    config: {
      pages: [
        {
          metadata: {
            name: 'Input Mobile Screen',
            code: 'auth-1',
            type: 'mobile-auth-screen',
            description: 'Random description',
            visibleLogo: true,
          },
          attributes: {
            text: {
              en: {
                title: 'Mobile Number',
                subText: 'Enter your mobile number to sign up',
                primaryFieldSubText: 'You will receive an SMS for OTP verification',
                primaryButton: 'Send OTP',
                error: {
                  numberValidation: 'Oops! It seems like number you entered is invalid.',
                },
              },
            },
          },
        },
        {
          metadata: {
            name: 'Verify OTP Screen',
            code: 'auth-2',
            type: 'mobile-verify-screen',
            description: 'Random description',
            visibleLogo: true,
          },
          attributes: {
            functional: {
              otpFieldSize: 6,
              otpResendTimer: 'PT60S',
            },
            text: {
              en: {
                title: 'Verify OTP',
                subText: 'We have sent an OTP to {{ mobile_number }}',
                resendCode: 'Send code again in {{ timer }}',
                wrongNumber: 'Entered wrong number?',
                primaryButton: 'Verify',
                error: {
                  OTPvalidation:
                    'The OTP entered is incorrect. Please check the code sent to your mobile and try again.',
                },
              },
            },
          },
        },
        {
          metadata: {
            name: 'Personal Information Screen',
            code: 'form-1',
            type: 'details-capture-screen',
            description: 'Random description',
            steps: 2,
            visibleLogo: true,
          },
          attributes: {
            functional: {
              form: {
                fields: [
                  {
                    id: 'random-id-1',
                    type: 'text',
                    required: true,
                    validations: [
                      {
                        id: 'validation-1',
                        type: 'greaterThanLength',
                        value: 5,
                      },
                      {
                        id: 'validation-2',
                        type: 'lessThanLength',
                        value: 10,
                      },
                      {
                        id: 'validation-3',
                        type: 'regex',
                        value: 'randomRegex',
                      },
                    ],
                  },
                  {
                    id: 'random-id-2',
                    type: 'number',
                    prefix: '+91',
                    required: true,
                    validations: [
                      {
                        id: 'validation-4',
                        type: 'greaterThanLength',
                        value: 1,
                      },
                      {
                        id: 'validation-5',
                        type: 'lessThanLength',
                        value: 10,
                      },
                    ],
                  },
                  {
                    id: 'random-id-3',
                    type: 'multi-select',
                    required: true,
                    options: [
                      {
                        label: 'Lorem Ipsum Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Lorem Ipsum Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Lorem Ipsum Option 2',
                        value: 'option-2',
                      },
                    ],
                  },
                  {
                    id: 'random-id-4',
                    type: 'select',
                    required: true,
                    options: [
                      {
                        label: 'Lorem Ipsum Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Lorem Ipsum Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Lorem Ipsum Option 2',
                        value: 'option-2',
                      },
                    ],
                  },
                  {
                    id: 'random-id-5',
                    type: 'radio',
                    required: true,
                    options: [
                      {
                        label: 'Lorem Ipsum Option 1',
                        value: 'option-1',
                      },
                      {
                        label: 'Lorem Ipsum Option 2',
                        value: 'option-2',
                      },
                      {
                        label: 'Lorem Ipsum Option 2',
                        value: 'option-2',
                      },
                    ],
                  },
                ],
              },
            },
            text: {
              en: {
                title: 'Personal Information',
                subText:
                  'Provide extra details to personalize your experience and enhance your profile.',
                resendCode: 'Send code again in {{ timer }}',
                wrongNumber: 'Entered wrong number?',
                primaryButton: 'Next',
                form: {
                  'random-id-1': {
                    title: 'Full Name',
                    placeholder: 'Enter your full name',
                    validation: {
                      'validation-1': {
                        message: 'String is greater than {{ value }}',
                      },
                      'validation-2': {
                        message: 'String is lesser than {{ value }}',
                      },
                      'validation-3': {
                        message: 'The {{ field_title }} is not valid',
                      },
                    },
                  },
                  'random-id-2': {
                    title: 'Mobile Number',
                    placeholder: 'Enter your mobile number',
                    validation: {
                      'validation-4': {
                        message: 'Number is greater than {{ value }}',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
};

// Async thunk to fetch app data
export const fetchAppData = createAsyncThunk('app/fetchAppData', async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // const response = await api.get('/app-config');
    // return response.data;

    // For now, we're using the mock data
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAppData;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const initialState = {
  data: null,
  loading: false,
  error: null,
  currentLanguage: 'en',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAppData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAppData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLanguage } = appSlice.actions;

export default appSlice.reducer;
