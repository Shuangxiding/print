import Home from '@/views/Home'

// const page1 = resolve => require(['@/views/Test/Page1'], resolve)
// const page2 = resolve => require(['@/views/Test/Page2'], resolve)
// const page3 = resolve => require(['@/views/Test/Page3'], resolve)
// const page4 = resolve => require(['@/views/Test/Page4'], resolve)
// const page5 = resolve => require(['@/views/Test/Page5'], resolve)

import CallAcc from '@/config/router/menu/call-acc'
import VisitAcc from '@/config/router/menu/visit-acc'
import SmartAcc from '@/config/router/menu/smart-acc'
import CaseManage from '@/config/router/menu/case-manage'
import RepairManage from '@/config/router/menu/repair-manage'
import ApprovalManage from '@/config/router/menu/approval-manage'
import CustomerManage from '@/config/router/menu/customer-manage'
import ConfigManage from '@/config/router/menu/config-manage'
import SystemManage from '@/config/router/menu/system-manage'

export default [
  // {
  //   path: '/',
  //   component: Home,
  //   title: '测试目录1',
  //   code: '*',
  //   iconCls: 'icon-dianhua',
  //   children: [
  //     {
  //       path: '/page1',
  //       component: page1,
  //       name: 'page1',
  //       title: '页面1',
  //       code: '*'
  //     }, {
  //       path: '/page2',
  //       component: page2,
  //       name: 'page2',
  //       title: '页面2',
  //       code: '*'
  //     }
  //   ]
  // }, {
  //   path: '/',
  //   component: Home,
  //   title: '测试目录2',
  //   code: '*',
  //   iconCls: 'icon-dianhua',
  //   children: [
  //     {
  //       path: '/page3',
  //       name: 'page3',
  //       component: page3,
  //       title: '电催案件池',
  //       code: '*'
  //     }, {
  //       path: '/page4',
  //       name: 'page4',
  //       component: page4,
  //       title: '电催案件',
  //       code: '*'
  //     }, {
  //       path: '/page5',
  //       name: 'page5',
  //       component: page5,
  //       title: '已处理记录',
  //       code: '*'
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Home,
    title: '电话催收',
    code: '01FFFF',
    iconCls: 'icon-dianhua',
    children: CallAcc
  }, {
    path: '/',
    component: Home,
    title: '外访催收',
    code: '02FFFF',
    iconCls: 'icon-waifangcuishou',
    children: VisitAcc
  }, {
    path: '/',
    component: Home,
    title: '智能催收',
    code: '03FFFF',
    iconCls: 'icon-zhinengcuishou',
    children: SmartAcc
  }, {
    path: '/',
    component: Home,
    title: '数据管理',
    code: '04FFFF',
    iconCls: 'icon-anjianguanli',
    children: CaseManage
  }, {
    path: '/',
    component: Home,
    title: '修复管理',
    code: '05FFFF',
    iconCls: 'icon-xiufuguanli',
    children: RepairManage
  }, {
    path: '/',
    component: Home,
    title: '审批管理',
    code: '06FFFF',
    iconCls: 'icon-shenpiguanli',
    children: ApprovalManage
  }, {
    path: '/',
    component: Home,
    title: '客户查询',
    code: '07FFFF',
    iconCls: 'icon-kehuchaxun',
    children: CustomerManage
  }, {
    path: '/',
    component: Home,
    title: '配置管理',
    code: '08FFFF',
    iconCls: 'icon-peizhiguanli',
    children: ConfigManage
  }, {
    path: '/',
    component: Home,
    title: '系统管理',
    code: '09FFFF',
    iconCls: 'icon-xitongguanli',
    children: SystemManage
  }
]
