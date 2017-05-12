import app from '@/mock/data/app'
import user from '@/mock/data/user'
import CallAcc from '@/mock/data/call-acc'
import VisitAcc from '@/mock/data/visit-acc'
import SmartAcc from '@/mock/data/smart-acc'
import CaseManage from '@/mock/data/case-manage'
import CustomerManage from '@/config/servers/customer-manage'
import SystemManage from '@/mock/data/system-manage'

// 服务目录
// acc-service 催收服务
// common-service 公共服务
// customer-service 客户服务
// order-service  订单服务
// organization-service 组织解构服务
// product-service 产品服务
// template-service 模板服务

export default {
  user,
  app,
  CallAcc,
  VisitAcc,
  SmartAcc,
  CaseManage,
  CustomerManage,
  SystemManage
}
