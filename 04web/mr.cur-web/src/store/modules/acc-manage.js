import net from '@/util/net'
import server from '@/config/servers'
import md5 from 'md5'
export default ({
  state: {
    type: '', // 催收类型-电话催收/外访催收
    type_id: '', // 催收类型ID-电话催收ID/外访催收ID
    case_num: '', // 案件编号
    case_id: '', // 案件ID
    cust_id: '', // 客户ID
    cust_info: {}, // 客户信息
    case_info: {}, // 案件信息
    call_info: {}, // 电话回传信息
    template_info: {}, // 短信模板信息
    template_email: [], // 邮件模板信息
    caller_info: {}, // 呼叫信息
    origin_info: {} // 联系人信息
  },
  getters: {
    empId(state) {
      return md5(state.case_id)
    }
  },
  mutations: {
    updateMessageInfo(state, value) {
      state.origin_info = value
    },
    /**
     * 保存初始数据
     * @param {*} state
     * @param {*} value
     */
    saveCaseAndCustId(state, { type, caseId, custId, caseNum }) {
      state.type = type
      state.case_id = caseId
      state.cust_id = custId
      state.case_num = caseNum
      console.log('saveCaseAndCustId')
      switch (type) {
        case 'visit-case':
          state.type_id = 70
          break
        case 'call-case':
          state.type_id = 69
          break
      }
    },
    /**
     * 更新客户信息
     * @param {*} state
     * @param {*} value
     */
    saveCustInfo(state, value) {
      state.cust_info = value
    },
    updateBaiduMapInfo(state, value) {
      state.baidu_info = value
    },
    /**
     * 更新短信模板信息
     * @param {*} state
     * @param {*} value
     */
    saveMessagetemplateInfo(state, value) {
      state.template_info = value
    },
    saveEmailtemplateInfo(state, value) {
      state.template_email = value
    },
    /**
     * 更新案件信息
     * @param {*} state
     * @param {*} value
     */
    saveCaseInfo(state, value) {
      state.case_info = value
    },
    /**
     * 更新电话回传信息
     * @param {*} state
     * @param {*} value
     */
    updateCallInfo(state, value) {
      state.call_info = value
    },
    /**
     * 短信
     * @param {*} state
     * @param {*} value
     */
    sendMessage(state, visual) {
      state.sendMessage = visual
    },
    /**
     * 更新呼叫信息
     */
    updateCallerInfo(state, value) {
      state.caller_info = value
    }
  },
  actions: {
    /**
     * 更新案件信息
     */
    updateCaseInfo({ state, commit }) {
      net.send({
        server: server.AccManage.get_case_info,
        data: {
          cupoId: state.case_id
        }
      }).then((data) => {
        console.log('case', data)
        if (data) {
          commit('saveCaseInfo', data)
        } else {
          commit('saveCaseInfo', {})
        }
      })
    },
    /**
     * 更新客户信息
     */
    updateCustInfo({ state, commit }) {
      net.send({
        server: server.AccManage.get_cust_info,
        append: state.cust_id
      }).then((data) => {
        commit('saveCustInfo', data)
      }, ex => console.log(ex))
    },
    /**
     * 验证客户座机号码
     */
    validatePhone({ state, commit, getters, rootState }) {
      net.send({
        server: server.AccManage.validate_phone
      }).then(({ taskData }) => {
        commit('updateCallerInfo', {
          taskId: taskData.taskId,
          caller: taskData.caller
        })
      }, ex => console.log(ex))
    },
    /**
     * 获取模板信息
     */
    getMessagetemplateInfo({ state, commit }) {
      net.send({
        server: server.SmartAcc.get_message_template
      }).then((data) => {
        let msgTemplate = data.filter(v => v.style === 29)
        let EmailTemplate = data.filter(v => v.style === 31)
        commit('saveMessagetemplateInfo', msgTemplate)
        commit('saveEmailtemplateInfo', EmailTemplate)
      }, ex => console.log(ex))
    }
  }
})
