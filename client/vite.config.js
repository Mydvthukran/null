import { defineConfig, loadEnv } from 'vite'
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
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(), '');
  const apiUrl = env.VITE_API_URL || '/api';

  return {
    base: '/',
    plugins: [react(), copy404Plugin()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
        '/uploads': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',
    },
    build: {
      outDir: 'client/dist'
    }
  };
})
