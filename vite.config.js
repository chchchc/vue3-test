import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path, { resolve } from "path"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    //svg插件-主要插入部分
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    })
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
        target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
        ws: true,
        /** 是否允许跨域 */
        changeOrigin: true
      }
    },

  },
})
