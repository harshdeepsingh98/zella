// src/test/mocks/dummyHooks.js
// This file provides dummy hook implementations for testing
import { vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';

// Create mock hooks that can be imported in test files
export const useAppSelector = vi.fn(selector => {
  if (selector.name === 'selectAppMetadata') {
    return { name: 'Test App', description: 'Test Description' };
  }
  if (selector.name === 'selectPages') {
    return [{ metadata: { code: 'test-page', name: 'Test Page' } }];
  }
  return null;
});

export const useAppDispatch = vi.fn(() => vi.fn());

export const mockNavigate = vi.fn();
