import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CircularProgress, Box } from '@mui/material';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ fullScreen }) => (fullScreen ? '100vh' : '100%')};
  padding: ${({ size }) => size / 2}px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${({ theme }) => theme.palette?.primary?.main || '#33A54A'};
  animation: ${spinAnimation} 1.5s linear infinite;
`;

const Loader = ({ size = 40, fullScreen = false }) => {
  return (
    <LoaderContainer fullScreen={fullScreen} size={size}>
      <StyledCircularProgress size={size} />
    </LoaderContainer>
  );
};

export default Loader;