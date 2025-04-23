// src/components/home/__tests__/LandingSection.functional.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
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

// Create a variable to store the mock implementation
let appSelectorMock = vi.fn(selector => {
  // Default implementation
  if (selector.name === 'selectAppMetadata') {
    return { name: 'Test App', description: 'Test Description' };
  }
  if (selector.name === 'selectPages') {
    return [{ metadata: { code: 'auth-1', name: 'Test Page' } }];
  }
  return null;
});

// Mock the selectors for predictable testing
vi.mock('@hooks/useAppSelector', () => ({
  default: selector => appSelectorMock(selector),
}));

describe('LandingSection Functional Tests', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset to default implementation
    appSelectorMock.mockImplementation(selector => {
      if (selector.name === 'selectAppMetadata') {
        return { name: 'Test App', description: 'Test Description' };
      }
      if (selector.name === 'selectPages') {
        return [{ metadata: { code: 'auth-1', name: 'Test Page' } }];
      }
      return null;
    });
  });

  it('displays the app name and description correctly', () => {
    // Render the component
    render(<LandingSection />);

    // Check if app name and description are displayed
    expect(screen.getByRole('heading', { name: 'Test App' })).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('has a working Get Started button', async () => {
    // Render the component
    render(<LandingSection />);

    // Setup user for interactions
    const user = userEvent.setup();

    // Find and check the button
    const button = screen.getByRole('button', { name: /Get Started/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    // Click the button
    await user.click(button);

    // Check navigation was called
    expect(mockNavigate).toHaveBeenCalledWith('/auth-1');
  });

  it('handles case with no app metadata', () => {
    // Override the mock for this specific test
    appSelectorMock.mockImplementation(selector => {
      if (selector.name === 'selectAppMetadata') {
        return {}; // Empty metadata
      }
      if (selector.name === 'selectPages') {
        return [{ metadata: { code: 'auth-1' } }];
      }
      return null;
    });

    // Render the component
    render(<LandingSection />);

    // Should display default values - use more specific selectors
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Zella');

    // Get the subtitle element
    const subtitle = screen.getByRole('heading', { level: 6 });
    expect(subtitle).toHaveTextContent('Secure digital identity platform');
  });

  it('displays the logo correctly', () => {
    // Render the component
    const { container } = render(<LandingSection />);

    // Get the SVG element directly from the container
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    // Check that it has a viewBox attribute
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('has proper container styling', () => {
    // Render the component
    const { container } = render(<LandingSection />);

    // Get the container element by data-testid
    const mainContainer = container.firstChild;
    expect(mainContainer).toBeInTheDocument();

    // Check that it has the correct class name pattern
    expect(mainContainer.className).toContain('sc-'); // Styled components class prefix
  });
});
