<template>
  <div class="app-wrapper">
    <!-- 左侧边栏 -->
    <SideBar class="sidebar-container"></SideBar>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue'
</script>

<style lang="scss" scoped>
$transition-time: 0.35s;

.app-wrapper {
  position: relative;
  width: 100%;
}

.sidebar-container {
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width $transition-time;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>