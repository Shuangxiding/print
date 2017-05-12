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
  // 查询所有模板
  get_all_template: {
    service: 'template-service',
    controller: 'templateController',
    action: 'query',
    type: RTYPE.GET
  },
  // 删除模板
  delete_template: {
    service: 'template-service',
    controller: 'templateController',
    action: 'deleteTemplateById',
    type: RTYPE.DELETE
  },
  // 增加模板
  create_template: {
    service: 'template-service',
    controller: 'templateController',
    action: 'createTemplate',
    type: RTYPE.POST
  },
  // 修改模板
  update_template: {
    service: 'template-service',
    controller: 'templateController',
    action: 'updateTemplate',
    type: RTYPE.PUT
  },
  // 判断新增模板名称、编号是否可用
  get_template_by_name_or_code: {
    service: 'template-service',
    controller: 'templateController',
    action: 'getTemplateByNameOrCode',
    type: RTYPE.GET
  }
}
