import React from 'react';
import { PageWrapper } from '@components/common';
import { MobileInput } from '@components/auth';
import useAppSelector from '@hooks/useAppSelector';
import { selectMobileAuthText } from '@features/app/selectors';

// Updated MobileAuth component that receives pageCode and pageData from DynamicScreen
const MobileAuth = ({ pageCode, pageData }) => {
  // Get texts from Redux store
  const pageText = useAppSelector(selectMobileAuthText);

  return (
    <PageWrapper
      title={pageText?.title || 'Mobile Number'}
      subTitle={pageText?.subText || 'Enter your mobile number to sign up'}
      showBackButton
      visibleLogo
    >
      {/* Pass the pageCode to MobileInput for dynamic navigation */}
      <MobileInput pageCode={pageCode} />
    </PageWrapper>
  );
};

export default MobileAuth;
