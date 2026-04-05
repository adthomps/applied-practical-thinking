import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


export default defineConfig(() => ({
  root: __dirname,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/mermaid/') || id.includes('/dagre/') || id.includes('/dagre-d3')) {
              return 'vendor-mermaid';
            }
            if (id.includes('/recharts/') || id.includes('/d3-') || id.includes('/victory-vendor/')) {
              return 'vendor-charts';
            }
            if (id.includes('/react-syntax-highlighter/') || id.includes('/refractor/') || id.includes('/prismjs/')) {
              return 'vendor-syntax';
            }
            if (id.includes('/@radix-ui/')) {
              return 'vendor-radix';
            }
            if (id.includes('/@tanstack/')) {
              return 'vendor-query';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            if (
              id.includes('/react-dom/') ||
              id.includes('/react-router') ||
              id.includes('/react/') ||
              id.includes('/scheduler/')
            ) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
}));
