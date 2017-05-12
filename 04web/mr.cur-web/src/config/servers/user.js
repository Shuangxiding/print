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
  // 用户登录
  login: {
    service: 'organization-service',
    controller: 'login',
    action: 'login',
    type: RTYPE.POST
  },
  loginByToken: {
    service: 'organization-service',
    controller: 'login',
    action: 'getUserByToken',
    type: RTYPE.GET
  },
  // 获取权限列表
  role: {
    service: 'organization-service',
    controller: 'resourceController',
    action: 'getAllResource',
    type: RTYPE.GET
  },
  // 获取用户工作台数据
  get_user_platform_data: {
    service: 'acc-service',
    controller: 'accOperatorPlatform',
    action: 'getMessage',
    type: RTYPE.GET
  },
  // 获取消息提醒信息
  get_message_remind_info: {
    service: 'reminder-service',
    controller: 'reminderMessageController',
    action: 'getReminderMessages',
    type: RTYPE.GET
  },
  // 获取工作台消息提醒信息
  get_remindmessage_workbench: {
    service: 'reminder-service',
    controller: 'reminderMessageController',
    action: 'getWorkbenchReminder',
    type: RTYPE.GET
  },
  // 删除消息信息
  get_message_deleted_info: {
    service: 'reminder-service',
    controller: 'reminderMessageController',
    action: 'batchDelete',
    type: RTYPE.POST
  },
  // 查看消息，变已读
  get_reminder_message: {
    service: 'reminder-service',
    controller: 'reminderMessageController',
    action: 'getReminderMessage',
    type: RTYPE.GET
  }
}
