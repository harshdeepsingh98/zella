import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '@pages/Home';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from '@features/app/appSlice';
import authReducer from '@features/auth/authSlice';

// Mock the selectors if needed
vi.mock('@hooks/useAppSelector', async () => {
  const actual = await vi.importActual('@hooks/useAppSelector');
  return {
    __esModule: true,
    default: vi.fn(selector => {
      if (selector.name === 'selectIsAuthenticated') return false;
      if (selector.name === 'selectAppLoading') return false;
      if (selector.name === 'selectAppData') return { name: 'Zella' }; // mock app data
      if (selector.name === 'selectAppMetadata') return {};
      if (selector.name === 'selectPages') return [];
    }),
  };
});

vi.mock('@hooks/useAppDispatch', () => ({
  __esModule: true,
  default: () => vi.fn(),
}));

describe('Home Route', () => {
  it('renders the landing section on / route', () => {
    const store = configureStore({
      reducer: {
        app: appReducer,
        auth: authReducer,
      },
      preloadedState: {},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Example test: check for heading or button from LandingSection
    expect(screen.getByText(/get started/i)).toBeInTheDocument(); // change text as per your actual component
  });
});
