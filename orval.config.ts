import { defineConfig } from 'orval';

export default defineConfig({
  b8st: {
    output: {
      mode: 'split',
      target: 'src/api/endpoints/b8st-api.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      prettier: true,
      mock: false,
      override: {
        mutator: {
          path: 'src/api/endpoints/axios-instance.ts',
          name: 'requestInstance',
        },
      },
    },
    input: {
      target: './swagger.yaml',
    },
  },
  b8stZod: {
    input: {
      target: './swagger.yaml',
    },
    output: {
      mode: 'split',
      client: 'zod',
      target: 'src/api/endpoints/b8st-api.zod.ts',
    },
    hooks: {},
  },
});