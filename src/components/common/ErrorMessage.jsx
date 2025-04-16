import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: ${({ theme }) => theme.palette?.error?.main || '#f44336'};
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 16px;
  margin-right: 8px;
`;

const ErrorText = styled(Typography)`
  color: inherit;
  font-size: 0.875rem;
`;

const ErrorMessage = ({ children, show = true }) => {
  if (!show || !children) return null;

  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorText variant="body2">{children}</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;