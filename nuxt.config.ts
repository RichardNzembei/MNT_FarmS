import { defineNuxtConfig } from "nuxt/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Reuben's Farms",
          short_name: "Reuben's Farms",
          description:
            "Manage your agricultural projects with ease, track labor, harvests, and progress on Reuben's Farms.",
          lang: "en-US",
          start_url: "/?utm_source=pwa",
          scope: "/",
          theme_color: "#059669",
          background_color: "#f0fdf4",
          display: "standalone",
          orientation: "portrait-primary",
          categories: ["agriculture", "productivity", "business"],
          icons: [
            {
              src: "/iconified/144x144.png",
              sizes: "144x144",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/favicon/192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/favicon/512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          screenshots: [
            {
              src: "/screenshots/screenshot1.png",
              sizes: "1080x1920",
              type: "image/png",
              form_factor: "wide",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
          navigateFallback: "https://reubens-farm-s.vercel.app/",
          navigateFallbackDenylist: [/^\/nuxt\//, /\/api\//],
        },
        includeAssets: [
          "favicon.ico",
          "robots.txt",
          "apple-touch-icon.png",
          "mask-icon.svg",
        ],
        srcDir: "public",
      }),
    ],
  },
  app: {
    head: {
      link: [{ rel: "manifest", href: "/manifest.json" }],
    },
  },
  compatibilityDate: "2025-02-15",
});
