import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '**/*.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/libs/gql/generated/': {
      preset: 'client',
      config: {
        dedupeFragments: true,
        avoidOptionals: true,
      },
    },
  },
};

export default config;
