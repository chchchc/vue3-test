import router, { routeSettings } from '@/router'
import { getToken } from "@/utils/cache/cookies"
import { useUserStoreHook } from '@/store/module/user'
import { usePermissionStoreHook } from '@/store/module/permission'
import { ElMessage } from "element-plus"

const whiteListPath = ['/login'] // 白名单
const whiteListName = [''] // 白名单

const isWhiteList = (to) => {
  return whiteListPath.indexOf(to.path) !== -1 || whiteListName.indexOf(to.name) !== -1
}

// pinia 实例还未被激活--报错

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  console.log('a11', to, from,)
  // 为确保 pinia 实例被激活，最简单的方法就是将 useStore() 的调用放在 pinia 安 装后才会执行的函数中。
  // 这里已经是在激活后 ---所以没毛病

  const token = getToken()
  // 没有登录
  if (!token) {
    if (isWhiteList(to)) {
      next()
    } else {
      next('/login')
    }
    return
  }
  // 如果已经登录，并准备进入 Login 页面，则重定向到主页
  if (to.path === "/login") {
    return next({ path: "/" })
  }
  // 已有角色 
  if (userStore.roles.length !== 0) {
    return next()
  }

  // 获取角色
  try {
    // 开启了动态路由
    if (routeSettings.isAsync) {
      await userStore.getLoginUserInfo()
      const roles = userStore.roles
      //根据角色生成可访问 route = 常驻路由 + 有权限访问的路由
      permissionStore.setRoutes(roles)
    } else {
      // 给默认角色
      userStore.setRoles(routeSettings.defaultRoles)
      permissionStore.setRoutes(routeSettings.defaultRoles)
    }
    // 将'有访问权限的动态路由' 添加到 Router 中
    console.log('dyroute', permissionStore.dyRoutes)
    permissionStore.dyRoutes.forEach((r) => router.addRoute(r))
    // 确保添加路由已完成
    // 设置 replace: true, 因此导航将不会留下历史记录
    next({ ...to, replace: true })
  } catch (err) {
    //发生任何错误都重置token 重新登录
    userStore.resetToken()
    ElMessage.error(err.message || "路由守卫过程发生错误")
    next("/login")
  }
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach', to, from)
  //todo 后续处理
})
