
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  resolve: {
    alias: {
      '@apt/ui': resolve(__dirname, '../../packages/ui/src'),
      '@apt/config': resolve(__dirname, '../../packages/config/src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
