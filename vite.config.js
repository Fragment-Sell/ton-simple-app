import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ton-simple-app/', // ✅ PENTING untuk GitHub Pages
  server: {
    port: 3000,
    open: true
  }
})