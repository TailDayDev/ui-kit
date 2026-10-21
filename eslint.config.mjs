import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'lib/**',
      'node_modules/**',
      'storybook-static/**',
      'coverage/**',
      'figma-plugin/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: {
      globals: { ...globals.browser, __DEV__: 'readonly' },
    },
    settings: { react: { version: '19.0' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // The kit is presentational only: no app state, navigation, i18n or network.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'axios', message: 'UI kit must not do network requests.' },
            { name: 'react-redux', message: 'UI kit must not use app state.' },
            {
              name: '@reduxjs/toolkit',
              message: 'UI kit must not use app state.',
            },
            { name: 'i18next', message: 'Pass texts through props.' },
            { name: 'react-i18next', message: 'Pass texts through props.' },
          ],
          patterns: [
            {
              group: ['@react-navigation/*'],
              message: 'UI kit must not navigate.',
            },
            {
              group: ['@reduxjs/*'],
              message: 'UI kit must not use app state.',
            },
          ],
        },
      ],
      // Components read design values from the theme, never raw colors.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
          message:
            'Use a color token from useTheme() instead of a hex literal.',
        },
        {
          selector: 'Literal[value=/^rgba?\\(/]',
          message:
            'Use a color token from useTheme() instead of an rgb() literal.',
        },
      ],
    },
  },
  {
    // Generated token files and test fixtures are the only place raw values live.
    files: [
      'src/tokens/generated/**',
      '**/*.test.{ts,tsx}',
      '**/*.stories.tsx',
    ],
    rules: { 'no-restricted-syntax': 'off' },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: { globals: { ...globals.node } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  prettier,
);
