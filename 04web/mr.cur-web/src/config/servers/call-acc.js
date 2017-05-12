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
  // 获取电催案件列表
  telephone_collection_case: {
    service: 'acc-service',
    controller: 'AccRecevicePoolController',
    action: 'query',
    type: RTYPE.GET
  },
  // 获取电催已处理案件列表
  handled_case: {
    service: 'acc-service',
    controller: 'PassRecevicePoolController',
    action: 'query',
    type: RTYPE.GET
  }
}
