export default ({
  state: {
    user_id: '',
    // 查看文件弹出框
    check_img_dialog: false,
    check_img_url: [],
    // 消息列表
    message_list_dialog: false,
    // 消息详情
    message_details_item: {},
    message_details_dialog: false
  },
  getters: {},
  mutations: {
    updateUserId(state, UserId) {
      state.user_id = UserId
    },
    // 查看文件更新
    updateCheckImgDialog(state, value) {
      state.check_img_dialog = value
    },
    updateCheckImgUrl(state, value) {
      state.check_img_url = value
    },
    // 消息详情
    updateMessageDetailsItem(state, value) {
      state.message_details_item = value
    },
    updateMessageDetailsDialog(state, value) {
      state.message_details_dialog = value
    },
    // 消息列表
    updateMessageListDialog(state, value) {
      state.message_list_dialog = value
    }
  },
  actions: {}
})
