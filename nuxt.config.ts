import { defineNuxtConfig } from 'nuxt/config'
import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],
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
              src: '/favicon/144x144.webp',
              sizes: '144x144',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/favicon/192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/favicon/512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
          navigateFallback: 'https://reubens-farm-s.vercel.app/',
          navigateFallbackDenylist: [/^\/nuxt\//, /\/api\//]
        },
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'mask-icon.svg'],
        srcDir: 'public'
      })
    ]
  },
  app: {
    head: {
      link: [{ rel: 'manifest', href: '/manifest.json' }]
    }
  },
  compatibilityDate: '2025-02-15'
})
