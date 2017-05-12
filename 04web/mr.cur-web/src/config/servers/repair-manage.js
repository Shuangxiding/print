/**
 * 服务配置格式
 * elample:
 * {
 *  service:{服务名称}
 *  controller:{controller名称}
 *  action:{action名称}-可选
 *  url:{自定义地址}-可选(填写url时将不会读取service,controll,action)
 *  type:'RTYPE.(GET|PUT|POST|DELETE)'
 * }
 */
import { RTYPE } from '@/util/common'

export default {
  // 获取申请修复信息列表
  acc_order_apply_records: {
    service: 'acc-service',
    controller: 'accOrderApplyController',
    action: 'getAccOrderApplyRecords',
    type: RTYPE.GET
  },
  // 获取申请修复信息已处理记录列表
  acc_order_apply_repaired_records: {
    service: 'acc-service',
    controller: 'accOrderApplyController',
    action: 'getAccOrderApplyProcessedRecords',
    type: RTYPE.GET
  },
  // 获取委托方名字
  client_name: {
    service: 'acc-service',
    controller: 'accPrincipalController',
    action: 'getAllPricipal',
    type: RTYPE.GET
  },
  // 获取用户原始信息
  Customer_information_case: {
    service: 'customer-service',
    controller: 'customerInformationController',
    action: 'getCustomerDetailInformation',
    type: RTYPE.GET
  },
  // 获取修复信息列表
  repair_information_case: {
    service: 'customer-service',
    controller: 'customerRepairInformationController',
    action: 'getCustomerRepairInformationByPage',
    type: RTYPE.GET
  },
  // 获取关系姓名信息列表
  repair_relation_case: {
    service: 'customer-service',
    controller: 'customerRepairInformationController',
    action: 'getNamesByRelation',
    type: RTYPE.GET
  },
  // 修复申请
  repair_application: {
    service: 'acc-service',
    controller: 'accOrderApplyController',
    action: 'addAccOrderApply',
    type: RTYPE.GET
  },
  // 删除修复申请
  delete_customer_repair: {
    service: 'customer-service',
    controller: 'customerRepairInformationController',
    action: 'deleteCustomerRepairInformation',
    type: RTYPE.DELETE
  },
  // 修复完成
  update_acc_order_apply: {
    service: 'acc-service',
    controller: 'accOrderApplyController',
    action: 'updateAccOrderApply',
    type: RTYPE.POST
  },
  /**
   * 更新客户修复信息
   */
  update_customer_repair_info: {
    service: 'acc-service',
    controller: 'accOrderApplyController',
    action: 'updateAccOrderApplyAndCustomerRepairInformation',
    type: RTYPE.PUT
  },
  /**
   * 更新客户修复信息
   */
  add_customer_repair_info: {
    service: 'acc-service',
    controller: 'accOrderApplyController',
    action: 'saveCustomerRepairInformation',
    type: RTYPE.POST
  },
  // 获取外访修复信息
  get_visit_repair_info: {
    service: 'customer-service',
    controller: 'customerRepairInformationController',
    action: 'getCustomerRepairAddressInfo',
    type: RTYPE.GET
  }
}
