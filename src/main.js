import './assets/main.css'

import { createApp } from 'vue'
import store from '@/store' // 统一将pinia实例放一个位置，后续方便在setup外部调用pinia时，usexxxStore需要传入pinia实例

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import '@/router/permission.js'
import { loadSvg } from "@/icons"


const app = createApp(App)
/** 加载全局 SVG */
loadSvg(app)

/** setup外部使用pinia  
 * https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html
 * 必须先在use后再使用 例如a位置就是错误的  b位置ok
 */
/**a位置 */
// import { useUserStore } from '@/store/module/user'
// const userStore = useUserStore()
// console.log(userStore.testCount)

app.use(store)
app.use(router)
app.use(ElementPlus)


/**b位置 */
// import { useUserStore } from '@/store/module/user'
// const userStore = useUserStore()
// console.log(userStore.testCount)

app.mount('#app')
