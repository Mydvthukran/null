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
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
  build: {
    // vite resolves outDir relative to this config file's directory.
    // Using "client/dist" here created a nested client/client/dist folder.
    outDir: 'dist'
  }
})
