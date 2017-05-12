import app from '@/config/servers/app'
import user from '@/config/servers/user'
import CallAcc from '@/config/servers/call-acc'
import VisitAcc from '@/config/servers/visit-acc'
import SmartAcc from '@/config/servers/smart-acc'
import CaseManage from '@/config/servers/case-manage'
import ConfigManage from '@/config/servers/config-manage'
import ApprovalManage from '@/config/servers/approval-manage'
import CustomerManage from '@/config/servers/customer-manage'
import RepairManage from '@/config/servers/repair-manage'
import SystemManage from '@/config/servers/system-manage'
import AccManage from '@/config/servers/acc-manage'
import NoticeManage from '@/config/servers/notice-manage'
// 服务目录
// acc-service 催收服务
// common-service 公共服务
// customer-service 客户服务
// order-service  订单服务
// organization-service 组织解构服务
// product-service 产品服务
// template-service 模板服务

export default {
  user, // 用户服务
  app, // 系统服务
  CallAcc, // 电话催收服务
  VisitAcc, // 外放催收服务
  SmartAcc, // 智能催收服务
  CaseManage, // 案件管理服务
  ConfigManage, // 配置管理服务
  ApprovalManage, // 减免服务
  CustomerManage, // 客户管理服务
  RepairManage, // 修复管理服务
  SystemManage, // 系统管理服务
  AccManage,
  NoticeManage
}
