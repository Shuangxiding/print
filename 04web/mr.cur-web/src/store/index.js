import Vue from 'vue'
import Vuex from 'vuex'

// 导入子功能
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

// 导入子模块
import callAcc from '@/store/modules/call-acc'
import visitAcc from '@/store/modules/visit-acc'
import configManage from '@/store/modules/config-manage'
import repairManage from '@/store/modules/repair-manage'
import approvalManage from '@/store/modules/approval-manage'
import systemManage from '@/store/modules/system-manage'
import accManage from '@/store/modules/acc-manage'
import caseManage from '@/store/modules/case-manage'
import app from '@/store/modules/app'
import noticeManage from '@/store/modules/notice-manage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// 完善vuex部分
export default new Vuex.Store({
  strict: debug, // 开发中启用严格模式
  state: {
    nav_state: 'mini', // 导航
    user: {}, // 用户信息存储
    user_token: '', // 用户toke菜单状态
    user_role: {}, // 用户权限存储
    user_menu: {}, // 用户权限菜单存储
    current_tabs: [], // 当前tabs
    platform_data: {},
    message_list: [],
    unReade_message: 0, // 未读消息条数
    message_listener: [],
    app: {}
  },
  getters,
  mutations,
  actions,
  modules: {
    callAcc,
    visitAcc,
    configManage,
    repairManage,
    approvalManage,
    systemManage,
    accManage,
    caseManage,
    app,
    noticeManage
  }
})
