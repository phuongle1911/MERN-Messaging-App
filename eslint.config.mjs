import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
    "eslint:recommended",
    "plugin:react/recommended"
    ],
    languageOptions: {
      "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    }
    },
    plugins: {
      react,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      "prefer-const":"warn",
      "no-constant-binary-expression":"error",
      "no-duplicate-imports":"error",
      "react/jsx-indent": [2,2]
    },
  },
])
