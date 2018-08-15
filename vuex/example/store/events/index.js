const store = {
  namespaced: true,
  state: {
    modal: false,
    loading: false
  },

  mutations: {
    toggleModal(state) {
      state.modal = !state.modal
    },

    toggleLoading(state) {
      state.loading = !state.loading
    }
  }
}
