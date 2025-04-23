// src/test/mocks/redux-thunk.js
import { vi } from 'vitest';

// Mock redux-thunk middleware
const thunk =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };

export default thunk;
