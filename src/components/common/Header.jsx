import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import useAppData from '@hooks/useAppData';
import useAppSelector from '@hooks/useAppSelector';
import { selectAppMetadata } from '@features/app/selectors';

const StyledAppBar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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

const Header = ({ showBackButton = false, visibleLogo = true }) => {
  const navigate = useNavigate();
  const appMetadata = useAppSelector(selectAppMetadata);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {showBackButton && (
          <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        )}

        {visibleLogo && (
          <LogoContainer>
            <Logo>
              <LogoIcon />
              {appMetadata.name || 'Zella'}
            </Logo>
          </LogoContainer>
        )}

        {/* Spacer to ensure proper centering when back button is shown */}
        {showBackButton && <Box sx={{ width: 48 }} />}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
