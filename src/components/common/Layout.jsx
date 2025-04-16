import React from 'react';
import styled from 'styled-components';
import { Container, Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import useAppSelector from '@hooks/useAppSelector';
import { selectAppLoading } from '@features/app/selectors';
import Loader from './Loader';

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  max-width: 100%;
  
  @media (min-width: 600px) {
    max-width: 480px;
    padding: 0 16px;
  }
`;

const ContentWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Layout = () => {
  const location = useLocation();
  const isLoading = useAppSelector(selectAppLoading);
  
  return (
    <MainContainer disableGutters>
      {isLoading ? (
        <Loader fullScreen />
      ) : (
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      )}
    </MainContainer>
  );
};

export default Layout;  