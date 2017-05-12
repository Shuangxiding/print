import storage from '@/util/storage'

export default {
  navExpand(state) {
    return state.nav_state === 'normal'
  },
  /**
   * 判断当前用户是否登陆
   * @param {*} state
   */
  isLogin(state, getters) {
    return !!(getters.userToken &&
      getters.userInfo &&
      getters.userInfo.userId)
  },
  userToken(state) {
    if (state.user_token) {
      return state.user_token
    }

    return sessionStorage.getItem('userToken')
  },
  userInfo(state) {
    if (state.user) {
      return state.user
    }

    return storage.getItem('user')
  }
}
