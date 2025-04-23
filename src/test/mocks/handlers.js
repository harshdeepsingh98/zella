// src/test/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Add API mocks as needed
  http.get('/api/app-config', () => {
    return HttpResponse.json({
      app: {
        metadata: {
          name: 'Test App',
          description: 'Test Description',
          logo: {
            lg: 'https://test-logo-lg.png',
            md: 'https://test-logo-md.png',
            sm: 'https://test-logo-sm.png',
          },
        },
        config: {
          pages: [
            {
              metadata: {
                name: 'Test Page',
                code: 'test-page',
                type: 'test-type',
              },
            },
          ],
        },
      },
    });
  }),
];
