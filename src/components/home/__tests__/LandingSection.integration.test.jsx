// src/components/home/__tests__/LandingSection.integration.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/utils/test-utils';
import LandingSection from '../LandingSection';

// Mock the appSlice
vi.mock('../../../features/app/appSlice', () => ({
  fetchAppData: vi.fn(),
}));

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the app selector hook
vi.mock('../../../hooks/useAppSelector', () => ({
  default: selector => {
    // Return mock data for different selectors
    if (selector.name === 'selectAppMetadata') {
      return { name: 'Dynamic App', description: 'Dynamic Description' };
    }
    if (selector.name === 'selectPages') {
      return [{ metadata: { code: 'dynamic-page' } }];
    }
    return null;
  },
}));

vi.mock('../../../hooks/useAppDispatch', () => ({
  default: () => vi.fn(),
}));

// Setup navigation mock
const mockNavigate = vi.fn();

describe('LandingSection Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles navigation correctly', async () => {
    // Arrange
    render(<LandingSection />);

    // Act
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Get Started/i }));

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith('/dynamic-page');
  });
});
