import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Box, Typography, TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { verifyOtp, resetAuthError, verifyMobileNumber } from '@features/auth/authSlice';
import {
  selectAuthLoading,
  selectAuthError,
  selectMobileNumber,
  selectFormattedMobileNumber,
} from '@features/auth/selectors';
import { selectOtpVerifyText, selectOtpFieldSize } from '@features/app/selectors';
import { Button, ErrorMessage } from '@components/common';

const OtpContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

const InputsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 24px 0;
`;

const OtpInput = styled(TextField)`
  width: 48px;
  height: 48px;

  .MuiOutlinedInput-root {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    text-align: center;

    input {
      text-align: center;
      padding: 14px 8px;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

const ResendContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const ResendText = styled(Typography)`
  color: ${({ theme }) => theme.palette?.text?.secondary || '#5c5c5c'};
  font-size: 14px;
`;

const ResendLink = styled(Link)`
  color: ${({ theme, active }) =>
    active ? theme.palette?.primary?.main : theme.palette?.text?.secondary || '#5c5c5c'};
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  text-decoration: none;

  &:hover {
    text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  }
`;

const WrongNumberLink = styled(Link)`
  color: ${({ theme }) => theme.palette?.primary?.main || '#33A54A'};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get data from Redux store
  const pageText = useAppSelector(selectOtpVerifyText);
  const otpLength = useAppSelector(selectOtpFieldSize);
  const mobileNumber = useAppSelector(selectMobileNumber);
  const formattedMobileNumber = useAppSelector(selectFormattedMobileNumber);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  // Local state
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // Set up refs for OTP inputs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otpLength);
  }, [otpLength]);

  // Timer for resending OTP
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Handle OTP input change
  const handleChange = (index, e) => {
    const value = e.target.value;

    // Only allow numeric input
    if (value === '' || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input field
      if (value && index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (error) {
        dispatch(resetAuthError());
      }
    }
  };

  // Handle key press
  const handleKeyDown = (index, e) => {
    // Navigate to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = e => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Only allow numeric input
    if (/^[0-9]+$/.test(pastedData)) {
      const pastedOtp = pastedData.split('').slice(0, otpLength);
      const newOtp = [...otp];

      pastedOtp.forEach((digit, index) => {
        if (index < otpLength) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);

      // Focus last input or the next empty input
      const focusIndex = Math.min(pastedOtp.length, otpLength - 1);
      inputRefs.current[focusIndex].focus();
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    const otpValue = otp.join('');

    if (otpValue.length !== otpLength) {
      return;
    }

    try {
      // Dispatch action to verify OTP
      const resultAction = await dispatch(verifyOtp({ mobileNumber, otp: otpValue }));

      // If verification is successful, navigate to personal info page
      if (verifyOtp.fulfilled.match(resultAction)) {
        navigate('/auth/personal-info');
      }
    } catch (err) {
      console.error('Failed to verify OTP:', err);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend) return;

    try {
      await dispatch(verifyMobileNumber(mobileNumber));
      setResendTimer(60);
      setCanResend(false);
      setOtp(Array(otpLength).fill(''));
      inputRefs.current[0].focus();
    } catch (err) {
      console.error('Failed to resend OTP:', err);
    }
  };

  // Handle wrong number
  const handleWrongNumber = () => {
    navigate('/auth/mobile');
  };

  return (
    <OtpContainer>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <InputsContainer>
          {Array(otpLength)
            .fill(0)
            .map((_, index) => (
              <OtpInput
                key={index}
                inputRef={el => (inputRefs.current[index] = el)}
                variant="outlined"
                value={otp[index]}
                onChange={e => handleChange(index, e)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                inputProps={{
                  maxLength: 1,
                  inputMode: 'numeric',
                  pattern: '[0-9]',
                  autoComplete: 'one-time-code',
                }}
                autoFocus={index === 0}
              />
            ))}
        </InputsContainer>

        <ResendContainer>
          <ResendText variant="body2">
            {canResend
              ? pageText?.resendCode?.replace('{{ timer }}', '0')
              : pageText?.resendCode?.replace('{{ timer }}', `${resendTimer}s`)}
          </ResendText>
          {canResend && (
            <ResendLink
              component="button"
              type="button"
              active={canResend}
              onClick={handleResend}
              underline="none"
            >
              Resend
            </ResendLink>
          )}
        </ResendContainer>

        <WrongNumberLink
          component="button"
          type="button"
          onClick={handleWrongNumber}
          underline="none"
        >
          {pageText?.wrongNumber || 'Entered wrong number?'}
        </WrongNumberLink>

        <ErrorMessage show={!!error}>{error || pageText?.error?.OTPvalidation}</ErrorMessage>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading || otp.join('').length !== otpLength}
        >
          {pageText?.primaryButton || 'Verify'}
        </Button>
      </form>
    </OtpContainer>
  );
};

export default OtpVerification;
