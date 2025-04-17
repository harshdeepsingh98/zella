import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common';
import useAppSelector from '@hooks/useAppSelector';
import { selectAppMetadata } from '@features/app/selectors';
import sampleImage from '@assets/images/sample.png';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  position: relative;
  background-image: url(${sampleImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  z-index: 2;
  padding: 24px;
`;

const HeaderSection = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  color: #33a54a;
  font-weight: 600;
  font-size: 1.5rem;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const LogoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
  </svg>
);

const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  padding-bottom: 40px;
`;

const Title = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Subtitle = styled(Typography)`
  font-size: 1rem;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.9);
`;

const ButtonContainer = styled(Box)`
  width: 100%;
  margin-bottom: 16px;
`;

const AvatarCircle = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #a646ff;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-right: 4px;
`;

const SecondAvatarCircle = styled(AvatarCircle)`
  background-color: #46a6ff;
  margin-left: -8px;
`;

const AvatarContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const LandingSection = () => {
  const navigate = useNavigate();
  const appMetadata = useAppSelector(selectAppMetadata);

  const handleGetStarted = () => {
    navigate('/auth/mobile');
  };

  return (
    <Container>
      <Overlay />

      <Content>
        <HeaderSection>
          <Logo>
            <LogoIcon />
            {appMetadata.name || 'Zella'}
          </Logo>
        </HeaderSection>

        <MainContent>
          <Title variant="h1">{appMetadata.name || 'Zella'}</Title>

          <Subtitle variant="subtitle1">
            {appMetadata.description || 'Secure digital identity platform'}
          </Subtitle>

          <ButtonContainer>
            <Button fullWidth variant="contained" size="large" onClick={handleGetStarted}>
              Get Started
            </Button>
          </ButtonContainer>
        </MainContent>
      </Content>
    </Container>
  );
};

export default LandingSection;
