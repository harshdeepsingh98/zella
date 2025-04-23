// src/test/utils/test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Create a mock store with middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Default state that works for most tests
const defaultState = {
  app: {
    data: {
      app: {
        metadata: {
          name: 'Test App',
          description: 'Test Description',
        },
        config: {
          pages: [
            {
              metadata: {
                name: 'Test Page',
                code: 'test-page',
              },
            },
          ],
        },
      },
    },
    loading: false,
    error: null,
  },
  auth: {
    isAuthenticated: false,
    user: null,
  },
  form: {
    formData: {},
  },
};

/**
 * Custom render function with wrapped providers
 */
export function render(
  ui,
  {
    initialState = {},
    initialEntries = ['/'],
    store = mockStore({ ...defaultState, ...initialState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <ThemeProvider theme={{ palette: { primary: { main: '#33a54a' } } }}>
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
