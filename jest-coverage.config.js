module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{ts,js}',
    '!./src/**/*.spec.{ts,js}',
    '!./src/main.ts',
    '!./src/**/dependency-inversion/**/*',
    '!./src/**/infrastructure/config/**',
    '!./src/core/**/**.interface.ts',
    '!./src/infrastructure/event/**',
    '!./src/infrastructure/database/typeorm/unit-of-work/**',
    '!./src/infrastructure/database/typeorm/**/migration/*.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
