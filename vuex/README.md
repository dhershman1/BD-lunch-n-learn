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

A store is broken down 4 objects (sometimes less), these are:

- [State]()
- [Getters]()
- [Mutations]()
- [Actions]()

Throwing everything together you might see something like this:

```js
import { get } from axios

const store = {
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
      state.test = val // <== this is what I mean about sloppy mutation in cons
    }
  },

  actions: {
    fetchTest({ commit }, params) {
      get('/test/url', { params })
        .then(({ data }) => {
          return commit('setTest', data)
        })
        .catch(e => {
          throw e
        })
    }
  }
}
```

## How

Setting up Vuex is easy you first tell Vue to use Vuex, create what's known at the `Vuex Store`, and then give that to Vue.

Something like this:


