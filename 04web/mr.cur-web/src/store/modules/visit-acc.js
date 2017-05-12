export default ({
  state: {
    update_time: null
  },
  getters: {},
  mutations: {
    saveUpdateTime(state) {
      state.update_time = +new Date()
    }
  },
  actions: {}
})
