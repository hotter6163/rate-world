import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
};

export default createJestConfig(config);
