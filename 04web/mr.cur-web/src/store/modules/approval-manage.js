export default ({
  state: {
    approval_click: false,
    repair_paya_id: '', // 还款审核信息的paraId
    repair_cupoId: '', // 还款审核信息的cupoId
    update_time: null,
    follow_record_cupoId: '' // 费用减免案件编号
  },
  getters: {},
  mutations: {
    // 费用减免案件编号
    updateFollowRecordCupoId(state, val) {
      state.follow_record_cupoId = val
    },
    approvalSaveUpdateTime(state) {
      state.update_time = +new Date()
    },
    updateApprovalClick(state, visual) {
      state.approval_click = visual
    },
    // 还款审核信息的paraId
    updateRepairPayaId(state, id) {
      state.repair_paya_id = id
    },
    // 还款审核信息的cupoId
    updateRepairCupoId(state, id) {
      state.repair_cupoId = id
    }
  },
  actions: {}
})
