
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useUserStoreHook } from '@/store/module/user';
import { getToken } from "./cache/cookies"
import { merge } from "lodash-es"


// 退出登录
function logout() {
  const userStore = useUserStoreHook()
  userStore.logout()
  // 强制刷新--重定向到登录页
  window.location.reload()
}

function createService() {
  const service = axios.create()

  // 添加请求拦截器
  service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  service.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    // apiData 是 api 返回的数据
    const apiData = response.data
    // // 二进制数据则直接返回
    // const responseType = response.request?.responseType
    // if (responseType === "blob" || responseType === "arraybuffer") return apiData
    // 这个 code 是和后端约定的业务 code
    const code = apiData.code
    // 如果没有 code, 代表这不是项目后端开发的 api
    if (code === undefined) {
      ElMessage.error("非本系统的接口")
      return Promise.reject(new Error("非本系统的接口"))
    }
    switch (code) {
      case 0:
        // 本系统采用 code === 0 来表示没有业务错误
        return apiData
      case 401:
        // Token 过期时
        return logout()
      default:
        // 不是正确的 code
        ElMessage.error(apiData.message || "Error")
        return Promise.reject(new Error("Error"))
    }

  }, function (error) {
    // 对响应错误做点什么
    console.log('出错了', error)
    return Promise.reject(error);
  });
  return service
}


/** 创建请求方法 */
function createRequest(service) {
  return function (config) {
    const token = getToken()
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}
// 创建一个实例
const service = createService()
export const request = createRequest(service)
