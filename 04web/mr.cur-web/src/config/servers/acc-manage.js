/**
 * 服务配置格式
 * elample:
 * {
 *  service:{服务名称}
 *  controller:{controller名称}
 *  action:{action名称}-可选
 *  url:{自定义地址}-可选(填写url时将不会读取service,controll,action)
 *  type:'RTYPE.(POST|DELETE|PUT|GET)'
 * }
 */
import { RTYPE } from '@/util/common'

export default {
  // 减免信息查询
  get_cust_info: {
    service: 'customer-service',
    controller: 'customerInformationController',
    action: 'getCustomerDetailInformation',
    type: RTYPE.GET
  },
  get_case_info: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'getAccReceivePoolById',
    type: RTYPE.GET
  },
  get_case_list: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'query',
    type: RTYPE.GET
  },
  // 获取发送信息记录(电催)
  get_send_message_info: {
    service: 'acc-service',
    controller: 'AccMessgeRecordController',
    action: 'getAllAccMessgeRecordsByCondition',
    type: RTYPE.GET
  },
  // 获取跟进记录
  get_follow_recode_info: {
    service: 'acc-service',
    controller: 'AccFollowupController',
    action: 'getAllAccFollowupsByCondition',
    type: RTYPE.GET
  },
  // 更新跟进记录
  update_follow_recode_info: {
    service: 'acc-service',
    controller: 'AccFollowupController',
    action: 'updateAccFollowup',
    type: RTYPE.POST
  },
  // 还款
  repayment: {
    service: 'acc-service',
    controller: 'RepaymentController',
    action: 'doRepayment',
    type: RTYPE.POST
  },
  // 添加跟进记录
  add_follow_recode_info: {
    service: 'acc-service',
    controller: 'AccFollowupController',
    action: 'saveAccFollowup',
    type: RTYPE.POST
  },
  // 修改联系电话或邮箱
  modify_phone_email_info: {
    service: 'acc-service',
    controller: 'accIntelligentController',
    action: 'modifyPhoneNumOrEmail',
    type: RTYPE.POST
  },
  // 绑定主叫
  bind_phone: {
    service: 'sma-service',
    controller: 'smaController',
    action: 'bindTaskDataByCallerId',
    type: RTYPE.POST
  },
  validate_phone: {
    service: 'sma-service',
    controller: 'smaController',
    action: 'validateTaskIdInEmpId',
    type: RTYPE.GET
  },
  // 获取短信模板名称
  get_message_model_info: {
    service: 'template-service',
    controller: 'templateController',
    action: 'getTemplatesByStyleAndType',
    type: RTYPE.GET
  },
  // 发送
  send_info: {
    service: 'acc-service',
    controller: 'accSMSMessageController',
    action: 'SendMessageSingle',
    type: RTYPE.POST
  },
  // 群发
  send_group_info: {
    service: 'acc-service',
    controller: 'accSMSMessageController',
    action: 'SendMessageAll',
    type: RTYPE.POST
  },
  // 撤回
  withdraw_info: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'recallAccPayApply',
    type: RTYPE.GET
  },
  // 呼叫
  call_phone_info: {
    service: 'sma-service',
    controller: 'smaController',
    action: 'addTaskRecorder',
    type: RTYPE.POST
  },
  // 根据催收对象获取姓名
  get_cust_name_info: {
    service: 'customer-service',
    controller: 'customerRepairInformationController',
    action: 'getFirstNameByRelation',
    type: RTYPE.GET
  },
  // 下载外访材料
  get_download_visit_info: {
    service: 'acc-service',
    controller: 'AccFollowupController',
    action: 'getVisitFiles',
    type: RTYPE.GET
  },
  // 获取百度地图
  get_map_info: {
    service: 'acc-service',
    controller: 'accMapController',
    action: 'GetAddress',
    type: RTYPE.POST
  }
}
