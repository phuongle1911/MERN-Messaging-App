import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react'
import js from '@eslint/js'
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  // frontend
  {
    files: ['Frontend/**/*.{js,jsx}'],
    plugins: {
      react,
    },
    // extends: [
    // "eslint:recommended",
    // "plugin:react/recommended"
    // ],
    languageOptions: {
      "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
      globals: {
				...globals.browser,
        ...globals.node
			}
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "react/jsx-indent": [2,2],
      "react/prop-types": 0
    },
  },
  // backend
  {
    files: ['Backend/**/*.js'],
    plugins: {
      js,
    },
    languageOptions: {
			globals: {
				...globals.browser,
        ...globals.node,
        ...globals.jest
			}
    },
    // extends: [
    //   "js/recommended"
    // ],
    // languageOptions: {
    //   "parserOptions": {
    //   "ecmaFeatures": {
    //     "jsx": true
    //   }
    // }
    // },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: 'next'}],
      "no-constant-binary-expression":"error",
      "no-duplicate-imports":"error"
    }
  }
])
