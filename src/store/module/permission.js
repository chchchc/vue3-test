import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { routeSettings, constantRoutes, dynamicRoutes } from '@/router'

// 根据角色过滤动态路由
const filterAsyncRoutes = (routes, roles) => {
  const res = []
  routes.forEach((r) => {
    const tmp = { ...r }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// roles：角色数组--[A,B,C,D,E,F]  route：当前路由的角色---[A,B]
const hasPermission = (roles, route) => {
  const metaRoles = route.meta?.roles
  if (metaRoles?.length) {
    return roles.some(r => metaRoles.includes(r))
  }
  return true
}

export const usePermissionStore = defineStore('permission', () => {
  // 最终路由
  const routes = ref([])
  // 动态路由
  const dyRoutes = ref([])

  const setRoutes = (roles) => {
    // 可到达路由
    const accessRoutes = routeSettings.isAsync ? filterAsyncRoutes(dynamicRoutes, roles) : dynamicRoutes
    // 合并常驻路由与可到达路由
    routes.value = constantRoutes.concat(accessRoutes)
    dyRoutes.value = accessRoutes
  }
  return { routes, dyRoutes, setRoutes }

})

// 在setup外部调用
export function usePermissionStoreHook() {
  return usePermissionStore(store)
} 