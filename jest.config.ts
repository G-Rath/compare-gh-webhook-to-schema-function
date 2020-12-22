import { Config } from '@jest/types';
import 'ts-jest';

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      // disable type checking when running tests, speeding them up and making
      // the development experience nicer by not blocking tests on types
      isolatedModules: true
    }
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    './test/setupExpectEachTestHasAssertions.ts',
    './test/setupMockFs.ts'
  ],
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  transform: {
    '\\.tsx?': 'ts-jest'
  }
};

export default config;
