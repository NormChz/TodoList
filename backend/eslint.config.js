import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: ['dist/', 'node_modules/'] // Files that do not need linting.
  },
  ...tseslint.configs.recommended, // A set of predefined configuration objects for typescript.
  { // This object basically overrides the configurations in tseslint.configs.recommended.
    files: ["**/*.{ts,tsx,mtx,ctx}"],
    languageOptions: {
      globals: globals.node, // Environment is node, not browser.
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    rules: { // Override (or extend) the rules. For example, we override the recommended error for no-unused-vars to be warn.
      '@typescript-eslint/no-unused-vars': ['warn', {'argsIgnorePattern': '^_'}], // Allow function args with _ prefix to be ignored if not used.
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
    }
  },
]);
