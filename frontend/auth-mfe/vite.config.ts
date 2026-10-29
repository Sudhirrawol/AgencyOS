import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: "auth_mfe",
    filename: "remoteEntry.js",
    exposes: {
      './AuthApp': './src/AuthApp.tsx',
    },
    shared: {
  react: { requiredVersion: '^18.3.1' },
  'react-dom': { requiredVersion: '^18.3.1' },
  'react-redux': { requiredVersion: '^9.3.0' },
}
  })],
  server: {
    port: 5001
  },
  preview: {
    port: 5001,
  },
  build: {
    target: 'esnext'
  }
})

