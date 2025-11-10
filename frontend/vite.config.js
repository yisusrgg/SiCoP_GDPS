import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to Django backend so cookies are same-site during development
      '/credenciales': 'http://127.0.0.1:8000',
      '/convocatoria': 'http://127.0.0.1:8000',
      '/api': 'http://127.0.0.1:8000',
      '/media': 'http://127.0.0.1:8000'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})

