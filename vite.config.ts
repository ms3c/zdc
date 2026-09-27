import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // The backend doesn't send CORS headers, so proxy /api through Vite locally.
  const proxy = { '/api': { target: env.API_PROXY_TARGET || 'https://zdc-backend.it-501.workers.dev', changeOrigin: true } }

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  }
})
