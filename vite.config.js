import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: 'localhost', 
    port: 3010,        
    strictPort: true,  
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './js/index.js', 
    },
    manifest: true
  },
});
