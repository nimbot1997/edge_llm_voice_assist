
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,task}']
      },
      includeAssets: ['models/*.task'],
      manifest: {
        name: 'Mini-Gemma Chat',
        short_name: 'GemmaChat',
        description: 'Privacy-first AI chat running Gemma-2B entirely in your browser',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    https: false
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@mediapipe/tasks-genai', 'localforage', 'marked', 'highlight.js']
        }
      }
    }
  }
})

