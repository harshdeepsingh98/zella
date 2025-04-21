import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// Import selectors
import {
  selectPageByCode,
  selectCurrentLanguage,
  selectAppMetadata,
  selectPages,
  selectAppLoading,
} from '@features/app/selectors';

// Import page components
import MobileAuth from '@pages/MobileAuth';
import OtpVerify from '@pages/OtpVerify';
import PersonalInfo from '@pages/PersonalInfo';

const DynamicScreen = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  // Get the page configuration based on the provided code
  const page = useSelector(state => selectPageByCode(state, code));
  const pages = useSelector(selectPages);
  const isLoading = useSelector(selectAppLoading);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const appMetadata = useSelector(selectAppMetadata);

  // Effect to handle navigation when pages are loaded but the requested page is not found
  useEffect(() => {
    // Only navigate if:
    // 1. We've loaded the app data
    // 2. We have pages
    // 3. The requested page code doesn't exist
    if (!isLoading && pages.length > 0 && !page) {
      console.log(`Page with code "${code}" not found, navigating to first available page`);

      // Find the first page in the configuration and navigate to it
      if (pages[0]?.metadata?.code) {
        navigate(`/${pages[0].metadata.code}`, { replace: true });
      } else {
        // Fallback to home if no pages are available
        navigate('/', { replace: true });
      }
    }
  }, [code, page, pages, isLoading, navigate]);

  // Show loading state while app data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return null if page not found (useEffect will handle navigation)
  if (!page) {
    return null;
  }

  // Determine which component to render based on the page type
  const renderPageComponent = () => {
    // Pass the current page code to all components for navigation purposes
    const pageProps = {
      pageCode: code,
      pageData: page,
    };

    switch (page.metadata.type) {
      case 'mobile-auth-screen':
        return <MobileAuth {...pageProps} />;
      case 'mobile-verify-screen':
        return <OtpVerify {...pageProps} />;
      case 'details-capture-screen':
        return <PersonalInfo {...pageProps} />;
      default:
        console.warn(`Unknown page type: ${page.metadata.type}`);
        return <div>Unsupported screen type: {page.metadata.type}</div>;
    }
  };

  return (
    <div className="screen-container">
      <div className="screen-content">{renderPageComponent()}</div>
    </div>
  );
};

export default DynamicScreen;
