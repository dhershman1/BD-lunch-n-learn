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
- If done incorrectly it might take away your ability to properly use the `v-model` capabilities of Vue

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

## Store

Most commonly you will call your modules "Stores" which Vuex is creating and giving to Vue.

> **Pro Tip**: Try to make your stores tasked based instead of based around a page

A store is broken down into 4 objects (sometimes less), these are:

- State: The basic state of the data. This is where all the data will live
  - Try to initialize your state with some kind of value, what you intend it to be, try to avoid null/undefined state
  - For instance: If you plan for it to be a string, make it an empty string, if it is going to be an object then an empty object
  - This helps a whole lot in keeping data clean and consistent, making it so you always know what exactly to expect
- Getters: Used to get data in a certain way don't use getters just to get state back use it to get it back in a special manner
  - Don't use a getter to just get state, use getters to retrieve state in a transformed or updated manner
- Mutations: Used to change and update state values.
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
    // It's okay because its only purpose is to set something
    // (Which is totally fine if thats all it needs to do)
    // Try to make mutations do some work if work needs done to the data before it's stored
    setOther(state, val) {
      state.other = val
    }

    // A little (and kinda bad) example
    setOtherTwo(state, val) {
      if (!val) {
        state.other = 'No Value!'
      } else {
        state.other = val
      }
    }
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

## Namespacing

Namespacing is a wonderful tool built into vuex that allows you to contain and organize modules via their own individual namespace.

You can still acess stores by telling your commits/dispatches to go to the root level and dig down, or simply pass modules along to those that need them.

For example, say we have an event store and a thing store. The event store contains whether or not our app is loading:

`events.js`
```js
const store = {
  namespaced: true,
  state: {
    loading: false
  },

  mutations: {
    toggleLoading(state) {
      state.load = !state.loading
    }
  }
}

export default store
```

Our `thing` store has an action within it, and when we call that action we want the app to display it's loading, and when it's done, turn off loading

Here's how we might achieve that within the `thing` store js: (Assume `events.js` is at the same level as our `thing.js`)

`thing.js`
```js
import { get } from axios

import events from './events'

const store = {
  namespaced: true,
  state: {
    thing: ''
  },

  modules: {
    events
  },

  mutations: {
    setThing(state, d) {
      state.thing = d
    }
  },

  actions: {
    fetchThing({ commit }, params) {
      // Since I am bringing the events store into my thing store as a module
      // I am able to simply run a commit to toggle the loading bar
      // If I did not do this, I could achieve the same result doing:
      // commit('events/toggleLoading', {}, { root: true })
      // Doing it this way offers a little bit of a cleaner approach
      commit('events/toggleLoading')

      get('/thing/url', { params })
        .then(({ data }) => commit('setThing', data))
        .catch(e => {
          commit('setThing', '')

          throw e
        })
        .finally(() => commit('events/toggleLoading'))
    }
  }
}

export default store
```

## Reuseable Modules

So since we can bring a store in to any of our other stores, and run commits to turn things on and off thigns could get a little messy

Especially if you have multiple stores using the same module on the same component or page.

However you're in luck! IF you don't want this to happen, and you want each location where you are bringing a store in as a module to be it's own seperate instance you can do just that!

Example: We have 3 stores, `events.js`, `test.js`, and `other.js`

We want to re use `events` within our `test` and `other` stores but we don't want them to share the state. Instead we want it to be different for each.

`events.js`
```js
const store = {
  namespaced: true,
  // To achieve this, we simply turn the state into a function rather than an object
  // This is the same reason why you use data as a function within components!
  state() {
    return {
      loading: false
    }
  },

  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading
    }
  }
}
```

Now when `test` and `other` are using events loading will be specific to them when they change it.

However in order to access these individual values, you'll need to specifically call them within your mappers:

```js
import { mapState } from 'vuex'

export default {
  computed: {
    // Don't forget we can also rename values directly within our mappers
    // By using an object instead of the array, the property will be the new name
    // While the value should be the state name
    ...mapState('test/events', {
      testLoading: 'loading'
    }),
    ...mapState('other/events', {
      otherLoading: 'loading'
    })
  }
}

```

So take advantage of this as you see fit
