import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // API_HOST is used when running on docker
        target: process.env.API_HOST || 'http://localhost:8000',
        changeOrigin: true,
      },
      '/uploads': {
        // API_HOST is used when running on docker
        target: process.env.API_HOST || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
