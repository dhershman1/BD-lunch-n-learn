// Breaking out actions is totally optional
// If you only have 1 or 2 then maybe you'd rather them just live here
// I did it for the sake of the example (It's also usually what I do in my own projects)
import * as actions from './actions'

const store = {
  namespaced: true,
  state: {
    test: ''
  },

  getters: {
    reversedTest(state) {
      return state.test.split().reverse().join('')
    }
  },

  mutations: {
    setTest(state, val) {
      state.test = val
    }
  },

  actions
}

export default store
