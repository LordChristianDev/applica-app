import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue': 'vue/dist/vue.esm-bundler.js',
      }
    },
    define: {
      'process.env': loadEnv(mode, '../../'),
    },
    envDir: '../../',
    build: {
      outDir: '../dist',
      emptyOutDir: true
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5217', // ← Your .NET port
          changeOrigin: true
        }
      }
    }
  }
});