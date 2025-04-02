import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig(({ command }) => {
  return {
    base: '/find-photo/',  // GitHub Pages için base URL
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      cssCodeSplit: true,  // CSS dosyalarını bölüp optimize eder
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            stage: 1,
          }),
        ],
      },
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
    ],
  };
});
