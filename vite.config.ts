import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      API_BASE_URL: JSON.stringify(env.API_BASE_URL),
    },
    server: {
      proxy: {
        '/api': {
          target: env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
