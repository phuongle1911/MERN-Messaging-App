import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: react
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      "react/self-closing-comp": ["error", {
        "component": true,
        "html": true
      }],
      "react/prefer-es6-class": [0, "always"],
      "react/prefer-stateless-function": [1, { "ignorePureComponents": true }],
      "react/jsx-pascal-case": [2, { allowAllCaps: false, allowNamespace: false }],
      "react/jsx-closing-bracket-location": [1],
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-tag-spacing": [2, { 
        "closingSlash": "never", 
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "allow"}],
      "react/jsx-boolean-value": ["off"],
      "jsx-a11y/alt-text": [2, {
            "elements": [ "img", "object", "area", "input[type=\"image\"]" ]}],
      "react/jsx-wrap-multilines": [1]
    },
  },
])
