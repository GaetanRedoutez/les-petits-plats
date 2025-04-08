import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
