import type { User } from '@/types/types'
import { defineStore } from 'pinia'
import { boolean } from 'yup/lib/locale'

type UserStore = {
  isLoggedIn: boolean;
  user: User | undefined;
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isLoggedIn: false,
    user: undefined,
  } as UserStore),
  getters: {
  },
  actions: {
    login(user: User) {
      this.$patch({isLoggedIn: true, user})
    },
    logout() {
      this.$patch({isLoggedIn: false, user: undefined})
    }
  }
})
