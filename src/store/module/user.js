import { ref, computed } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import router, { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { getLogin, getUserInfo } from "@/api/login"


export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || "")
  const userName = ref("")
  const roles = ref([])
  const testCount = ref(0)

  const addTestCount = () => {
    testCount.value++
  }
  //登出
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    resetTagsView()
  }
  //登录
  const login = ({ username, password, code }) => {
    return getLogin({ username, password, code }).then((res) => {
      setToken(res.data.token)
      token.value = res.data.token
    })
  }
  //重置token
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = ""
  }
  // 设置角色
  const setRoles = (roles) => {
    roles.value = value
  }
  // 获取用户信息
  const getLoginUserInfo = () => {
    return getUserInfo().then((res) => {
      roles.value = res.data.roles
      userName.value = res.data.username
    })
  }

  // 重置已打开的可视化面板
  const resetTagsView = () => {
    // todo
  }

  return {
    token,
    userName,
    roles,
    testCount,
    addTestCount,
    logout,
    login,
    resetTagsView,
    resetToken,
    setRoles,
    getLoginUserInfo
  }
})

/** 在setup外使用..... */
export function useUserStoreHook() {
  return useUserStore(store)
}
