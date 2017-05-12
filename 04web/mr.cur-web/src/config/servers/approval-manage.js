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
  get_derate_apply: {
    service: 'acc-service',
    controller: 'accDerateApplyController',
    action: 'getAccDerateApply',
    type: RTYPE.GET
  },
  // 操作审批信息
  get_handle_derate: {
    service: 'acc-service',
    controller: 'accDerateApplyController',
    action: 'handleAccDerateApply',
    type: RTYPE.GET
  },
  // 处理审批信息
  put_update_derate: {
    service: 'acc-service',
    controller: 'accDerateApplyController',
    action: 'updateAccDerateApply',
    type: RTYPE.PUT
  },
  // 跟进记录查询
  get_followup_record: {
    service: 'acc-service',
    controller: 'AccFollowupController',
    action: 'getAllAccFollowupsByCondition',
    type: RTYPE.GET
  },
  // 获取委托方
  get_all_pricipal: {
    service: 'acc-service',
    controller: 'accPrincipalController',
    action: 'getAllPricipal',
    type: RTYPE.GET
  },
  // 获取还款审核列表
  get_review_reimbursement: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'page',
    type: RTYPE.GET
  },
  // 操作审核信息
  get_reimbursement: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'handleAccPayApply',
    type: RTYPE.GET
  },
  // 处理审核信息
  get_process_audit_information: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'updateAccPayApply',
    type: RTYPE.POST
  },
  // 导出还款记录
  export_pay_apply: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'exportPayApply',
    type: RTYPE.GET
  },
  // 查看凭证
  get_pay_proof: {
    service: 'acc-service',
    controller: 'accPayApplyController',
    action: 'getPayProof',
    type: RTYPE.GET
  },
  // 审核页面案件详情参数
  get_check_params: {
    service: 'acc-service',
    controller: 'RepaymentController',
    action: 'getCheckParams',
    type: RTYPE.GET
  }
}
