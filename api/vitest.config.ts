/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    exclude: ['**/*-int.spec.ts', 'node_modules', 'data'],
  },
  plugins: [tsconfigPaths()],
})
