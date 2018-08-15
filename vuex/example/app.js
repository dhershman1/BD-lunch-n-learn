import Vue from 'vue'
import Vuex from 'vuex'

import events from './store/events'
import thing from './store/thing'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    events,
    thing
  }
})

const app = new Vue({
  el: '#app',
  store
})
