import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/vintageSalon/',
  build: {
    outDir: '../dist/vintageSalon',
    emptyOutDir: false,
  },
  plugins: [react()],
})
