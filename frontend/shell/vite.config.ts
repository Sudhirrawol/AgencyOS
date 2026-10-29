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
    shared: {
      react: { requiredVersion: '^18.3.1' },
      'react-dom': { requiredVersion: '^18.3.1' },
      'react-redux': { requiredVersion: '^9.3.0' },
    }
  })],
  server: {
    port: 5000,
  },
  build: {
    target: "esnext"
  }

})
