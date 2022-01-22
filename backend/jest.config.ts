import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageThreshold: {
    global: {
      functions: 80,
      statements: 80,
      lines: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testPathIgnorePatterns: ['dist/'],
  testRegex: '/__tests__/.*|(\\.|/)(spec|test).ts$',
  verbose: true,
};

export default config;
