import { defineStore } from 'pinia'

import state from './state'
import getters from './getters'
import actions from './actions'

export const useScorecardStore = defineStore('scorecard', {
  actions,
  getters,
  state,
  persist: true
})
