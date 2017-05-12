import net from '@/util/net'
import server from '@/config/servers'
export default ({
  state: {
    module_permiss_roleId: '', // 用户角色Id
    module_permiss_dialog: false,
    org_info: [] // 组织名称信息
  },
  getters: {},
  mutations: {
    // 用户角色Id
    updateModuleRoleId(state, val) {
      state.module_permiss_roleId = val
    },
    updateModuleDialog(state, val) {
      state.module_permiss_dialog = val
    },
    /**
     * 更新组织名称信息
     * @param {*} state
     * @param {*} value
     */
    OrgNameInfo(state, value) {
      state.org_info = value
      console.log(state.org_info)
    }
  },
  actions: {
    /**
     * 更新组织名称信息
     */
    updateOrgNameInfo({ state, commit }, aa) {
      console.log(6666666, aa)
      net.send({
        server: server.SystemManage.get_all_department
      }).then((data) => {
        commit('OrgNameInfo', data)
      }, ex => console.log(ex))
    }
  }
})
