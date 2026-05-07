import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8282
    // open: true,
    // cors: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'if-function'],
        quietDeps: true
      },
      sass: {
        api: 'modern',
        silenceDeprecations: ['legacy-js-api'],
        quietDeps: true,
        verbose: false
      }
    }
  },
  optimizeDeps: {
    noDiscovery: true,
    entries: ['.src/**/*.vue']
  }
})
