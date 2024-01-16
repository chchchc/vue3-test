import { useUserStoreHook } from "@/store/module/user";


export function addCount() {
  useUserStoreHook().addTestCount()
}