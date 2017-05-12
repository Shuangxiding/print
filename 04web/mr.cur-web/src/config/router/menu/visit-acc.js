// 外访催收
const AssistApplication = resolve => require(['@/views/visit-acc/AssistApplication'], resolve)
const VisitHandledCase = resolve => require(['@/views/visit-acc/VisitHandledCase'], resolve)
const VisitCase = resolve => require(['@/views/visit-acc/VisitCase'], resolve)

export default [{
  path: '/assist-application',
  name: 'assist-application',
  component: AssistApplication,
  title: '协催申请审批',
  code: '0201FF'
}, {
  path: '/visit-case',
  name: 'visit-case',
  component: VisitCase,
  title: '外访案件',
  code: '0202FF'
}, {
  path: '/visit-handled-case',
  name: 'visit-handled-case',
  component: VisitHandledCase,
  title: '已处理记录',
  code: '0203FF'
}]
