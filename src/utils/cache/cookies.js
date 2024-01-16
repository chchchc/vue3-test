import Cookies from "js-cookie"

const TOKENKEY = 'vue3-test-token-key'

export const getToken = () => {
  return Cookies.get(TOKENKEY)
}
export const setToken = (token) => {
  Cookies.set(TOKENKEY, token)
}
export const removeToken = () => {
  Cookies.remove(TOKENKEY)
}