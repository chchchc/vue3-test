import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    /** 跨域设置允许 */
    cors: true,
    proxy: {
      "/api/v1": {
        target: "https://www.fastmock.site/mock/761e2dda2b8890ab86c928a74e8f6538",
        ws: true,
        /** 是否允许跨域 */
        changeOrigin: true
      }
    },

  },
})
