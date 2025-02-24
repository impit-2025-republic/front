import { defineConfig } from 'orval';

export default defineConfig({
  nmost: {
    output: {
      mode: 'split',
      target: 'src/api/endpoints/api.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      prettier: true,
      mock: true,
      override: {
        mutator: {
          path: 'src/api/endpoints/axios-instance.ts',
          name: 'requestInstance',
        },
      },
    },
    input: {
      target: '/src/hooks/swagger.yaml',
    },
  },
});