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
        registerType: 'autoUpdate',
        manifest: {
          name: 'ReubenS_FarmS',
          short_name: 'ReubenS',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/favicon/192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable'
            },
            {
              src: '/favicon/512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
          navigateFallback: '/',  // Nuxt fallback
          navigateFallbackDenylist: [/^\/_nuxt\//, /\/api\//], // Ignore internal Nuxt files and API calls
        }
      })
    ]
  },

  compatibilityDate: '2025-02-15'
})
