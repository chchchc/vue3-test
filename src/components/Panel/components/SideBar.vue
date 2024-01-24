<template>
  <div>
    <el-menu :default-active="activeMenu" background-color="#545c64" :unique-opened="true" :collapse-transition="false"
      text-color="#fff" active-text-color="#409EFF" @open="handleOpen" @close="handleClose">

      <SideBarItem v-for="route in noHiddenRoutes" :key="route.path" :item="route" :base-path="route.path"></SideBarItem>

    </el-menu>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import SideBarItem from './SideBarItem.vue'
import { usePermissionStore } from "@/store/module/permission"

const route = useRoute()
const permissionStore = usePermissionStore()
const activeMenu = computed(() => {
  const { path, name, meta } = route
  return path
})
//应该显示的菜单数
const noHiddenRoutes = permissionStore.routes.filter((r) => !r.meta?.hidden)

console.log('activeMenu1', permissionStore.routes, noHiddenRoutes)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}


</script>

<style lang="scss" scoped></style>