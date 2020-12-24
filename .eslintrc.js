/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: { node: true },
  extends: ['ackama', 'ackama/@typescript-eslint'],
  ignorePatterns: ['.build/', '.serverless/', '.tmp/', 'gh-schemas'],
  overrides: [
    {
      files: ['test/**'],
      extends: ['ackama/jest'],
      rules: { 'jest/prefer-expect-assertions': 'off' }
    },
    {
      files: ['src/schemas/**/**.d.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/ban-types': 'off'
      }
    }
  ],
  rules: {}
};

module.exports = config;
