import { createPinia, defineStore } from 'pinia'
import { getUserChName } from '@/widgets/utils'

const pinia = createPinia()
export default pinia

export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      nameEn: '',
    }
  },
  getters: {
    nameCh(state) {
      return getUserChName(state.nameEn)
    },
    email(state) {
      return `${state.nameEn}@126.com`
    },
  },
  actions: {
    getInfo() {
      console.log('userInfo', {
        name: this.nameCh.name,
        email: this.email,
      })
    },
  },
})
