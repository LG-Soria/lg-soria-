import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignorados globales
  globalIgnores(['dist', 'build', 'coverage', 'node_modules']),

  // Reglas para TS/TSX (aplica en src)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, // reglas con chequeo de tipos
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite, // HMR seguro con Vite
    ],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        // Habilita reglas que requieren info de tipos
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      // Hooks y HMR
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Preferir la regla de TS para unused vars (permite _prefijos)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },

  // Archivos de configuración (Node)
  {
    files: [
      '**/*.{js,cjs,mjs,ts}', // configs en raíz o tooling
      'eslint.config.*',
      'vite.config.*',
      '*.config.*',
      '*.setup.*',
      '*.rc.*',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
])
