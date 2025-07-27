import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/interfaces': resolve(__dirname, 'src/interfaces'),
      '@/enums': resolve(__dirname, 'src/enums')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactMultiAgentSystem',
      fileName: 'react-multi-agent-system'
    },
    rollupOptions: {
      external: ['fs-extra', 'chalk', 'yaml'],
      output: {
        globals: {
          'fs-extra': 'fs',
          'chalk': 'chalk',
          'yaml': 'yaml'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
})
