import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      include: ['buffer', 'path']
    })
  ],
  base: '/code-converter/'
})
