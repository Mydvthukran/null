import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to copy index.html to 404.html for GitHub Pages SPA routing
const copy404Plugin = () => ({
  name: 'copy-404-plugin',
  writeBundle(options) {
    const outDir = options.dir || 'dist';
    const indexHtmlPath = path.resolve(outDir, 'index.html');
    const errorHtmlPath = path.resolve(outDir, '404.html');
    if (fs.existsSync(indexHtmlPath)) {
      fs.copyFileSync(indexHtmlPath, errorHtmlPath);
    }
  }
});

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), copy404Plugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
  build: {
    outDir: 'dist',
    // Completely disable source maps so browser DevTools cannot reconstruct original React JSX source code
    sourcemap: false,
    rollupOptions: {
      output: {
        // Obfuscate chunk file names to generic hashes
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]'
      }
    }
  }
});
