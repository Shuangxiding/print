import net from '@/util/net'
import server from '@/config/servers'

export default ({
  state: {
    customer_id: '',
    case_allot_org: null, // 案件分配机构列表
    case_allot_user: [], // 案件分配用户Id
    client_list: [], // 委托方列表
    batch_list: [] // 批次号列表
  },
  getters: {},
  mutations: {
    // 更新委托方列表
    updateClientList(state, data) {
      state.client_list = data
    },
    // 更新批次号列表
    updateBatchList(state, data) {
      state.batch_list = data
    },
    updateCustomerId(state, id) {
      state.customer_id = id
    },
    // 案件分配机构列表
    updateCaseAllotOrg(state, obj) {
      state.case_allot_org = obj
    },
    // 案件分配用户Id
    updateCaseAllotUser(state, arr) {
      state.case_allot_user = arr
    }
  },
  actions: {
    /**
     * 获取委托方列表
     * @param {*} param
     */
    getClientList({ commit }) {
      net.send({
        server: server.ApprovalManage.get_all_pricipal
      }).then((data) => {
        commit('updateClientList', data)
      })
    },
    /**
     * 获取批次号列表
     */
    getBatchList({ commit }) {
      net.send({
        server: server.CaseManage.import_batch_list
      }).then((data) => {
        commit('updateBatchList', data)
      })
    }
  }
})
