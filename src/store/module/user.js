import { ref, computed } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import router, { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { loginApi } from "@/api/login"


export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || "")
  const userName = ref("")
  const roles = ref([])
  const testCount = ref(0)

  const addTestCount = () => {
    testCount.value++
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    resetTagsView()
  }

  const login = ({ username, password, code }) => {
    return loginApi({ username, password, code }).then((res) => {
      setToken(res.data.token)
      token.value = res.data.token
    })
  }

  // 重置已打开的可视化面板
  const resetTagsView = () => {
    // todo
  }

  return { token, userName, roles, testCount, addTestCount, logout, login, resetTagsView }
})

/** 在setup外使用..... */
export function useUserStoreHook() {
  return useUserStore(store)
}
