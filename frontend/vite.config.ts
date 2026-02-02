import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    cors: true,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Increase chunk size warnings limit to match webpack config
    chunkSizeWarningLimit: 1000,
  },
  // Define environment variables (Vite uses VITE_ prefix, but we'll support REACT_APP_ too)
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.REACT_APP_API_URL': JSON.stringify(
      process.env.REACT_APP_API_URL || process.env.VITE_API_URL || 'http://localhost:5000/api'
    ),
    'process.env.REACT_APP_HERO_CAR_IMAGE': JSON.stringify(
      process.env.REACT_APP_HERO_CAR_IMAGE || process.env.VITE_HERO_CAR_IMAGE || ''
    ),
  },
  // Support both REACT_APP_ and VITE_ prefixes for environment variables
  envPrefix: ['VITE_', 'REACT_APP_'],
});
