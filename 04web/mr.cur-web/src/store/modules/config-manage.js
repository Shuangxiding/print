export default ({
  state: {
    template_dialog_visual: false,
    update_template_model: false
  },
  getters: {},
  mutations: {
    updateTemplateDialogVisual(state, visual) {
      state.template_dialog_visual = visual
    },
    doUpdateTemplateModel(state, visual) {
      state.update_template_model = visual
    }
  },
  actions: {}
})
