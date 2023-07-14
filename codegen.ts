import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/apollo/schema/**/*.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/apollo/generated/': {
      preset: 'client',
      config: {
        dedupeFragments: true,
        avoidOptionals: true,
      },
    },
    './src/apollo/generated/resolvers-types.ts': {
      config: {
        contextType: '@/graphql/context#Context',
        mapperTypeSuffix: 'Model',
        mappers: {
          User: '@prisma/client/index.d#User',
        },
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './src/apollo/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
