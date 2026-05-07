/** @type {import('vite').UserConfig} */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import dsv from '@rollup/plugin-dsv'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      dirs: ['src/components/widgets'],
      resolvers: [PrimeVueResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      vueTemplate: true,
      viteOptimizeDeps: true,
      ignore: ['useCookies', 'useStorage'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json'
      },
      dumpUnimportItems: './auto-imports.json'
    }),
    dsv(),
    svgLoader({
      defaultImport: 'component',
      svgo: false
    })
  ],
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
