// src/test/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Make sure handlers is properly imported and is an array
export const server = setupServer(...handlers);
