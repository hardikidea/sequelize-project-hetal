// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use 'node' for backend applications
  roots: ['<rootDir>/src'], // Point to the source directory
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Find test files
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true, // Optional: collect coverage information
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main.ts',
  ], // Adjust as needed
};
