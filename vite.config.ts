
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Exclude model files from service worker caching
        globIgnores: ['**/*.task', '**/*.onnx']
      },
      includeAssets: ['**/*.{ico,png,svg}'],
      manifest: {
        name: 'SmolLM Chat',
        short_name: 'SmolLMChat',
        description: 'Privacy-first AI chat running SmolLM-360M entirely in your browser',
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

