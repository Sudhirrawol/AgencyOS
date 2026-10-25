import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'shell',
    remotes: {
      auth_mfe: 'http://localhost:5001/assets/remoteEntry.js'
    },
    shared: ['react', 'react-dom'],
  })],
  server: {
    port: 5000,
  },
  build: {
    target: "esnext"
  }

})
