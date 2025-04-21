import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '@hooks/useAppSelector';
import { selectPages } from '@features/app/selectors';
import { Button } from '@components/common';

/**
 * Navigation button that automatically determines the next or previous page
 * based on the current page code in the flow
 */
const PageNavigationButton = ({
  currentPageCode,
  direction = 'next',
  label,
  onClick,
  loading = false,
  disabled = false,
  ...buttonProps
}) => {
  const navigate = useNavigate();
  const pages = useAppSelector(selectPages);

  const handleNavigation = async e => {
    // If a custom onClick handler is provided, call it first
    if (onClick) {
      const result = await onClick(e);
      // If the handler returns false, don't continue with navigation
      if (result === false) return;
    }

    // Find the target page index
    const currentIndex = pages.findIndex(page => page.metadata.code === currentPageCode);

    if (currentIndex === -1) {
      console.warn(`Current page ${currentPageCode} not found in configuration`);
      return;
    }

    let targetIndex;
    if (direction === 'next') {
      targetIndex = currentIndex + 1;
    } else if (direction === 'prev') {
      targetIndex = currentIndex - 1;
    } else {
      console.warn(`Invalid direction: ${direction}`);
      return;
    }

    // Check if target index is valid
    if (targetIndex >= 0 && targetIndex < pages.length) {
      navigate(`/${pages[targetIndex].metadata.code}`);
    } else {
      console.warn(`Target page index ${targetIndex} is out of bounds`);
    }
  };

  return (
    <Button
      fullWidth
      onClick={handleNavigation}
      loading={loading}
      disabled={disabled}
      {...buttonProps}
    >
      {label || (direction === 'next' ? 'Next' : 'Back')}
    </Button>
  );
};

export default PageNavigationButton;
