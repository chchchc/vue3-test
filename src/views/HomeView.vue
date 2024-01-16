<script setup>
import { useUserStore } from '@/stores/user';
// 返回路由实例 相当于模板中$router
import { useRouter } from "vue-router"

const router = useRouter()
const logout = ()=>{
  console.log('登出')
  useUserStore().logout()
  router.push("/login")
}
</script>

<template>
  <main>
    zhuyemian
    <div @click="logout">退出登录</div> 
    <!-- <TheWelcome /> -->
  </main>
</template>
