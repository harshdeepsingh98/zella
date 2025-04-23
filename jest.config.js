// jest.config.js
export default {
  // This configuration is only for IDE support
  // The actual tests run with Vitest
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test|integration.test|snapshot.test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/test/**',
    '!src/**/*.d.ts',
    '!src/**/*.config.{js,ts}',
    '!src/**/index.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
  ],
};
