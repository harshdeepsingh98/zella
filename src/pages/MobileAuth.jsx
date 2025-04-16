import React from 'react';
import { PageWrapper } from '@components/common';
import { MobileInput } from '@components/auth';
import useAppSelector from '@hooks/useAppSelector';
import { selectMobileAuthText } from '@features/app/selectors';

const MobileAuth = () => {
  // Get texts from Redux store
  const pageText = useAppSelector(selectMobileAuthText);

  return (
    <PageWrapper
      title={pageText?.title || 'Mobile Number'}
      subTitle={pageText?.subText || 'Enter your mobile number to sign up'}
      showBackButton
      visibleLogo
    >
      <MobileInput />
    </PageWrapper>
  );
};

export default MobileAuth;
