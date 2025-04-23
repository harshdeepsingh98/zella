// src/components/home/__tests__/LandingSection.snapshot.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { renderWithMui } from '../../../test/utils/mui-test-utils';
import LandingSection from '../LandingSection';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Only mock useAppSelector to return what we need
vi.mock('@hooks/useAppSelector', () => ({
  default: vi.fn(selector => {
    // This simulates the selector function by returning different values
    // based on which selector is being called
    if (selector.name === 'selectAppMetadata') {
      return { name: 'Snapshot App', description: 'Snapshot Description' };
    }
    if (selector.name === 'selectPages') {
      return [{ metadata: { code: 'test-page' } }];
    }
    return null;
  }),
}));

describe('LandingSection Snapshots', () => {
  it('renders with default props', () => {
    // Create initial state
    const initialState = {
      app: {
        data: {
          app: {
            metadata: {
              name: 'Snapshot App',
              description: 'Snapshot Description',
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
      },
    };

    // Use the MUI-compatible render function
    const { container } = renderWithMui(<LandingSection />, { initialState });

    // Test that it renders without crashing
    expect(container).toBeTruthy();
  });
});
