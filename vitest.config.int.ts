import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import { config } from 'dotenv'

config({ path: '.env.test' })

export default defineConfig({
  test: {
    include: ['**/*-int.spec.ts'],
    exclude: ['node_modules', 'data'],
    globals: true,
    root: './',
    maxConcurrency: 1,
  },
  plugins: [tsConfigPaths()],
})
