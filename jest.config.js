/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
  ],
};
