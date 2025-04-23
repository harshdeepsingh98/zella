// src/components/home/__tests__/LandingSection.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test/utils/test-utils';
import LandingSection from '../LandingSection';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Setup navigation mock
const mockNavigate = vi.fn();

// Mock the selectors for predictable testing
vi.mock('@hooks/useAppSelector', () => ({
  default: selector => {
    // Mock the app metadata selector
    if (selector.name === 'selectAppMetadata') {
      return { name: 'Test App', description: 'Test Description' };
    }
    // Mock the pages selector
    if (selector.name === 'selectPages') {
      return [{ metadata: { code: 'auth-1', name: 'Test Page' } }];
    }
    return null;
  },
}));

describe('LandingSection Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with app metadata', async () => {
    // Render the component
    render(<LandingSection />);

    // Assert the component renders correctly - use more specific queries to avoid the multiple elements issue
    expect(screen.getByRole('heading', { name: 'Test App' })).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  it('navigates to the first page when Get Started button is clicked', async () => {
    // Render the component
    render(<LandingSection />);

    // Setup user for interactions
    const user = userEvent.setup();

    // Click the Get Started button
    await user.click(screen.getByRole('button', { name: /Get Started/i }));

    // Verify navigation was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/auth-1');
  });
});
