import { schema } from '@/server/schema';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/server/generated/': {
      preset: 'client',
      config: {
        dedupeFragments: true,
        avoidOptionals: true,
      },
    },
  },
};

export default config;
