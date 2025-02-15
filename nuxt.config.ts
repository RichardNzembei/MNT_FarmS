import { defineNuxtConfig } from 'nuxt/config'
import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  vite: {
    plugins: [
      VitePWA({
        srcDir: 'public',
        filename: 'manifest.json',
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
          swDest: 'public/sw.js'
        }
      })
    ]
  },

  compatibilityDate: '2025-02-15'
})
