module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/shared/either.ts',
    '!<rootDir>/src/**/contracts/**',
    '!<rootDir>/src/**/types/**',
    '!<rootDir>/src/**/models/**',
    '!<rootDir>/src/**/errors/**',
    '!<rootDir>/src/**/*-dto.ts',
    '!<rootDir>/src/factories/**',
    '!<rootDir>/src/configs/**',
    '!<rootDir>/src/adapters/**',
    '!<rootDir>/src/infra/api/**',
    '!<rootDir>/src/infra/database/prisma/helpers/**',
    '!<rootDir>/src/infra/service/**',
    '!<rootDir>/src/presentation/presenter/**',
    '!<rootDir>/src/presentation/helpers/**',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  verbose: true,
  passWithNoTests: true,
  noStackTrace: true,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[tj]s?(x)'],
};
