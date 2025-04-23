// src/test/utils/mui-test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import configureStore from 'redux-mock-store';

// Create a mock store factory
const mockStore = configureStore([]);

// Create a full MUI theme that has all required properties
const testTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Define all typography variants used in your app
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.75rem',
    },
    overline: {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: '#33a54a',
      light: '#5cb85c',
      dark: '#2a8d3e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#a646ff',
      light: '#b366ff',
      dark: '#8c3cd9',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#388e3c',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
      },
    },
  },
});

/**
 * Custom render function for MUI components
 */
export function renderWithMui(
  ui,
  {
    initialState = {},
    initialEntries = ['/'],
    store = mockStore({ ...initialState }),
    theme = testTheme,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

// Re-export everything from RTL
export * from '@testing-library/react';
