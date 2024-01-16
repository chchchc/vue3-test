import router from '@/router'
import { getToken } from "@/utils/cache/cookies"
import { useUserStore } from '@/stores/user'
// todo  疑问 useUserStore在setup外部调用如何的
const whiteListPath = ['/login'] // 白名单
const whiteListName = [''] // 白名单

const isWhiteList = (to) => {
  return whiteListPath.indexOf(to.path) !== -1 || whiteListName.indexOf(to.name) !== -1
}

router.beforeEach(async (to, from, next) => {
  console.log('a', to, from,)
  // 为确保 pinia 实例被激活，最简单的方法就是将 useStore() 的调用放在 pinia 安 装后才会执行的函数中。
  // 这里已经是在激活后 ---所以没毛病
  console.log('1111', useUserStore().testCount)
  const nownum = useUserStore().testCount+1
  useUserStore().setTestCount(nownum)

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
  // // 已有角色 可以直接进入todo
  // if (userStore.roles.length !== 0) {
  //   return next()
  // }


  next()



})

router.afterEach((to, from) => {
  console.log('2222', useUserStore().testCount)
  console.log('afterEach', to, from)

})
