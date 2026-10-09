import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier/flat'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import ts from 'typescript-eslint'

export default defineConfig(
  globalIgnores(['dist/**', 'coverage/**']),
  js.configs.recommended,
  ts.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: ts.parser }
    }
  },
  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['*.{js,ts}'],
    languageOptions: { globals: globals.node }
  },
  prettier
)
