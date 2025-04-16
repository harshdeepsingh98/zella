import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import Header from './Header';

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
`;

const ContentContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
`;

const TitleContainer = styled(Box)`
  margin-bottom: 16px;
`;

const Title = styled(Typography)`
  font-weight: 600;
  margin-bottom: 8px;
`;

const SubTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette?.text?.secondary || '#5c5c5c'};
`;

const PageWrapper = ({
  children,
  title,
  subTitle,
  showBackButton = false,
  showHeader = true,
  visibleLogo = true,
}) => {
  return (
    <PageContainer>
      {showHeader && <Header showBackButton={showBackButton} visibleLogo={visibleLogo} />}
      
      <ContentContainer>
        {(title || subTitle) && (
          <TitleContainer>
            {title && <Title variant="h4">{title}</Title>}
            {subTitle && <SubTitle variant="body1">{subTitle}</SubTitle>}
          </TitleContainer>
        )}
        
        {children}
      </ContentContainer>
    </PageContainer>
  );
};

export default PageWrapper;