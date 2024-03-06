import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    globals: true,
  },
  server: {
    port: 3000,
  },
});
