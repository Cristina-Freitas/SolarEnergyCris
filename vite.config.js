import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Em desenvolvimento, as chamadas para /api vão para o servidor local (npm run server)
    proxy: {
      '/api': 'http://localhost:3333',
    },
  },
})
