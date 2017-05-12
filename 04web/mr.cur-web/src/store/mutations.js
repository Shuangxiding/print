import storage from '@/util/storage'

export default {
  updateTabData(state, tabs) {
    state.current_tabs = tabs
  },
  /**
   * 更改导航菜单状态
   * @param {any} state
   */
  navChange(state) {
    state.nav_state = (state.nav_state === 'mini' ? 'normal' : 'mini')
  },
  /**
   * 更新用户基础信息
   * @param {*} info
   */
  updateUserInfo(state, userinfo) {
    state.user_token = userinfo.token
    state.user = userinfo.user

    storage.setItem('user', userinfo.user)
  },
  /**
   * 清除用户信息
   * @param {*} state
   */
  clearUserInfo(state) {
    state.user_token = ''
    state.user = ''
  },
  /**
   * 更新用户权限信息
   * @param {*} state
   * @param {*} userRole
   */
  updateUserRole(state, userRole) {
    state.user_role = userRole
  },
  /**
   * 更新用户菜单
   * @param {*} state
   * @param {*} userMenu
   */
  updateUserMenu(state, userMenu) {
    state.user_menu = userMenu
  },
  /**
   * 更新用户工作台数据
   * @param {*} state
   * @param {*} data
   */
  updateUserPlatformData(state, data) {
    state.platform_data = data
  },
  /**
   * 接收新消息
   * @param {*} state
   * @param {*} data
   */
  receiveMessage(state, { messageType, data }) {
    console.log(data)
    if (data) {
      if (messageType !== 'ReminderList') {
        if (data instanceof Array) {
          if (messageType === 'ReminderList') {
            return
          } else if (!messageType) {
            state.message_list = data
          }
          return
        } else {
          state.message_list.unshift(data)
          data = [data]
        }
      }
      console.log('mutation SOcket')
      // 消息通知
      if (state.message_listener && state.message_listener.length > 0) {
        if (messageType === 'Reminder' || messageType === 'ReminderList') {
          let listeners = state.message_listener.filter(c => c.type === messageType)
          for (let item of listeners) {
            try {
              item.callback(data)
            } catch (ex) {
              console.log(ex)
            }
          }
          return
        }
        data.filter(x => {
          let listeners = state.message_listener.filter(c => (c.type === x.type) || (c.type === messageType))
          for (let item of listeners) {
            try {
              console.log('mutation SOcket')
              item.callback(x)
            } catch (ex) {
              console.log(ex)
            }
          }
        })
      }
    }
  },
  /**
   * 更新未读消息条数
   */
  updateUnReadeMessage(state, value) {
    state.unReade_message = value
  },
  /**
   * 添加消息监听
   * @param {*} state
   * @param {*} data
   */
  addMessageListener(state, data) {
    state.message_listener.push(data)
    console.log(data, state.message_listener)
  },
  /**
   * 删除消息监听
   * @param {*} state
   * @param {*} data
   */
  removeMessageListener(state, data) {
    state.message_listener = state.message_listener.filter(x => x.view !== data.view)
  }
}
