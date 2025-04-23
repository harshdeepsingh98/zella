// .eslintrc.testing.js
module.exports = {
  extends: ['./.eslintrc.json', 'plugin:testing-library/react', 'plugin:vitest/recommended'],
  plugins: ['testing-library', 'vitest'],
  rules: {
    // React Testing Library rules
    'testing-library/await-async-queries': 'error',
    'testing-library/no-await-sync-queries': 'error',
    'testing-library/no-container': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-dom-import': ['error', 'react'],
    'testing-library/no-node-access': 'warn',
    'testing-library/no-render-in-setup': 'error',
    'testing-library/no-unnecessary-act': 'error',
    'testing-library/prefer-find-by': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/prefer-user-event': 'error',
    'testing-library/render-result-naming-convention': 'error',

    // Vitest specific rules
    'vitest/consistent-test-it': ['error', { fn: 'it' }],
    'vitest/expect-expect': 'error',
    'vitest/no-disabled-tests': 'warn',
    'vitest/no-duplicate-hooks': 'error',
    'vitest/no-focused-tests': 'error',
    'vitest/no-identical-title': 'error',
    'vitest/no-test-return-statement': 'error',
    'vitest/prefer-to-be': 'error',
    'vitest/prefer-to-have-length': 'error',

    // Overrides for test files
    'react/display-name': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        'vitest/globals': true,
      },
    },
  ],
};
