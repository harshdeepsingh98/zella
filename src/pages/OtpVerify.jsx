import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@components/common';
import { OtpVerification } from '@components/auth';
import useAppSelector from '@hooks/useAppSelector';
import { selectOtpVerifyText, selectPages } from '@features/app/selectors';
import { selectMobileNumber, selectFormattedMobileNumber } from '@features/auth/selectors';

const OtpVerify = ({ pageCode, pageData }) => {
  const navigate = useNavigate();

  // Get texts from Redux store
  const pageText = useAppSelector(selectOtpVerifyText);
  const mobileNumber = useAppSelector(selectMobileNumber);
  const formattedMobileNumber = useAppSelector(selectFormattedMobileNumber);
  const pages = useAppSelector(selectPages);

  // Find the previous page code from the pages array
  const findPreviousPageCode = () => {
    const currentIndex = pages.findIndex(page => page.metadata.code === pageCode);
    if (currentIndex > 0) {
      return pages[currentIndex - 1].metadata.code;
    }
    return null;
  };

  // If mobile number is not set, redirect to the previous page
  useEffect(() => {
    if (!mobileNumber) {
      const prevPageCode = findPreviousPageCode();
      if (prevPageCode) {
        navigate(`/${prevPageCode}`);
      } else {
        // Fallback to home if no previous page
        navigate('/');
      }
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
      {/* Pass the pageCode to OtpVerification for dynamic navigation */}
      <OtpVerification pageCode={pageCode} />
    </PageWrapper>
  );
};

export default OtpVerify;
