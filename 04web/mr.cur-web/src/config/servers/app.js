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
  // 获取权限列表标识
  get_role_hash: {
    service: 'organization-service',
    controller: 'resourceController',
    action: 'resourceHashCode',
    type: RTYPE.GET
  },
  // 获取权限列表
  get_role_data: {
    service: 'organization-service',
    controller: 'resourceController',
    action: 'getAllResource',
    type: RTYPE.GET
  },
  // 获取数据类型标识
  get_dict_hash: {
    service: 'common-service',
    controller: 'dataDictController',
    action: 'getHashCode',
    type: RTYPE.GET
  },
  // 获取数据类型数据
  get_dict_data: {
    service: 'common-service',
    controller: 'dataDictController',
    action: 'getAll',
    type: RTYPE.GET
  },
  upload: {
    service: '',
    controller: 'fileUploadController',
    action: 'upload',
    type: RTYPE.POST
  },
  upload_attachment_file: {
    service: '',
    controller: 'fileUploadController',
    action: 'uploadCaseFileReduce',
    type: RTYPE.POST
  },
  // 修改密码
  modify_password: {
    service: 'organization-service',
    controller: 'login',
    action: 'updatePassword',
    type: RTYPE.POST
  },
  // 重置密码
  reset_password: {
    service: 'organization-service',
    controller: 'login',
    action: 'resetPassword',
    type: RTYPE.POST
  }
}
