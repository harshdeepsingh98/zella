import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@components/common';
import { PersonalInfoForm } from '@components/forms';
import useAppSelector from '@hooks/useAppSelector';
import useAppDispatch from '@hooks/useAppDispatch';
import { selectPersonalInfoText } from '@features/app/selectors';
import { 
  selectIsAuthenticated,
  selectVerificationStatus 
} from '@features/auth/selectors';
import { setTotalSteps } from '@features/form/formSlice';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get texts from Redux store
  const pageText = useAppSelector(selectPersonalInfoText);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const verificationStatus = useAppSelector(selectVerificationStatus);
  
  // If user is not authenticated or OTP is not verified, redirect to mobile auth page
  useEffect(() => {
    if (!isAuthenticated || verificationStatus !== 'verified') {
      navigate('/auth/mobile');
    }
  }, [isAuthenticated, verificationStatus, navigate]);
  
  // Set total steps for form
  useEffect(() => {
    dispatch(setTotalSteps(2));
  }, [dispatch]);
  
  return (
    <PageWrapper
      title={pageText?.title || 'Personal Information'}
      subTitle={pageText?.subText || 'Provide extra details to personalize your experience'}
      showBackButton
      visibleLogo
    >
      <PersonalInfoForm />
    </PageWrapper>
  );
};

export default PersonalInfo;