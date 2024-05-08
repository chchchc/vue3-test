<template>
  <div>
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <el-menu-item :index="theOnlyOneChild.path">
        <template #title>
          <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" />
          <!-- <component
            v-else-if="theOnlyOneChild.meta.elIcon"
            :is="theOnlyOneChild.meta.elIcon"
            class="el-icon"
          /> -->
          <span>{{ theOnlyOneChild?.meta?.title || '默认名字' }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="props.item.path">
      <template #title>
        <el-icon>
          <Female />
        </el-icon>
        <span>{{ props.item.meta.title || '默认名字' }}</span>
      </template>
      <template v-if="props.item.children">
        <SideBarItem
          v-for="child in showingChild"
          :key="child.path"
          :item="child"
          :base-path="child.path"
        ></SideBarItem>
      </template>
    </el-sub-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Female } from '@element-plus/icons-vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  basePath: {
    type: String,
    default: ''
  }
})
// 该菜单children项
const showingChild = computed(() => {
  return props.item.children?.filter((c) => !c.meta?.hidden) ?? []
})
// 该菜单显示的children数量
const showingChildNumber = computed(() => {
  return showingChild.value.length
})
// 当前菜单的children小于或等于一个
const theOnlyOneChild = computed(() => {
  const childNum = showingChildNumber.value
  switch (true) {
    case childNum > 1: //大于1则放在submenu-item里面
      return false
    case childNum === 1: // 只有一个可显示的children，直接显示该菜单childeren。
      return showingChild.value[0]
    default:
      // 没有可显示的children，显示菜单本身
      return { ...props.item }
  }
})
console.log('theOnlyOneChild', theOnlyOneChild.value)
</script>

<style lang="scss" scoped></style>
