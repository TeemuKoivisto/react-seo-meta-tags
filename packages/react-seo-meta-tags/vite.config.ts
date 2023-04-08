import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve('src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => {
        if (format === 'cjs') {
          return 'index.cjs'
        } else {
          return 'index.js'
        }
      }
    },
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
