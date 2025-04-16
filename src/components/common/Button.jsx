import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled(MuiButton)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ size }) => (size === 'large' ? '56px' : '48px')};
  font-weight: 500;
  border-radius: 8px;
  text-transform: none;
  
  &.MuiButton-containedPrimary {
    background-color: ${({ theme }) => theme.palette?.primary?.main || '#33A54A'};
    
    &:hover {
      background-color: ${({ theme }) => theme.palette?.primary?.dark || '#238f37'};
    }
    
    &.Mui-disabled {
      background-color: ${({ theme }) => theme.palette?.action?.disabledBackground || '#e0e0e0'};
      color: ${({ theme }) => theme.palette?.action?.disabled || '#9e9e9e'};
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'large',
  fullWidth = true,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && (
        <LoadingContainer>
          <CircularProgress size={20} color="inherit" />
        </LoadingContainer>
      )}
      {children}
    </StyledButton>
  );
};

export default Button;