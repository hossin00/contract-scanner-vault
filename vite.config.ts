import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/contract-scanner-vault/',
  build: { outDir: 'dist' }
})
