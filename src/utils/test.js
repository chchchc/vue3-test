import { useUserStore } from "@/stores/user";


export function getTestCount(){

  console.log( 'test000000000',useUserStore().testCount)
}