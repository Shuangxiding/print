export default ({
  state: {
    cust_id: '', // 客户ID
    repair_id: '', // 修复ID
    // 案件修复弹出框状态
    dialog: {
      show_repair_detail: false,
      show_repair_edit: false,
      show_repair_record_detail: false
    },
    // 修复信息编辑状态 -1:新增 0:查看 1:编辑  TODO:状态应统一放置枚举文件
    repair_edit_state: -1,
    repair_data: {}
  },
  getters: {},
  mutations: {
    /**
     * 更新修复编辑状态
     * @param {*} state
     * @param {*} value
     */
    updateRepairData(state, value) {
      state.repair_data = Object.assign({}, value)
    },
    /**
     * 更新修复编辑状态
     * @param {*} state
     * @param {*} value
     */
    updateEditState(state, value) {
      state.repair_edit_state = value
    },
    /**
     * 更新客户ID
     * @param {*} state
     * @param {*} id
     */
    updateCustId(state, id) {
      state.cust_id = id
    },
    /**
     * 更新修复
     * @param {*} state
     * @param {*} id
     */
    updateRepairId(state, id) {
      state.repair_id = id
    },
    /**
     * 更新修复详情弹出框状态
     * @param {*} state
     * @param {*} visual
     */
    updateRepairDetailDialogVisual(state, visual) {
      state.dialog.show_repair_detail = visual
    },
    /**
     * 更新修复信息编辑弹出框状态
     * @param {*} state
     * @param {*} visual
     */
    updateRepairEditDialogVisual(state, visual) {
      state.dialog.show_repair_edit = visual
    },
    /**
     * 更新修复记录的修复详情查看详情弹出框状态
     */
    updateRepairRecordDetailDialogVisual(state, visual) {
      state.dialog.show_repair_record_detail = visual
    }
  },
  actions: {}
})
