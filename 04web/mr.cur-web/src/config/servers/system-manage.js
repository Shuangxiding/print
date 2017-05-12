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
  get_role_page: {
    service: 'organization-service',
    controller: 'roleController',
    action: 'query',
    type: RTYPE.GET
  },
  // 获取用户列表
  get_departmentUser_list: {
    service: 'organization-service',
    controller: 'departmentController',
    action: 'deptFindUsers',
    type: RTYPE.GET
  },
  get_all_department: {
    service: 'organization-service',
    controller: 'departmentController',
    action: 'getAllDepartment',
    type: RTYPE.GET
  },
  // 查询用户
  find_user_list: {
    service: 'organization-service',
    controller: 'userController',
    action: 'query',
    type: RTYPE.GET
  },
  // 新增用户
  add_user: {
    service: 'organization-service',
    controller: 'userController',
    action: 'addUser',
    type: RTYPE.POST
  },
  // 用户添加组织机构
  add_user_department: {
    service: 'organization-service',
    controller: 'userController',
    action: 'userAddDept',
    type: RTYPE.POST
  },
  // 获取角色列表
  get_role_list: {
    service: 'organization-service',
    controller: 'roleController',
    action: 'query',
    type: RTYPE.GET
  },
  // 修改用户
  update_user: {
    service: 'organization-service',
    controller: 'userController',
    action: 'updateUser',
    type: RTYPE.POST
  },
  // 分配角色
  assign_role: {
    service: 'organization-service',
    controller: 'userController',
    action: 'userAddRole',
    type: RTYPE.POST
  },
  // 批量分配角色
  bantch_role: {
    service: 'organization-service',
    controller: 'userController',
    action: 'manyUserAddRole',
    type: RTYPE.POST
  },
  delete_role: {
    service: 'organization-service',
    controller: 'roleController',
    action: 'deleteRole',
    type: RTYPE.DELETE
  },
  modify_role: {
    service: 'organization-service',
    controller: 'roleController',
    action: 'updateRole',
    type: RTYPE.POST
  },
  add_role: {
    service: 'organization-service',
    controller: 'roleController',
    action: 'addRole',
    type: RTYPE.POST
  },
  // 资源添加角色
  resource_addRole: {
    service: 'organization-service',
    controller: 'resourceController',
    action: 'resourceAddRole',
    type: RTYPE.POST
  },
  // 通过角色查找用户列表
  role_find_user: {
    service: 'organization-service',
    controller: 'userController',
    action: 'getRoleToUserPage',
    type: RTYPE.GET
  },
  // 通过角色查找权限
  get_roleRes: {
    service: 'organization-service',
    controller: 'roleController',
    action: 'getRoleRes',
    type: RTYPE.GET
  },
  // 添加组织机构
  post_add_department: {
    service: 'organization-service',
    controller: 'departmentController',
    action: 'addDepartment',
    type: RTYPE.POST
  },
  // 删除组织机构
  delete_deleteDept: {
    service: 'organization-service',
    controller: 'departmentController',
    action: 'deleteDept',
    type: RTYPE.DELETE
  },
  // 修改组织机构
  post_update_department: {
    service: 'organization-service',
    controller: 'departmentController',
    action: 'updateDepartment',
    type: RTYPE.POST
  },
  // 移动组织机构
  get_move_department: {
    service: 'organization-service',
    controller: 'departmentController',
    action: 'moveDepartment',
    type: RTYPE.GET
  },
  // 获取版本数据
  get_app_package: {
    service: 'appversion-service',
    controller: 'appPackageController',
    action: 'getAppPackage',
    type: RTYPE.GET
  },
  // 添加app版本
  save_package: {
    service: 'appversion-service',
    controller: 'appPackageController',
    action: 'savePackage',
    type: RTYPE.POST
  },
  // 删除app版本
  delete_package: {
    service: 'appversion-service',
    controller: 'appPackageController',
    action: 'deletePackage',
    type: RTYPE.DELETE
  }
}
