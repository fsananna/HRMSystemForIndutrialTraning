import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      // Add both browser and node globals
      globals: {
        ...globals.browser,
        ...globals.node,
        require: 'readonly',  // Explicitly allow require
        process: 'readonly'   // Explicitly allow process
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    env: {
      node: true,      // Add Node.js environment
      browser: true,   // Keep browser environment
      es2020: true     // Ensure ES2020 features are recognized
    },
    settings: { 
      react: { version: '18.3' },
      node: {
        allowModules: ['require']  // Allow require usage
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-undef': 'warn'  // Change to warning instead of error if preferred
    },
  },
]