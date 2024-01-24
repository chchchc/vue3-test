<script setup>
import { useUserStore } from '@/store/module/user';
// 返回路由实例 相当于模板中$router
import { useRouter } from "vue-router"

const router = useRouter()
const logout = ()=>{
  console.log('登出')
  useUserStore().logout()
  router.push("/login")
}
const goAbout = ()=>{
  router.push("/about")
}
</script>

<template>
  <main>
    <div>roles:{{ useUserStore.roles }}</div>
    <div>home页面</div>
    <div @click="logout">退出登录</div> 
    <div @click="goAbout">去往about</div>
    <!-- <TheWelcome /> -->
  </main>
</template>
