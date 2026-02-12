import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'convex/server': path.resolve(__dirname, './src/mocks/convex-server.js'),
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
  // Support both REACT_APP_ and VITE_ prefixes for environment variables
  envPrefix: ['VITE_', 'REACT_APP_'],
});
