<template>
  <div class="about">
    about页面
    <div @click="goBack">返回</div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()

const goBack = ()=>{
  router.go(-1)
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
