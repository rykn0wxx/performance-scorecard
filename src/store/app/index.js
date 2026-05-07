import { defineStore } from 'pinia'

import state from './state'
import getters from './getters'
import actions from './actions'

export const useAppStore = defineStore('app', {
  actions,
  getters,
  state,
  persist: true
})
