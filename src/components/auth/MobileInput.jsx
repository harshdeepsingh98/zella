import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { verifyMobileNumber, setMobileNumber, resetAuthError } from '@features/auth/authSlice';
import { selectAuthLoading, selectAuthError } from '@features/auth/selectors';
import { selectMobileAuthText } from '@features/app/selectors';
import { Button, FormField, ErrorMessage } from '@components/common';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const FieldContainer = styled(Box)`
  margin-bottom: 24px;
`;

const HelperText = styled(Box)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette?.text?.secondary || '#5c5c5c'};
  margin-top: 8px;
`;

const MobileInput = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get texts from Redux store
  const pageText = useAppSelector(selectMobileAuthText);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  // Local state for mobile number
  const [number, setNumber] = useState('');
  const [inputError, setInputError] = useState('');

  // Handle input change
  const handleChange = e => {
    const value = e.target.value;

    // Only allow numeric input
    if (value === '' || /^[0-9]+$/.test(value)) {
      setNumber(value);

      if (inputError) {
        setInputError('');
      }

      if (error) {
        dispatch(resetAuthError());
      }
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    if (!number) {
      setInputError('Please enter your mobile number');
      return;
    }

    if (number.length !== 10) {
      setInputError(
        pageText?.error?.numberValidation || 'Please enter a valid 10-digit mobile number'
      );
      return;
    }

    try {
      // Dispatch action to verify mobile number
      const resultAction = await dispatch(verifyMobileNumber(number));

      // If verification is successful, store mobile number in Redux and navigate to OTP page
      if (verifyMobileNumber.fulfilled.match(resultAction)) {
        dispatch(setMobileNumber(number));
        navigate('/auth/otp');
      }
    } catch (err) {
      console.error('Failed to send OTP:', err);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FieldContainer>
          <FormField
            id="mobileNumber"
            type="text"
            label={pageText?.title || 'Mobile Number'}
            placeholder={pageText?.placeholder || 'Enter your mobile number'}
            value={number}
            onChange={handleChange}
            error={inputError}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              inputProps: {
                maxLength: 10,
                pattern: '[0-9]*',
              },
            }}
          />

          <HelperText>
            {pageText?.primaryFieldSubText || 'You will receive an SMS for OTP verification'}
          </HelperText>
        </FieldContainer>

        <ErrorMessage show={!!error}>{error}</ErrorMessage>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading || number.length !== 10}
        >
          {pageText?.primaryButton || 'Send OTP'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default MobileInput;
