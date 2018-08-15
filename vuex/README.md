# Vuex

Vuex is a powerful state management tool built around the vue ecosystem.

### Pros

- Easy to use state management
- Broken down functionality
- Async Actions
- Sync Mutations
- Mappable State, Mutators, and Actions
- Modular based system
- Ability to use proper namespacing
- Access your state from anywhere!

### Cons

- State is too easily mutated
  - I've never been a real fan of the way Vuex handles mutations it can be handled in more of a proper manner
- Very easy to fall into the void of over modularizing things
- Improper use of the store is very very easy with no safe guards
- If done in correctly it might take away your ability to properly use the `v-model` capabilities of Vue

## Store

Most commonly you will call your modules "Stores" which Vuex is creating and giving to Vue.

> **Pro Tip**: Try to make your stores tasked based instead of based around a page

A store is broken down into 4 objects (sometimes less), these are:

- State: The basic state of the data. This is where all the data will live
- Getters: Used to get data in a certain way don't use getters just to get state back use it to get it back in a special manner
  - Don't use a getter to just get state, use getters to retrieve state in a transformed or updated manner
- Mutations: Used to change state values. A sloppy manner of doing so but a way none the less
  - Try to do most of your heavy lifting within your mutations
  - Simply making a setter is fine, but if there is any sort of logic or something behind that you do before committing, try moving that into the mutation instead
- Actions: Used to make Async requests to a server
  - ALWAYS commit something, whether the request works or errors make sure you area always committing something to the store

> **Pro Tip**: Don't be afraid to make your stores work. That's what they're meant to do, aleviate your components and pages by making the store do the heavy lifting and work

Throwing everything together you might see something like this:

```js
import { get } from axios

const store = {
  namespaced: true,
  state: {
    // Bad State
    test: {
      other: {
        thing: {
          cool: ''
        }
      }
    },

    // Good State
    other: ''
  },

  getters: {
    // Bad Getter
    getTest(state) {
      return state.test
    },

    // Another bad getter
    getTest: state => state.test,

    // Good Getter
    reversedTest(state) {
      return state.test.split().reverse().join('')
    }
  },

  mutations: {
    // Bad Mutation
    setCool(state, val) {
      state.test.other.thing.cool = val
    },

    // A "better" way to handle that
    assignCool(state, val) {
      // Note doing this in bulk will cause noticeable performance issues, especailly with large objects and arrays
      // Once again: Clean and Flatten data as much as possible
      Object.assign(state.test, { other: { thing: { cool: val } } })
    },

    // An "Okay" mutation
    setOther(state, val) {
      state.other = val // <== this is what I mean about sloppy mutation in cons
    }

    // Try to make your mutations do specific work. If you do something to the data and THEN commit it, try doing that within the mutation instead
  },

  actions: {
    // A Bad Action
    // Always catch routes
    fetchTest({ commit }, params) {
      get('/test/url', { params })
        .then(({ data }) => {
          commit('setTest', data)
        })
    }

    // A Good Action
    fetchOther({ commit }, params) {
      get('/other/url', { params })
        .then(({ data }) => {
          return commit('setOther', data)
        })
        .catch(e => {
          commit('setOther', '')

          throw e
        })
    }
  }
}

export default store
```

## How

Setting up Vuex is easy you first tell Vue to use Vuex, create what's known at the `Vuex Store`, and then give that to Vue.

Something like this:

```js
import Vue from 'vue'
import Vuex from 'vuex'

import events from './store/events'
import thing from './store/thing'

// Tell vue to use vuex
Vue.use(Vuex)

// Create our vuex store
const store = new Vuex.Store({
  modules: {
    events,
    thing
  }
})

// Create our new vue app with the store
const app = new Vue({
  el: '#app',
  store
})
```
