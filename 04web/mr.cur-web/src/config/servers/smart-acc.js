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
  // 获取短信模板信息
  get_message_template: {
    service: 'template-service',
    controller: 'templateController',
    action: 'getTemplatesByStyleAndType',
    type: RTYPE.GET
  },
  // 获取智能催收列表
  get_smart_list: {
    service: 'acc-service',
    controller: 'accIntelligentController',
    action: 'page',
    type: RTYPE.GET
  },
  // 获取短信发送对象
  get_message_sendObj: {
    service: 'acc-service',
    controller: 'accIntelligentController',
    action: 'handleBatchSend',
    type: RTYPE.POST
  },
  // 获取电子邮件发送对象
  get_email_sendObj: {
    service: 'acc-service',
    controller: 'accIntelligentController',
    action: 'handleEmailSend',
    type: RTYPE.POST
  },
  // 修改手机号或电子邮箱
  post_phoneNumOrEmail_change: {
    service: 'acc-service',
    controller: 'accIntelligentController',
    action: 'modifyPhoneNumOrEmail',
    type: RTYPE.POST
  },
  // 一键发送短信
  post_send_message: {
    service: 'acc-service',
    controller: 'accSMSMessageController',
    action: 'SendMessage',
    type: RTYPE.POST
  },
  // 一键发送邮件
  post_send_email: {
    service: 'acc-service',
    controller: 'accMailMessageController',
    action: 'sendMail',
    type: RTYPE.POST
  }
}
