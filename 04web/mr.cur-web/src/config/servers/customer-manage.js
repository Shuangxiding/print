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
  // 获取客户列表
  get_customer_list: {
    service: 'acc-service',
    controller: 'accCustomerQueryController',
    action: 'getAccCustomerQueryList',
    type: RTYPE.GET
  },
  // 案件流转记录
  get_acc_case_info_tranlog: {
    service: 'acc-service',
    controller: 'accCustomerQueryController',
    action: 'getAccCaseinfoTranlog',
    type: RTYPE.GET
  }
}
