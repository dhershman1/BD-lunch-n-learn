import { get, post } from 'axios'

// There is a problem here with our toggleLoading commit

export const fetchThing = ({ commit }, params) => {
  commit('events/toggleLoading')

  get('/thing/url', { params })
    .then(({ data }) => commit('setTest', data))
    .catch(e => {
      commit('setTest', '')

      throw e
    })
    .finally(() => commit('events/toggleLoading'))
}

export const saveThing = ({ commit }, payload) => {
  commit('events/toggleLoading')

  post('/thing/url/id', payload)
    .then(({ data }) => commit('setTest', data))
    .catch(e => {
      commit('setTest', '')

      throw e
    })
    .finally(() => commit('events/toggleLoading'))
}
