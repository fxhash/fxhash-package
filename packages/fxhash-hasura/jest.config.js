export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  reporters: ['default', 'jest-junit'],
};