import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@components/common';
import { OtpVerification } from '@components/auth';
import useAppSelector from '@hooks/useAppSelector';
import { 
  selectOtpVerifyText,
  selectMobileAuthText 
} from '@features/app/selectors';
import { 
  selectMobileNumber,
  selectFormattedMobileNumber 
} from '@features/auth/selectors';

const OtpVerify = () => {
  const navigate = useNavigate();
  
  // Get texts from Redux store
  const pageText = useAppSelector(selectOtpVerifyText);
  const mobileNumber = useAppSelector(selectMobileNumber);
  const formattedMobileNumber = useAppSelector(selectFormattedMobileNumber);
  
  // If mobile number is not set, redirect to mobile auth page
  useEffect(() => {
    if (!mobileNumber) {
      navigate('/auth/mobile');
    }
  }, [mobileNumber, navigate]);
  
  // Format subtext with mobile number
  const subText = pageText?.subText?.replace('{{ mobile_number }}', formattedMobileNumber);
  
  return (
    <PageWrapper
      title={pageText?.title || 'Verify OTP'}
      subTitle={subText || `We have sent an OTP to ${formattedMobileNumber}`}
      showBackButton
      visibleLogo
    >
      <OtpVerification />
    </PageWrapper>
  );
};

export default OtpVerify;