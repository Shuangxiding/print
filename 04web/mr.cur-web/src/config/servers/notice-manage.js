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
  // 逾期需要发贷后通知单信息查询
  send_notice_info: {
    service: 'acc-service',
    controller: 'accIntelligentController',
    action: 'page',
    type: RTYPE.GET
  },
  get_all_pricipal: {
    service: 'acc-service',
    controller: 'accPrincipalController',
    action: 'getAllPricipal',
    type: RTYPE.GET
  }
}
